"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUsersRoute = ({ businessesController }) => {
    const router = express_1.Router();
    router.post('/groups', businessesController.getAllBusinessesGroups);
    router.post('/top', businessesController.getTopBusinesses);
    return router;
};
exports.default = createUsersRoute;
//# sourceMappingURL=businesses.js.map