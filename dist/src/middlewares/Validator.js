"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
   * Creates an instance of Validator.
   */
class Validator {
    /**
     * Validates an input
     *@returns {Function} - next()
     */
    async addressValidator(req, res, next) {
        try {
            if (lodash_1.isEmpty(lodash_1.get(req, 'body.address', '').trim())) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid address type',
                });
            }
            if (typeof req.body.address.trim() === 'string')
                return next();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map