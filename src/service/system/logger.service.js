const chalk = require('chalk');

const MessageCode = {
  SYSTEM: 'system',
  SUCCESS: 'success',
  ERROR: 'error',
  DEBUG: 'debug',
};

class LoggerService {
  static Log = {
    System: (message) => {
      LoggerService.LogMessage(MessageCode.SYSTEM, message, chalk.yellow);
    },
    Error: (error) => {
      if (error instanceof Error) {
        LoggerService.LogMessage(MessageCode.ERROR, error.message, chalk.red);
      }
    },
    Success: (message) => {
      LoggerService.LogMessage(MessageCode.SUCCESS, message, chalk.green);
    },
    LogMessage: (type, message, consoleColor) => {
      const prefix = consoleColor(this.Message.Messages.logging.prefix[type]);
      const logTime = chalk.blueBright(
        `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`
      );
      console.log(`<${prefix}>: ${message} [${logTime}]`);
    },
  };
}

module.exports = LoggerService;