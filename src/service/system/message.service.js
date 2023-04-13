const MessageJSON = require('../../config/message.config.json');

class MessageService {
  constructor() {
    this.Messages = MessageJSON;
  }
}

module.exports = MessageService;