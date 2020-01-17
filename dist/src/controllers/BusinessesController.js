"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-constructor */
const auto_bind_1 = __importDefault(require("auto-bind"));
/**
   * Creates an instance of BusinessesController.
   */
class BusinessesController {
    /**
     * Creates an instance of BusinessesController.
     * @param {object} param
     * @memberof BusinessesController
     */
    constructor({ businessService }) {
        this.businessService = businessService;
        auto_bind_1.default(this);
    }
    /**
     * Retrieves top three businesses within set proximity
     * @param {object} req
     * @param {object} res
     *@returns {object} - businesses
     */
    async getTopBusinesses(req, res) {
        const { points } = req.body;
        try {
            const topCoffeeShops = await this.businessService.retrieveTopBusinesses(points, 'coffee');
            const topResturants = await this.businessService.retrieveTopBusinesses(points, 'resturant');
            return res.status(200).json({ topCoffeeShops, topResturants });
        }
        catch (error) {
            return res.json(error);
        }
    }
    /**
     * Retrieves all businesses details in gropus
     * @param {object} req
     * @param {object} res
     *@returns {object} - count in groups
     */
    async getAllBusinessesGroups(req, res) {
        const { points } = req.body;
        try {
            const businessGroups = await this.businessService.retrieveAllBusinesse(points);
            return res.status(200).json({ businessGroups });
        }
        catch (error) {
            return res.json(error);
        }
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map