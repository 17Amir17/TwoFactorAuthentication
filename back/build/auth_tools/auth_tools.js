"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.checkSecret = exports.generateTwoFactor = exports.validateToken = exports.generateToken = exports.generateAccessToken = exports.compare = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const twofactor = require("node-2fa");
const SECRET = process.env.SECRET || 'secret';
const validTokens = {};
function encrypt(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(password, salt);
}
exports.encrypt = encrypt;
function compare(hash, password) {
    return bcrypt_1.default.compareSync(password, hash);
}
exports.compare = compare;
function generateAccessToken(data) {
    const token = generateToken(data, '10h');
    validTokens[token] = '.';
    return token;
}
exports.generateAccessToken = generateAccessToken;
function generateToken(data, exp) {
    return jsonwebtoken_1.default.sign(data, SECRET, {
        expiresIn: exp,
    });
}
exports.generateToken = generateToken;
function validateToken(accessKey) {
    try {
        console.log('Is this valid?', validTokens[accessKey]);
        if (!validTokens[accessKey])
            return false;
        return jsonwebtoken_1.default.verify(accessKey, SECRET);
    }
    catch (error) {
        return false;
    }
}
exports.validateToken = validateToken;
function generateTwoFactor(appName = 'TwoFactor', username) {
    return twofactor.generateSecret({ name: appName, account: username });
}
exports.generateTwoFactor = generateTwoFactor;
function checkSecret(secret, code) {
    const answer = twofactor.verifyToken(secret, code);
    if (!answer || answer === null)
        return false;
    if (answer.delta === 0)
        return true;
    return false;
}
exports.checkSecret = checkSecret;
function deleteToken(token) {
    if (validTokens[token]) {
        delete validTokens[token];
    }
}
exports.deleteToken = deleteToken;
