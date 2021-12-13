"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateResponseUser = exports.validateRegistrationParams = exports.validateLoginParams = exports.isUser = exports.isResponseUser = exports.isRegistrationParams = exports.isLoginParams = exports.isBoolean = exports.isObject = exports.isString = exports.isNumber = void 0;
const users_1 = require("../db/users");
const errorCodes_1 = __importDefault(require("../middleware/errorCodes"));
function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}
exports.isNumber = isNumber;
function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
exports.isString = isString;
function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}
exports.isObject = isObject;
function isBoolean(bool) {
    return typeof bool === 'boolean';
}
exports.isBoolean = isBoolean;
function isLoginParams(params) {
    return isObject(params) && 'username' in params && 'password' in params;
}
exports.isLoginParams = isLoginParams;
function isRegistrationParams(params) {
    return isObject(params) && 'username' in params && 'password' in params;
}
exports.isRegistrationParams = isRegistrationParams;
function isResponseUser(user) {
    return (isObject(user) &&
        'username' in user &&
        'token' in user &&
        'hasTwoFactor' in user);
}
exports.isResponseUser = isResponseUser;
function isUser(user) {
    return (isObject(user) &&
        'username' in user &&
        'password' in user &&
        'hasTwoFactor' in user);
}
exports.isUser = isUser;
function validateLoginParams(params) {
    if (!isLoginParams(params) || !isString(params.username)) {
        throw errorCodes_1.default.nameRequired;
    }
    return params;
}
exports.validateLoginParams = validateLoginParams;
function validateRegistrationParams(params) {
    if (!isRegistrationParams(params) ||
        (!isString(params.username) && !isString(params.password))) {
        throw errorCodes_1.default.invalidRegistrationParams;
    }
    else if (params.username.length < 3 || params.username.length > 7) {
        throw errorCodes_1.default.invalidInput;
    }
    else if (params.password.length < 3) {
        throw errorCodes_1.default.passwordTooShort;
    }
    else if ((0, users_1.userExists)(params.username))
        throw errorCodes_1.default.userExists;
    return params;
}
exports.validateRegistrationParams = validateRegistrationParams;
function validateResponseUser(user) {
    if (isResponseUser(user)) {
        if (!isBoolean(user.hasTwoFactor) ||
            !isString(user.token || !isString(user.username)))
            throw errorCodes_1.default.invalidRequestUser;
        return user;
    }
    throw errorCodes_1.default.invalidRequestUser;
}
exports.validateResponseUser = validateResponseUser;
function validateUser(user) {
    if (isUser(user)) {
        if (!isBoolean(user.hasTwoFactor) ||
            !isString(user.password || !isString(user.username)))
            throw errorCodes_1.default.invalidRequestUser;
        return user;
    }
    throw errorCodes_1.default.invalidRequestUser;
}
exports.validateUser = validateUser;
