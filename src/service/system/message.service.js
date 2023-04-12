const MessageJSON = require('./config/message.config.json');

class MessageService {
  static Messages = MessageJSON;
}

module.exports = MessageService;