class BaseService {
  static Client;
  static Logger;
  static Config;

  static set Client(value) {
    Client = value;
  }

  static get Client() {
    return Client;
  }

  static set Logger(value) {
    Logger = value;
  }

  static get Logger() {
    return Logger;
  }

  static set Config(value) {
    Config = value;
  }

  static get Config() {
    return Config;
  }
}

module.exports = BaseService;