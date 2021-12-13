"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const errorHanlder_1 = __importDefault(require("./middleware/errorHanlder"));
const loginRouter_1 = __importDefault(require("./routers/loginRouter"));
const registerRouter_1 = __importDefault(require("./routers/registerRouter"));
const PORT = process.env.PORT || 3001;
//App setup
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Morgan setup
morgan_1.default.token('body', (req, _res) => {
    return JSON.stringify(req.body);
});
app.use((0, morgan_1.default)(':method :url :body'));
//Routers
app.use('/login', loginRouter_1.default);
app.use('/register', registerRouter_1.default);
//Static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../../front/build/')));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../front/build/index.html'));
});
//Error Handler
app.use(errorHanlder_1.default);
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
