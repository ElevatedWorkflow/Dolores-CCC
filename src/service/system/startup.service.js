//It may seem redundant to pass these dependencies [openai, messageHandler, guildService] in through the constructor instead of doing a hard import,
//But this allows us to "stub" them out later for "unit testing" which by definition can only be dependent on one file. This is one area in which
//We still add boilerplate bullshit code for the sake of testing, while in most other cases you wouldn't change code for tests.
class StartupService {
    constructor(clientService, lifecycleHelperService, validationHelperService) {
        this.clientService = clientService;
        this.lifecycleHelperService = lifecycleHelperService;
        this.validationHelperService = validationHelperService;
    }
  
    async init() {
        await this.validationHelperService.validateAll();
        await this.lifecycleHelperService.setupListeners();
        await this.clientService.login();
    }
  }
  
  module.exports = StartupService;