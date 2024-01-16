import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import route from "./routers/todo";

dotenv.config();

const app: Express = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/todo", route);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        applicaiton: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        developed_by: process.env.APP_DEVELOPER,
    });
});

app.listen(port, () => {
    console.log(`🚀 Server is launched at http://localhost:${port} ⚡`);
});
