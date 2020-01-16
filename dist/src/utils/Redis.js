"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const redis_1 = __importDefault(require("redis"));
const bluebird_1 = require("bluebird");
const Redis = bluebird_1.promisifyAll(redis_1.default);
/**
   * Creates an instance of Redis
   */
class RedisClient {
    /**
     * Creates an instance of RedisClient
     * @param {object} container
     * @memberof RedisClient
     */
    constructor({ config, logger }) {
        // create and connect to redis client
        this.client = Redis.createClient({
            host: config.redis.host,
            port: config.redis.port,
        });
        this.logger = logger;
        auto_bind_1.default(this);
    }
    /**
     *@description Returns redis client
     *@returns {object} redis
     */
    getClient() {
        return this.client;
    }
    /**
     *@description Sets object
     *@param  {string} hash
     *@param  {string} key
     *@param  {object} value
     *@param  {number} expiryTime - in seconds
     *@returns {void}
     */
    setObject(hash, key, value, expiryTime) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringValue;
            if (typeof value !== 'string')
                stringValue = JSON.stringify(value);
            else
                stringValue = value;
            const keySet = yield this.client
                .hsetAsync(hash, key, stringValue, 'EX', expiryTime);
            if (keySet === 0)
                this.logger.info(`Key: ${key} already exists in redis hash`);
            if (keySet === 1)
                this.logger.info(`Key: ${key} saved to redis`);
        });
    }
    /**
     *@description Gets object
     *@param  {string} hash
     *@param  {string} key
     *@returns {object} - parsed data
     */
    getObject(hash, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.client.hgetAsync(hash, key);
            if (!value)
                return {};
            return JSON.parse(value);
        });
    }
    /**
     *@description Deletes keys
     *@param  {string} key
     *@returns {void}
     */
    deleteKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`deleting object with key: ${key}...`);
            yield this.client.delAsync(key);
        });
    }
    /**
     *@description Closes redis connection
     *@returns {void}
     */
    closeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.quit();
        });
    }
}
exports.default = RedisClient;
//# sourceMappingURL=Redis.js.map