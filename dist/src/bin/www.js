"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const container_1 = __importDefault(require("../container"));
const { config, logger, app, } = container_1.default().cradle;
// Get the hostname and port to listen on
const hostname = config.hostname || '127.0.0.1';
const port = config.port || 8000;
app.listen(port, () => {
    logger.info(`API is listening on ${hostname}:${port}`);
});
process.on('SIGINT', () => {
    logger.info('Shutting down server...');
    logger.info('Server successfully shutdown');
    process.exit(0);
});
//# sourceMappingURL=www.js.map