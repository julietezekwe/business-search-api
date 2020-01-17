"use strict";
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
    constructor({ yelp }) {
        this.yelp = yelp;
        auto_bind_1.default(this);
    }
    /**
     * Retrieves top businesses and their details
     *@returns {object} - businesses
     */
    async retrieveTopBusinesses(points, category) {
        const businesses = await this.yelp.getCoffeeRestaurant(points, category);
        try {
            return Object.assign({}, businesses);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Retrieves all businesses in groups
     *@returns {object} - group in counts
     */
    async retrieveAllBusinesse(points) {
        try {
            const topBusinesses = await this.yelp.getBussinesses(points);
            return topBusinesses;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = BusinessService;
//# sourceMappingURL=BusinessService.js.map