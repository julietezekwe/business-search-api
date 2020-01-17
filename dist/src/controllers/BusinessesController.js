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
    getTopBusinesses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                points: req.body.points
            };
            try {
                const topCoffeeShops = yield this.businessService.retrieveTopBusinesses(payload, 'coffee');
                const topResturants = yield this.businessService.retrieveTopBusinesses(payload, 'resturant');
                return res.status(200).json({ topCoffeeShops, topResturants });
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    /**
     * Retrieves all businesses details in gropus
     * @param {object} req
     * @param {object} res
     *@returns {object} - count in groups
     */
    getAllBusinessesGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessGroups = yield this.businessService.retrieveAllBusinesse(req.body);
                return res.status(200).json({ businessGroups });
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map