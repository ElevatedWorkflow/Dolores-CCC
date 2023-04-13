const MessageService = require('./system/message.service');
const LoggerService = require('./system/logger.service');
const ConfigService = require('./system/config.service');
const ClientService = require('./library/discordjs/client.service');
const GuildService = require('./library/discordjs/guild.service');
const CommandService = require('./library/discordjs/command.service');
const ConversationHelperService = require('./library/helper/conversation.helper.service');
const ChatGPTService = require('./library/chatgpt/chatgpt.service');
const LifecycleHelperService = require('./library/helper/lifecycle.helper.service');
const StartupService = require('./system/startup.service');
const ValidationHelperService = require('./library/helper/validation.helper.service');
const VCManagerService = require('./feature/vcmanager.service')
const VerifyService = require('./feature/verify.service')

class ServiceFactory {
    static createServices() {
        const messageService = new MessageService();
        const loggerService = new LoggerService(messageService);
        const configService = new ConfigService(loggerService);
        const clientService = new ClientService();

        const guildService = new GuildService(clientService);
        const vcManagerService = new VCManagerService();
        const validationHelperService = new ValidationHelperService(loggerService, configService);
        const verifyService = new VerifyService(guildService);
        const commandService = new CommandService(
            clientService,
            guildService,
            messageService,
            loggerService,
            validationHelperService,
            vcManagerService,
            verifyService
        );

        const conversationService = new ConversationHelperService();
        const chatGPTService = new ChatGPTService();
        const lifecycleHelperService = new LifecycleHelperService(
            clientService,
            commandService,
            conversationService,
            chatGPTService
        );
        const startupService = new StartupService(clientService, lifecycleHelperService, validationHelperService);

        return {
            clientService,
            guildService,
            commandService,
            chatGPTService,
            lifecycleHelperService,
            startupService,
            messageService,
            loggerService,
            configService,
            vcManagerService,
            validationHelperService,
            verifyService,
        };
    }
}

module.exports = ServiceFactory;