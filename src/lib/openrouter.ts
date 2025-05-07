import { z } from 'zod';

const OPENROUTER_API_KEY = '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';

const QuestionSchema = z.object({
  id: z.string(),
  topic: z.enum(['physics', 'mathematics', 'chemistry', 'programming']),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard'])
});

export type GeneratedQuestion = z.infer<typeof QuestionSchema>;

const systemPrompt = `You are a quiz question generator. Generate multiple choice questions with exactly 4 options.
Format your response as a JSON object with the following structure:
{
  "id": "unique-id",
  "topic": "topic-name",
  "question": "question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": 0-3,
  "explanation": "detailed explanation",
  "difficulty": "easy|medium|hard"
}`;

export async function generateQuestions(topic: string, count: number): Promise<GeneratedQuestion[]> {
  const userPrompt = `Generate ${count} ${topic} questions. Make them challenging but fair, with clear explanations.`;
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://stackblitz.com',
        'X-Title': 'QuizMaster'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Handle both single object and array responses
    const jsonContent = JSON.parse(content);
    const questionsArray = Array.isArray(jsonContent) ? jsonContent : [jsonContent];
    
    // Validate and parse questions
    const validQuestions = questionsArray
      .map(q => {
        try {
          return QuestionSchema.parse(q);
        } catch (e) {
          console.error('Invalid question format:', e);
          return null;
        }
      })
      .filter((q): q is GeneratedQuestion => q !== null);

    return validQuestions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}