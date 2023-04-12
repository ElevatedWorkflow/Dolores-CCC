require('dotenv').config();
const openai = require('openai');
openai.apiKey = process.env.OPENAI_API_KEY;

const ClientService = require('./src/service/library/discordjs/client.service');
const clientService = new ClientService(process.env.BOT_TOKEN, openai);

clientService.init();