import express from "express";
import createTask from "../controllers/createTask";
import getTasks from "../controllers/getTasks";
import getTasksWithStatus from "../controllers/getTasksWithStatus";
import updateTaskWithId from "../controllers/updateTaskWithId";

// Instanciação do express
const openRouter = express.Router();

// Definição do tratamento de requisições
openRouter.get('/tarefas', getTasks);
openRouter.get('/tarefas/status/:status', getTasksWithStatus);
openRouter.post('/tarefas', createTask);
openRouter.patch('/tarefas/id/:id', updateTaskWithId);

export default openRouter;