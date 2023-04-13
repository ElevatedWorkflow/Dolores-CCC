const { Client } = require('discord.js');

class ClientService {
  client;
  constructor() {
    this.client = this.createClient();
  }

  createClient() {
    return new Client({intents: 32767});
  }

  get Client() {
    return this.client;
  }
  async login() {
    try {
      await this.client.login("MTA5NTg5MDQxMDk1OTgwMjQ3OQ.G5aFBW.k6stsizSsfLXsQLqAqdWjDtfIxiWJsnIc005-8");
      console.log('Bot is now connected!');
    } catch (error) {
      console.error('Error connecting to Discord:', error);
    }
  }
}

module.exports = ClientService;