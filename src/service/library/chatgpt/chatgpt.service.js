const axios = require("axios")
const fs = require('fs');

const contentFromFile = fs.readFileSync('./combined_output.txt', 'utf8');
//const responsesFromFile = fs.readFileSync("./responses.txt", "utf8"); [CODE HAULT]
class ChatGPTService {
  constructor(conversationService) {
    this.conversationService = conversationService;
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async getResponse(conversation, userId) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };

    //const systemMessageContent = contentFromFile + "\n" + responsesFromFile; [CODE HAULT]

    const messages = [
      {
        role: "system",
        content: contentFromFile
        //content: systemMessageContent // Add the contents of the combined_output.txt file to the conversation [CODE HAULT]
      },
    ].concat(conversation.map((message) => ({
      role: message.role,
      content: message.content.replace(/<@!?(\d+)>/g, '') // Remove mentions from the message content
        }
      )
    ));
  
    const data = {
      model: "gpt-4",
      messages: messages,
      max_tokens: 512,
      temperature: 0.7,
    };
  
    try {
      const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          data,
          { headers: headers }
      );
  
      const gptResponse = response.data.choices[0].message.content.trim();
      this.conversationService.updateConversation(userId, {
        role: "assistant",
        content: gptResponse,
      });
      return gptResponse;
      
    } catch (error) {
      console.error("Error getting ChatGPT response:", error);
      return "I'm sorry, but I couldn't process your message.";
    }
  }

  async handleMessage(userId, content) {

    await this.conversationService.updateConversation(userId, {
      role: 'user',
      content: content,
    });

    const conversation = await this.conversationService.getConversation(userId) || [];
    const response = await this.getResponse(conversation, userId);
    
    fs.appendFile('responses.txt', `${response}\n`, (err) => {
      if (err) {
        console.error('Error writing response to file:', err);
      } else {
        console.log('Response written to file');
      }
    }
    );
      await this.conversationService.updateConversation(userId, {
        role: 'assistant',
        content: response,
    });
  
    return response;
  }
}

module.exports = ChatGPTService;