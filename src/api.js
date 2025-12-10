import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateCareerAnalysis(userData) {
  const { targetJob, location, education, skills, experience } = userData;
  
  const prompt = `You are an expert career counselor and job market analyst. Analyze the following user profile and provide a comprehensive career analysis in JSON format.

User Profile:
- Target Job: ${targetJob}
- Location Preference: ${location}
- Current Education: ${education}
- Current Skills: ${skills}
- Experience: ${experience || 'None'} years

Please provide a detailed analysis in the following JSON structure:

{
  "jobPossibility": {
    "bangladesh": <number 0-100>,
    "international": <number 0-100>,
    "none": <number 0-100>
  },
  "educationGap": {
    "required": "<minimum education requirement>",
    "userHas": "${education}",
    "gap": "<explanation of gap>",
    "steps": ["<step 1>", "<step 2>", ...]
  },
  "skillsGap": {
    "missing": [
      {
        "skill": "<skill name>",
        "difficulty": "<Beginner/Intermediate/Expert>",
        "timeToLearn": "<estimated time>"
      }
    ],
    "certifications": ["<certification 1>", "<certification 2>", ...]
  },
  "migrationGuide": {
    "languageRequirements": "<IELTS/TOEFL requirements>",
    "visaRequirements": "<visa information>",
    "certifications": ["<international certifications>"]
  },
  "roadmap": {
    "shortTerm": {
      "duration": "1-3 months",
      "tasks": ["<task 1>", "<task 2>", ...]
    },
    "midTerm": {
      "duration": "3-6 months",
      "tasks": ["<task 1>", "<task 2>", ...]
    },
    "longTerm": {
      "duration": "1 year+",
      "tasks": ["<task 1>", "<task 2>", ...]
    }
  },
  "currentOpportunities": ["<job role 1>", "<job role 2>", ...],
  "futureOpportunities": ["<job role 1>", "<job role 2>", ...],
  "riskForecast": {
    "level": "<Low/Medium/High>",
    "explanation": "<explanation of automation risk>"
  }
}

IMPORTANT: 
1. The jobPossibility values MUST sum to exactly 100.
2. Provide realistic and actionable advice based on current job market trends.
3. Consider Bangladesh's job market specifically when analyzing local opportunities.
4. Return ONLY valid JSON, no additional text or markdown.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    const analysis = JSON.parse(jsonText);
    return analysis;
  } catch (error) {
    console.error('Error generating career analysis:', error);
    throw new Error('Failed to generate career analysis. Please try again.');
  }
}
