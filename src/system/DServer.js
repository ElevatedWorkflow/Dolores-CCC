const DServer = require('./d-server');

class WebServerService {
  constructor(port, publicPath) {
    this.server = new DServer(port, publicPath);
  }

  start() {
    this.server.start();
  }

  stop() {
    this.server.close();
  }
}

module.exports = WebServerService;