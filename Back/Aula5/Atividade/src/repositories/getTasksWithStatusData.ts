import pool from "../database/connection";
import {Tarefa, Status} from "../interfaces/task.interface";

const dbQuery = `
select
id, 
titulo, 
status
from tarefas
where tarefas.status = $1
`;

const getTasksWithStatusData = async(status: number): Promise<Tarefa[]> => {
    // Obtém linhas da table que contêm campo status igual o buscado
    const { rows } = await pool.query(dbQuery, [status]);
        
    // Iguala lista de tarefas às linhas obtidas da table
    const tarefas: Tarefa[] = rows;

    // Retorna lista de tarefas obtidas (pode estar vazia) com status desejadp
    return tarefas;
}

export default getTasksWithStatusData;