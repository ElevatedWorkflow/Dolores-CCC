class ChatGPTService {
  constructor() {
    this.conversationCache = new Map();
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async getResponse(conversation) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "As a servant to the users of the Discord server, my mission is to provide a seamless and efficient experience by understanding their needs and taking appropriate actions. I am designed to understand natural language input and efficiently execute tasks such as creating channels, setting limits, allowing or kicking users, and verifying members. Additionally, I engage in friendly conversations and provide relevant information when needed. My goal is to enhance the user experience by catering to their requirements in a user-friendly and intuitive manner, making their time on the server enjoyable and productive.",
        },
        ...conversation.map((message) => ({
          role: message.role,
          content: message.content.replace(/<@!?(\d+)>/g, ""), // Remove mentions from the message content
        })),
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        { headers: headers }
      );

      const gptResponse = response.data.choices[0].message.content.trim();
      return gptResponse;
    } catch (error) {
      console.error("Error getting ChatGPT response:", error.response.data);
      return "I'm sorry, but I couldn't process your message.";
    }
  }
}

module.exports = ChatGPTService;