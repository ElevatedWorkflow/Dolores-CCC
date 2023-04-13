const chalk = require('chalk');
const LoggerService = require('../../../src/service/system/logger.service');
const MessageService = require('../../../src/service/system/message.service');

describe('LoggerService', () => {
  let loggerService;
  let messageServiceMock;

  beforeEach(() => {
    messageServiceMock = new MessageService();
    loggerService = new LoggerService(messageServiceMock);
  });

  describe('logSystem', () => {
    it('should log a system message', () => {
      const message = 'System message';
      const expectedOutput = `<${chalk.yellow('SYSTEM')}>: ${message} [${chalk.blueBright(new Date().toLocaleString('en-US').replace(",", ""))}]`;
      console.log = jest.fn();
      loggerService.logSystem(message);
      expect(console.log).toHaveBeenCalledWith(expectedOutput);
    });
  });

  describe('logError', () => {
    it('should log an error message', () => {
      const errorMessage = 'An error occurred';
      const error = new Error(errorMessage);
      const expectedOutput = `<${chalk.red('ERROR')}>: ${errorMessage} [${chalk.blueBright(new Date().toLocaleString('en-US').replace(",", ""))}]`;
      console.log = jest.fn();
      loggerService.logError(error);
      expect(console.log).toHaveBeenCalledWith(expectedOutput);
    });

    it('should not log anything if the argument is not an instance of Error', () => {
      console.log = jest.fn();
      loggerService.logError('This is not an Error object');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('logSuccess', () => {
    it('should log a success message', () => {
      const message = 'Success message';
      const expectedOutput = `<${chalk.green('SUCCESS')}>: ${message} [${chalk.blueBright(new Date().toLocaleString('en-US').replace(",", ""))}]`;
      console.log = jest.fn();
      loggerService.logSuccess(message);
      expect(console.log).toHaveBeenCalledWith(expectedOutput);
    });
  });
});