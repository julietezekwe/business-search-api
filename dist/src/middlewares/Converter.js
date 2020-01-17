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
const node_geocoder_1 = __importDefault(require("node-geocoder"));
/**
   * Creates an instance of Converter.
   */
class Converter {
    constructor() {
        this.options = {
            provider: 'google',
            apiKey: 'AIzaSyBb9SjmLyHoIv15i5igN5AaFM0JPuhidns'
        };
        this.geocoder = node_geocoder_1.default(this.options);
        auto_bind_1.default(this);
    }
    /**
 * converts a physical address to points
 *@returns {Function} - next()
 */
    addressToPoints(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = yield this.geocoder.geocode(req.body.address);
                req.body.points = {
                    latitude: payload[0].latitude,
                    longitude: payload[0].longitude,
                };
                return next();
            }
            catch (error) {
                res.json({ success: false, message: 'there was an error' });
                throw error;
            }
        });
    }
}
exports.default = Converter;
//# sourceMappingURL=Converter.js.map