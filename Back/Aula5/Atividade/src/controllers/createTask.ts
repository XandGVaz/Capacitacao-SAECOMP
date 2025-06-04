import { Request, Response} from "express";
import { Tarefa } from "../interfaces/task.interface";
import createTaskData from "../repositories/createTaskData"
import { createTaskBodySchema } from "../schemas/createTask.schema";

const createTask = async(req: Request, res: Response): Promise<void> =>{
    try{
        // Recebe nova tarefa a ser adicionada do corpo JSON da requisição POST
        const novaTarefa = createTaskBodySchema.parse(req.body);
        
        // Obtém número de linhas adicionadas na table
        const rowCount = await createTaskData(novaTarefa.titulo, novaTarefa.status);
        
        // Se nenhuma linha foi adicionada (erro), avisa usuário
        if(rowCount === 0){
            res.status(404).json({message: 'Tarefa não inserida'});
            return;
        }

        // Retorna mensagem dizendo que a tarefa enviada foi inserida
        res.status(201).json({ message: 'Tarefa inserida com sucesso'});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Erro interno do servidor'});
    }
}

export default createTask;


