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
                const userId = message.author.Id
                const content = message.content
                const response = await this.chatGPTService.handleMessage(
                    userId, content
                );

                if (response.trim() !== '') {
                    message.reply(response);
                }
            }
        });
    }
}
  
module.exports = LifecycleHelperService;