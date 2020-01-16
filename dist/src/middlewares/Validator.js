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
    addressValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map