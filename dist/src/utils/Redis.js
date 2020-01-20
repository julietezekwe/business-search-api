"use strict";
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
            password: config.redis.password,
            user: config.redis.user,
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
    async setObject(hash, key, value, expiryTime) {
        let stringValue;
        if (typeof value !== 'string')
            stringValue = JSON.stringify(value);
        else
            stringValue = value;
        const keySet = await this.client
            .hsetAsync(hash, key, stringValue, 'EX', expiryTime);
        if (keySet === 0)
            this.logger.info(`Key: ${key} already exists in redis hash`);
        if (keySet === 1)
            this.logger.info(`Key: ${key} saved to redis`);
    }
    /**
     *@description Gets object
     *@param  {string} hash
     *@param  {string} key
     *@returns {object} - parsed data
     */
    async getObject(hash, key) {
        const value = await this.client.hgetAsync(hash, key);
        if (!value)
            return {};
        return JSON.parse(value);
    }
    /**
     *@description Deletes keys
     *@param  {string} key
     *@returns {void}
     */
    async deleteKey(hash, key) {
        this.logger.info(`deleting object with key: ${key}...`);
        await this.client.hdelAsync(hash, key);
    }
    /**
     *@description Closes redis connection
     *@returns {void}
     */
    async closeInstance() {
        await this.client.quit();
    }
}
exports.default = RedisClient;
//# sourceMappingURL=Redis.js.map