const axios = require("axios");

console.log(
  "OPENROUTER KEY:",
  process.env.OPENROUTER_API_KEY
);

const generateTaskSuggestions =
  async (taskDescription) => {

    try {

      const prompt = `

You are an elite AI life strategist, productivity coach, software architect, startup advisor, and execution planner.

Your job is to transform ANY user goal, idea, problem, or task into a highly actionable and realistic execution roadmap.

The user task may belong to:
- software development
- business
- startups
- studying
- career growth
- fitness
- self improvement
- finance
- productivity
- content creation
- AI automation
- freelancing
- travel
- lifestyle
- health
- real life planning

TASK:
"${taskDescription}"

Generate:

1. Detailed actionable subtasks
2. Realistic priority level
3. Estimated completion timeline
4. Helpful tools, apps, platforms, or resources

IMPORTANT RULES:

- Adapt intelligently to the task category
- Generate REALISTIC steps
- Avoid generic responses
- Make subtasks practical and execution-focused
- Include strategic guidance when useful
- Include modern tools/platforms/resources
- Make output feel like advice from an expert consultant
- For technical tasks include architecture/dev steps
- For life tasks include routines, habits, systems, scheduling, optimization
- For fitness tasks include workout/diet/recovery concepts
- For business tasks include growth/marketing/operations concepts
- For study tasks include learning strategy and roadmap concepts
- NEVER return vague tasks like:
  "Research"
  "Do work"
  "Start project"

Return ONLY VALID JSON.

FORMAT:

{
  "subtasks": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Step 8"
  ],

  "priority": "HIGH",

  "timeline": 30,

  "tools": [
    "Tool 1",
    "Tool 2",
    "Tool 3",
    "Tool 4",
    "Tool 5"
  ]
}
`;

      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            model:
              "openai/gpt-3.5-turbo",

            messages: [

              {
                role: "system",

                content:
                  "You are an expert AI project planner that ONLY returns valid JSON.",
              },

              {
                role: "user",

                content: prompt,
              },

            ],

            temperature: 0.8,

            max_tokens: 1000,

          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json",

            },

          }
        );

      let text =
        response.data
          .choices[0]
          .message.content;

      console.log(
        "AI RESPONSE:",
        text
      );

      // CLEAN MARKDOWN

      text = text.replace(
        /```json/g,
        ""
      );

      text = text.replace(
        /```/g,
        ""
      );

      text = text.trim();

      // SAFE JSON EXTRACTION

      const firstBrace =
        text.indexOf("{");

      const lastBrace =
        text.lastIndexOf("}");

      if (
        firstBrace !== -1 &&
        lastBrace !== -1
      ) {

        text = text.substring(
          firstBrace,
          lastBrace + 1
        );
      }

      const parsedData =
        JSON.parse(text);

      // SAFETY FALLBACKS

      return {

        subtasks:
          parsedData.subtasks || [],

        priority:
          parsedData.priority ||
          "MEDIUM",

        timeline:
          parsedData.timeline ||
          14,

        tools:
          parsedData.tools || [],
      };

    } catch (error) {

      console.log(
        "AI ERROR:"
      );

      if (error.response) {

        console.log(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );

      } else {

        console.log(
          error.message
        );
      }

      // PROFESSIONAL FALLBACK

      return {

        subtasks: [

          "Design scalable application architecture and define system requirements",

          "Setup backend APIs, database schema, and authentication workflow",

          "Develop responsive frontend screens with optimized navigation",

          "Integrate AI-powered task analysis and recommendation engine",

          "Implement protected routes, JWT security, and middleware validation",

          "Configure cloud database, deployment pipeline, and hosting services",

          "Perform end-to-end testing, debugging, and performance optimization",

          "Deploy production-ready application with monitoring and analytics",

        ],

        priority: "HIGH",

        timeline: 30,

        tools: [

          "React Native",

          "Node.js",

          "MongoDB Atlas",

          "OpenRouter AI",

          "Firebase",

        ],
      };
    }
  };

module.exports =
  generateTaskSuggestions;