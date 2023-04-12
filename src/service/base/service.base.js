const ClientService = require('../../service/system/client.service');
const LoggerService = require('./logger.service');
const MessageService = require('./message.service');
const ConfigService = require('../system/config.service');

class BaseService {
  constructor() {
    this.Client = new ClientService()
    this.Logger = LoggerService;
    this.Message = MessageService;
    this.Config = new ConfigService(this.Logger);
    this.Config.Validate();
  }
}

module.exports = BaseService;