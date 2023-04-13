class ValidationHelperService {
    constructor(loggerService, configService) {
        this.loggerService = loggerService;
        this.configService = configService;
    }

    logValidationStart(validationType) {
        this.loggerService.logSystem(`Starting ${validationType} validation...`);
    }

    logValidationSuccess(validationType, message) {
        this.loggerService.logSuccess(`Validation succeeded for ${validationType}: ${message}`);
    }

    logValidationFailure(validationType, message, error) {
        this.loggerService.logError(`Validation failed for ${validationType}: ${message}`, error);
    }

    logValidationEnd(validationType) {
        this.loggerService.logSystem(`Completed ${validationType} validation.`);
    }

    validateConfig(config) {
        try {
        let configJSON = JSON.parse(JSON.stringify(config));
        if (configJSON == null) {
            throw new Error('Config is null or undefined.');
        }
        } catch (e) {
        if (e instanceof Error) {
            throw new Error(`Error validating config: ${e.message}`);
        }
        }
    }

    async validateAll() {
        const configs = this.configService.GetAllConfigs();
        this.logValidationStart('config');

        try {
        for (let config of configs) {
            this.validateConfig(config);
            this.logValidationSuccess('config', config.Name);
        }
        } catch (error) {
        this.logValidationFailure('config', config.Name, error);
        }

        this.logValidationEnd('config');
    }
}

module.exports = ValidationHelperService;