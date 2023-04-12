class ConversationCache {
    constructor() {
      this.cache = new Map();
    }
  
    get(userId) {
      return this.cache.get(userId);
    }
  
    set(userId, conversation) {
      this.cache.set(userId, conversation);
    }
  }
  
  module.exports = ConversationCache;