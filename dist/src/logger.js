"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-shadow */
const winston_1 = __importDefault(require("winston"));
const CONSOLE_DATE_FORMAT = 'HH:mm:ss.SSS';
const createLogger = ({ label, level, filename }) => {
    const logger = winston_1.default.createLogger({ level });
    const hasLogFile = typeof filename === 'string' && filename.length > 0;
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.label({ label }), winston_1.default.format.timestamp({ format: CONSOLE_DATE_FORMAT }), winston_1.default.format.splat(), winston_1.default.format.printf(({ level, message, label, timestamp, }) => `${timestamp} [${label}] ${level}: ${message}`)),
    }));
    if (hasLogFile) {
        logger.add(new winston_1.default.transports.File({
            filename,
            format: winston_1.default.format.combine(winston_1.default.format.label({ label }), winston_1.default.format.timestamp(), winston_1.default.format.splat(), winston_1.default.format.uncolorize(), winston_1.default.format.json()),
        }));
    }
    return logger;
};
exports.default = createLogger;
//# sourceMappingURL=logger.js.map