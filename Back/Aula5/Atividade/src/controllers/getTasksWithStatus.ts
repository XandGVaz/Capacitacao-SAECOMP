import { Request, Response} from "express";
import {Tarefa} from "../interfaces/task.interface";
import getTasksWithStatusData from "../repositories/getTasksWithStatusData";
import { getTasksParamSchema } from "../schemas/getTasks.schema";

const getTasksWithStatus = async(req: Request, res: Response): Promise<void> =>{
    try{
        // Obtém status a ser considerado como parâmetro
        const {status} = getTasksParamSchema.parse(req.params);
        
        // Iguala lista de tarefas às linhas obtidas da table
        const tarefas: Tarefa[] = await getTasksWithStatusData(status);
        
        // Avisa o usuário caso nenhuma tarefa seja encontrada
        if(!tarefas){
            res.status(404).json({ message: 'Tabela de tarefas concluidas não existente'});
            return;
        }

        // Retorna tarefas encontradas
        res.json(tarefas);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Erro interno do servidor'});
    }
}

export default getTasksWithStatus;