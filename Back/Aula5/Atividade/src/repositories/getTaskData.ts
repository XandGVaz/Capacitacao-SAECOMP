import pool from "../database/connection";
import { Tarefa } from "../interfaces/task.interface";

const dbQuery = `
select 
id,
titulo,
status
from tarefas
`;

const getTaskData = async(): Promise<Tarefa[]> => {
    
    // Recebe linhas da tablr
    const { rows } = await pool.query(dbQuery);

    // Iguala a lista de tarefas às linhas das tabelas
    const tarefas : Tarefa[] = rows;
    
    // Retorna lista de tarefas obtidas (pode estar vazia)
    return tarefas;
}

export default getTaskData;