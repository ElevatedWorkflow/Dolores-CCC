const LifecycleHelperService = require('../lifecycle-helper-service');

// Mock dependencies
const clientServiceMock = {
  client: {
    on: jest.fn(),
    user: { tag: 'TestBot' },
  },
};
const commandServiceMock = {
  registerCommands: jest.fn(),
  setupListeners: jest.fn(),
};
const conversationServiceMock = {};
const chatGPTServiceMock = {
  handleMessage: jest.fn(),
};

// Test cases
describe('LifecycleHelperService', () => {
  let helperService;

  beforeEach(() => {
    helperService = new LifecycleHelperService(
      clientServiceMock,
      commandServiceMock,
      conversationServiceMock,
      chatGPTServiceMock
    );
  });

  test('constructor initializes dependencies', () => {
    expect(helperService.clientService).toBe(clientServiceMock);
    expect(helperService.commandService).toBe(commandServiceMock);
    expect(helperService.conversationService).toBe(conversationServiceMock);
    expect(helperService.chatGPTService).toBe(chatGPTServiceMock);
  });
});