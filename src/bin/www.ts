/* eslint-disable no-console */
import configureContainer from '../container';

const {
  config, logger, app,
} = configureContainer().cradle;
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
