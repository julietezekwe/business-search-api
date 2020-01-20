"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const node_geocoder_1 = __importDefault(require("node-geocoder"));
/**
   * Creates an instance of Converter.
   */
class Converter {
    constructor({ redis, config }) {
        this.redis = redis;
        this.options = {
            provider: config.geocoder.provider,
            apiKey: config.geocoder.api_key,
        };
        this.geocoder = node_geocoder_1.default(this.options);
        auto_bind_1.default(this);
    }
    /**
 * converts a physical address to points
 *@returns {Function} - next()
 */
    async addressToPoints(req, res, next) {
        const { address } = req.body;
        const key = address.replace(' ', '').toLowerCase();
        try {
            let payload = await this.redis.getObject('Converter', key);
            if (!Object.entries(payload).length) {
                const data = await this.geocoder.geocode(address);
                if (!data.length) {
                    return res.status(404).json({ success: false, message: 'Address not found' });
                }
                let { longitude, latitude } = data[0];
                payload = { longitude, latitude };
                await this.redis.setObject('Converter', key, payload);
            }
            req.body.points = payload;
            return next();
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'there was an error' });
            throw error;
        }
    }
}
exports.default = Converter;
//# sourceMappingURL=Converter.js.map