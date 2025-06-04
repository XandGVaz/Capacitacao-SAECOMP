import express from "express";
import openRouter from "./routers/openRouters";
import {corsMiddleware} from "./middlewares/cors";

const app = express();
const port: number = 3000; // definição de porta usada

// Uso de middlewares
app.use(express.json());
app.use(corsMiddleware);

// Definição das rotas
app.use('/api', openRouter);

// Aplicação passa a rodar
app.listen(port, () => {
    console.log(`serving on http://localhost:${port}`);
});