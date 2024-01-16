"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_1 = __importDefault(require("./routers/todo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
const port = process.env.APP_PORT || 3000;
app.use(express_1.default.json());
app.use("/todo", todo_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        applicaiton: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        developed_by: process.env.APP_DEVELOPER,
    });
});
app.listen(port, () => {
    console.log(`🚀 Server is launched at http://localhost:${port} ⚡`);
});
