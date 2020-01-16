"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validator_1 = __importDefault(require("../middlewares/Validator"));
const validator = new Validator_1.default();
const createUsersRoute = ({ businessesController }) => {
    const router = express_1.Router();
    router.post('/groups', validator.addressValidator, businessesController.getAllBusinessesGroups);
    router.post('/top', businessesController.getTopBusinesses);
    return router;
};
exports.default = createUsersRoute;
//# sourceMappingURL=businesses.js.map