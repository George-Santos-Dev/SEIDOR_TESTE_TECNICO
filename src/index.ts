import express from "express";

import { createInMemoryServices } from "./infra/in-memory";

const app = express();
const port = 3000;
const services = createInMemoryServices();

app.locals.services = services;
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API rodando com TypeScript + Express");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
