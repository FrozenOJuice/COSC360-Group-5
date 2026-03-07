import express from "express";
import { config } from "./config/env.js"
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

export default app;
