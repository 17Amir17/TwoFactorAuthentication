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
router.post('', (req, res) => {
    const loginParams = (0, utils_1.validateLoginParams)(req.body);
    //Get user
    const user = (0, users_1.getUser)(loginParams.username);
    if (!user)
        throw errorCodes_1.default.userNotFound;
    //Validate password
    if (!(0, auth_tools_1.compare)(user.password, loginParams.password))
        throw errorCodes_1.default.incorrectPassword;
    // Check if user has 2 factor
    if (user.hasTwoFactor) {
        res.json({ message: '2factor', username: user.username });
        return;
    }
    // If not generate token and send
    generateTokenAndSend(res, user);
});
router.post('/qr', (req, res) => {
    const code = req.query.code;
    if (!code || !(0, utils_1.isString)(code))
        throw errorCodes_1.default.badToken;
    const { username } = req.body;
    if (!(0, utils_1.isString)(username))
        throw errorCodes_1.default.userNotFound;
    const storedUser = (0, users_1.getUser)(username);
    // Check code
    if (!storedUser.secret)
        throw new Error('User does not have two auth');
    const correct = (0, auth_tools_1.checkSecret)(storedUser.secret, code);
    if (!correct)
        throw errorCodes_1.default.badCode;
    //Generate access token
    generateTokenAndSend(res, storedUser);
});
function generateTokenAndSend(res, user) {
    //Generate access token
    const token = (0, auth_tools_1.generateAccessToken)(user);
    // Create ResponseUser
    const responseUser = Object.assign(Object.assign({}, user), { token });
    delete responseUser.password;
    delete responseUser.secret;
    res.json({ message: 'Hello there!', user: responseUser });
}
exports.default = router;
