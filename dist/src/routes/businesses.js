"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUsersRoute = ({ businessesController, converter, validator }) => {
    const router = express_1.Router();
    router.post('/groups', validator.addressValidator, converter.addressToPoints, businessesController.getAllBusinessesGroups);
    router.post('/top', validator.addressValidator, converter.addressToPoints, businessesController.getTopBusinesses);
    return router;
};
exports.default = createUsersRoute;
//# sourceMappingURL=businesses.js.map