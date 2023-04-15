const WebServerService = require('./web-server-service');

class SiteService {
  constructor(port, publicPath) {
    this.webServerService = new WebServerService(port, publicPath);
  }

  start() {
    this.webServerService.start();
  }

  stop() {
    this.webServerService.stop();
  }
}

module.exports = SiteService;