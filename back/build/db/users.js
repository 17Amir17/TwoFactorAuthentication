"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTwoFactor = exports.userExists = exports.addUser = exports.getUser = void 0;
const auth_tools_1 = require("../auth_tools/auth_tools");
const errorCodes_1 = __importDefault(require("../middleware/errorCodes"));
const users = {};
function getUser(username) {
    const user = users[username];
    if (!user)
        throw errorCodes_1.default.userNotFound;
    return user;
}
exports.getUser = getUser;
function addUser(user) {
    user.password = (0, auth_tools_1.encrypt)(user.password);
    users[user.username] = user;
}
exports.addUser = addUser;
function userExists(username) {
    return !!users[username];
}
exports.userExists = userExists;
function addTwoFactor(username, secret, qr) {
    if (users[username]) {
        users[username].hasTwoFactor = true;
        users[username].secret = secret;
        users[username].qr = qr;
    }
}
exports.addTwoFactor = addTwoFactor;
