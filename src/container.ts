import {
    createContainer, asFunction,
    asValue, Lifetime, asClass,
  } from 'awilix';
  import config from './config';
  import createLogger from './logger';
  import createApp from './app';
  import RedisClient from './utils/Redis';
  
  
  const configureContainer = () => {
    // Create IoC container for dependency injection
    const container = createContainer();
  
    // Register config and logger in the container
    container.register({
      config: asValue(config),
      api_key: asValue(config.api_key),
      logger: asFunction(createLogger)
        .inject(() => ({
          label: config.logs.label,
          level: config.logs.level,
          filename: config.logs.filename,
        }))
        .singleton(),
    });
  
    // Auto-register repositories, services, controllers and routes
    container.loadModules([
      ['services/*.js', Lifetime.SCOPED],
      ['controllers/*.js', Lifetime.SCOPED],
      ['routes/*.js', Lifetime.SINGLETON],
    ], {
      cwd: __dirname,
      formatName: 'camelCase',
    });
  
    // Register the express application and server last (it will auto-mount routers)
    container.register({
      app: asFunction(createApp)
        .inject(() => ({ container }))
        .singleton(),
      redis: asClass(RedisClient)
        .inject(() => ({ container }))
        .singleton(),
    });
    return container;
  };
  
  export default configureContainer;
  