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
/**
   * Creates an instance of BusinessService.
   */
class BusinessService {
    /**
     * Creates an instance of BusinessService.
     * @param {object} param
     * @memberof BusinessService
     */
    constructor({ yelp, config }) {
        this.yelp = yelp;
        auto_bind_1.default(this);
    }
    /**
     * Retrieves top businesses and their details
     *@returns {object} - businesses
     */
    retrieveTopBusinesses(body, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const businesses = yield this.yelp.getCoffeeRestaurant(body, category);
            try {
                return Object.assign({}, businesses);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Retrieves all businesses in groups
     *@returns {object} - group in counts
     */
    retrieveAllBusinesse(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topBusinesses = yield this.yelp.getBussinesses(body.points);
                return topBusinesses;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = BusinessService;
//# sourceMappingURL=BusinessService.js.map