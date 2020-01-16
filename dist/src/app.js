"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const awilix_1 = require("awilix");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const createApp = ({ logger, container, config }) => {
    const app = express_1.default();
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');
    // Enable Cross Origin Resource Sharing to all origins
    app.use(cors_1.default());
    // Parse incoming requests data
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(helmet_1.default());
    const registrations = awilix_1.listModules('routes/*.js', { cwd: __dirname })
        .map(registration => ({
        name: registration.name,
        router: container.resolve(registration.name),
    }));
    // Mount all routers within API router
    registrations.forEach((eachRegistration) => {
        const { name, router } = eachRegistration;
        app.use(`${config.api.prefix}/${name}`, router);
        logger.info(`Mounted ${name} to ${config.api.prefix}/${name}}`);
    });
    // error handlers
    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Well, will you help build this route? 🤷🏼‍♂️',
        });
        next();
    });
    return app;
};
exports.default = createApp;
//# sourceMappingURL=app.js.map