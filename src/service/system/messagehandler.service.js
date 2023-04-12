class MessageHandlerService {
    constructor() {
        this.conversationService = new ConversationService();
        this.getChatGPTResponse = getChatGPTResponse;
    }
    
    async handleMentionedMessage(message) {
        const userId = message.author.id;
        this.conversationService.updateConversation(userId, { role: 'user', content: message.content });

        const response = await this.getChatGPTResponse(this.conversationService.getConversation(userId));
        this.conversationService.updateConversation(userId, { role: 'assistant', content: response });

        if (response.trim() !== "") {
            message.reply(response);
        }
    }
    }
  
  module.exports = MessageHandlerService;