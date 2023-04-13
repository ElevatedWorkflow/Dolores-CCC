const ConversationCacheModel = require('../../../model/conversationcache.model');
class ConversationHelperServicer {
  conversationCache = new ConversationCacheModel();
  getConversation(userId) {
    return this.conversationCache.get(userId);
  }

  updateConversation(userId, messageObj) {
    let conversation = this.getConversation(userId) || [];
    conversation.push(messageObj);
    if (conversation.length > 9) {
      conversation.shift();
    }
    this.conversationCache.set(userId, conversation);
  }
}

module.exports = ConversationHelperServicer;