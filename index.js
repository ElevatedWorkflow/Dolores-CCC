require('dotenv').config();
const ServiceFactory = require('./src/service/service.factory');

const services = ServiceFactory.createServices();
services.startupService.init();