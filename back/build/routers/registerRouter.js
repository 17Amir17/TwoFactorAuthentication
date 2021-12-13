"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_tools_1 = require("../auth_tools/auth_tools");
const users_1 = require("../db/users");
const errorCodes_1 = __importDefault(require("../middleware/errorCodes"));
const utils_1 = require("../services/utils");
const router = express_1.default.Router();
router.post('/twofactor', (req, res) => {
    const user = (0, utils_1.validateResponseUser)(req.body);
    // Validate user token
    const storedUser = (0, utils_1.validateUser)((0, auth_tools_1.validateToken)(user.token));
    if (user.username !== storedUser.username)
        throw errorCodes_1.default.badToken;
    // Generate two factor
    if (storedUser.hasTwoFactor)
        throw errorCodes_1.default.alreadyHasTwoFactor;
    const validation = (0, auth_tools_1.generateTwoFactor)('twofactor', user.username);
    (0, users_1.addTwoFactor)(user.username, validation.secret, validation.qr);
    (0, auth_tools_1.deleteToken)(user.token);
    res.json({
        message: 'You are now safer!',
        qr: validation.qr,
    });
});
router.post('', (req, res) => {
    const regParams = (0, utils_1.validateRegistrationParams)(req.body);
    const newUser = {
        username: regParams.username,
        password: regParams.password,
        hasTwoFactor: false,
    };
    (0, users_1.addUser)(newUser);
    res.json({ message: 'Welcome!' });
});
exports.default = router;
