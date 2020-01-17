"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const app_1 = __importDefault(require("./app"));
const Yelp_1 = __importDefault(require("./utils/Yelp"));
const configureContainer = () => {
    // Create IoC container for dependency injection
    const container = awilix_1.createContainer();
    // Register config and logger in the container
    container.register({
        config: awilix_1.asValue(config_1.default),
        logger: awilix_1.asFunction(logger_1.default)
            .inject(() => ({
            label: config_1.default.logs.label,
            level: config_1.default.logs.level,
            filename: config_1.default.logs.filename,
        }))
            .singleton(),
    });
    // Auto-register repositories, services, controllers and routes
    container.loadModules([
        ['services/*.js', awilix_1.Lifetime.SCOPED],
        ['controllers/*.js', awilix_1.Lifetime.SCOPED],
        ['routes/*.js', awilix_1.Lifetime.SINGLETON],
        ['middlewares/*.js', awilix_1.Lifetime.SCOPED],
    ], {
        cwd: __dirname,
        formatName: 'camelCase',
    });
    // Register the express application and server last (it will auto-mount routers)
    container.register({
        app: awilix_1.asFunction(app_1.default)
            .inject(() => ({ container }))
            .singleton(),
        yelp: awilix_1.asClass(Yelp_1.default)
            .inject(() => ({ container })),
    });
    return container;
};
exports.default = configureContainer;
//# sourceMappingURL=container.js.map