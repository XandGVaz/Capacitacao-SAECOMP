import { Request, Response} from "express";
import { Tarefa } from "../interfaces/task.interface";
import updateTaskWithIdData from "../repositories/updateTaskWithIdData";
import { updateTaskParamSchema } from "../schemas/updateTask.schema";

const updateTaskWithId = async(req: Request, res: Response): Promise<void> => {
    try{
        // obtém id passado por parâmetro
        const {id} = updateTaskParamSchema.parse(req.params);
        
        // Obtém número de linhas com campo status atualizado
        const rowCount =  await updateTaskWithIdData(id);
        
        // Se nenhuma linha foi atualizada (erro), avisa o usuário 
        if(rowCount === 0){
            res.status(404).json({ message: 'Nenhuma não atualizada'})
        }

        // Envia número de linhas atualizadas
        res.json({ message: `${rowCount} tarefas atualizadas`});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Erro interno do servidor'});
    }
}

export default updateTaskWithId;