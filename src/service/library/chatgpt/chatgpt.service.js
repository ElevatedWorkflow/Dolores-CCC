axios = require('axios')

class ChatGPTService {
  constructor() {
    this.conversationCache = new Map();
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async getResponse(conversation, userId) {
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
          content: message.content.replace(/<@!?(\d+)>/g, '') // Remove mentions from the message content
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
  
      console.log(response)
      const gptResponse = gptResponse.config.data.messages.find(message => message.role === "system").content.trim();
      conversationCache.set(userId, gptResponse);
      return gptResponse;
      
    } catch (error) {
      console.error("Error getting ChatGPT response:", error.response);
      return "I'm sorry, but I couldn't process your message.";
    }
  }

  async handleMessage(conversation) {
    const userId = conversation[0].content.match(/<@!?(\d+)>/)[1];
    const cacheKey = `${userId}`;
    const cachedConversation = this.conversationCache.get(cacheKey) || [];
    const newConversation = cachedConversation.concat(conversation);
  
    this.conversationCache.set(cacheKey, newConversation);
  
    const response = await this.getResponse(newConversation, userId);
  
    return response;
  }
}

module.exports = ChatGPTService;