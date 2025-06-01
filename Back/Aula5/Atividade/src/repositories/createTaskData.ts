import pool from "../database/connection";

const dbQuery = `
insert into tarefas
(titulo, status)
values
($1, $2)
`;

const createTaskData = async(titulo: string, status: number): Promise<number|null> =>{
    // Obtém número de linhas adicionadas na table
    const { rowCount } = await pool.query(dbQuery, [titulo, status]);

    // Retorna número de inserções feitas na table
    return rowCount;    
}

export default createTaskData;