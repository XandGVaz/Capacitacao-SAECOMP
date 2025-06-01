import { Request, Response} from "express";
import {Tarefa} from "../interfaces/task.interface";
import getTaskData from "../repositories/getTaskData";

const getTasks = async(req: Request, res: Response): Promise<void> => {
    try{
        // Obtém lista de tarefas
        const tarefas : Tarefa[] = await getTaskData();
        
        // Se a lista de tarefas estiver vazia, avisa o usuário
        if(!tarefas){
            res.status(404).json({ message: 'Tabela de tarefas não existente'});
            return ;
        }

        // Retorna lista de tarefas
        res.json(tarefas);
    
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Erro interno do servidor'});
    }
}

export default getTasks;