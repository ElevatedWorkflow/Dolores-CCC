const { MessageMentions } = require('discord.js');

class LifecycleHelperService {
  constructor(clientService, commandService, conversationService, chatGPTService) {
    this.clientService = clientService;
    this.commandService = commandService;
    this.conversationService = conversationService;
    this.chatGPTService = chatGPTService;
  }

  async sendLongMessage(channel, message) {
    const maxLength = 2000;
    let startIndex = 0;

    while (startIndex < message.length) {
      const endIndex = Math.min(message.length, startIndex + maxLength);
      const messagePart = message.slice(startIndex, endIndex);
      await channel.send(messagePart);
      startIndex = endIndex;
    }
  }

  async setupListeners() {
    this.clientService.client.on('ready', async () => {
      console.log(`Logged in as ${this.clientService.client.user.tag}!`);
      await this.commandService.registerCommands();
      this.commandService.setupListeners();
    });

    this.clientService.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;
      if (message.mentions.has(this.clientService.client.user)) {
        const userId = message.author.id;
        const content = message.content;
        const response = await this.chatGPTService.handleMessage(userId, content);

        if (response.length === 0) {
          return;
        }

        if (typeof response === 'string') {
          this.sendLongMessage(message.channel, response);
        } else {
          let combinedResponse = '';

          for (let i = 0; i < response.length; i++) {
            const messageContent = response[i].content.trim();

            if (messageContent !== '') {
              const responseText = combinedResponse + messageContent;

              if (responseText.length <= 2000) {
                combinedResponse = responseText;
              } else {
                this.sendLongMessage(message.channel, combinedResponse);
                combinedResponse = messageContent;
              }
            }

            if (i === response.length - 1) {
              this.sendLongMessage(message.channel, combinedResponse);
            }
          }
        }
      }
    });
  }
}

module.exports = LifecycleHelperService;