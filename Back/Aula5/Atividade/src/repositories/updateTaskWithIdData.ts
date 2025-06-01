import pool from "../database/connection";

const dbQuery = `
update tarefas
set status = TRUE
where tarefas.id = $1 
`;

const updateTaskWithIdData = async(id: number): Promise<number|null> =>{
    // Obtém número de linhas com campo status atualizado
    const {rowCount} = await pool.query(dbQuery, [id]);

    // Retorna número de inserções feitas na table
    return rowCount;
}

export default updateTaskWithIdData