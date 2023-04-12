require('dotenv').config();
const openai = require('openai');
openai.apiKey = process.env.OPENAI_API_KEY;
const botToken = process.env.BOT_TOKEN;

const ClientService = require('./src/service/library/discordjs/client.service');
const clientService = new ClientService(botToken, openai);

clientService.init();