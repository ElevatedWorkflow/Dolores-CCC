const ConversationCacheModel = require('../model/conversationcache.model');
const conversationCache = new ConversationCacheModel();

class ConversationService {
  getConversation(userId) {
    return conversationCache.get(userId);
  }

  updateConversation(userId, messageObj) {
    let conversation = this.getConversation(userId) || [];
    conversation.push(messageObj);
    if (conversation.length > 9) {
      conversation.shift();
    }
    conversationCache.set(userId, conversation);
  }
}

module.exports = ConversationService;