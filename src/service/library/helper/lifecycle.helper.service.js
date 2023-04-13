class LifecycleHelperService {
    constructor(clientService, commandService, conversationService, chatGPTService) {
        this.clientService = clientService;
        this.commandService = commandService;
        this.conversationService = conversationService;
        this.chatGPTService = chatGPTService;
      }

    async setupListeners() {
        this.clientService.client.on('ready', async () => {
            console.log(`Logged in as ${this.clientService.Client.user.tag}!`);
            await this.commandService.registerCommands();
            this.commandService.setupListeners();
        });

        this.clientService.client.on('messageCreate', async (message) => {
            if (message.author.bot) return;
            if (message.mentions.has(this.clientService.Client.user)) {
                const userId = message.author.id;
                this.conversationService.updateConversation(userId, {
                    role: 'user',
                    content: message.content,
                });

                const response = await this.chatGPTService.handleMessage(
                    this.conversationService.getConversation(userId)
                );

                this.conversationService.updateConversation(userId, {
                    role: 'assistant',
                    content: response,
                });

                if (response.trim() !== '') {
                    message.reply(response);
                }
            }
        });
    }
}
  
module.exports = LifecycleHelperService;