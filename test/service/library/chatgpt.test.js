const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const ChatGPTService = require('./chat-gpt-service');
const ConversationService = require('./conversation-service'); // Replace with the actual path to your ConversationService class

describe('ChatGPTService', () => {
  const mockAxios = new MockAdapter(axios);
  const conversationService = new ConversationService();
  const chatGPTService = new ChatGPTService(conversationService);

  afterEach(() => {
    mockAxios.reset();
  });

  test('getResponse returns GPT response', async () => {
    const mockConversation = [
      {
        role: 'user',
        content: 'Hello',
      },
    ];
    const userId = '123456789';
    const expectedResponse = 'Hello! How can I help you today?';

    mockAxios.onPost('https://api.openai.com/v1/chat/completions').reply(200, {
      choices: [
        {
          message: {
            content: expectedResponse,
          },
        },
      ],
    });

    const response = await chatGPTService.getResponse(mockConversation, userId);
    expect(response).toBe(expectedResponse);
  });

  test('handleMessage updates conversation and returns GPT response', async () => {
    const userId = '123456789';
    const content = 'How are you?';
    const expectedResponse = 'I am an AI, so I don't have emotions, but I'm here to help you.';

    jest.spyOn(chatGPTService, 'getResponse').mockResolvedValue(expectedResponse);
    jest.spyOn(conversationService, 'updateConversation');
    jest.spyOn(conversationService, 'getConversation').mockResolvedValue([]);

    const response = await chatGPTService.handleMessage(userId, content);

    exp
ect(chatGPTService.getResponse).toHaveBeenCalledWith([], userId);
    expect(conversationService.updateConversation).toHaveBeenCalledWith(userId, {
      role: 'user',
      content: content,
    });
    expect(conversationService.updateConversation).toHaveBeenCalledWith(userId, {
      role: 'assistant',
      content: expectedResponse,
    });
    expect(response).toBe(expectedResponse);
  });
});