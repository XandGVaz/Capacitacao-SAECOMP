import express, {Request, Response} from 'express';
import {Pool} from 'pg'

/*============================================================================================== */
enum Status{
    Pendente = 0,
    Concluida = 1
}
interface Tarefa{
    id: number;
    titulo: string;
    status: Status;
}

/*============================================================================================== */
// Vem dom servidor postgresSQL
const poolConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    ssl: false,
    max: 6
}

// Gerencia a "piscina de conexões" do banco de dados
//  - Reutiliza conexões
//  - Gerencia concorrência
//  - Facilita consultas usando querys (permitindo executar comandos SQL)
const pool = new Pool(poolConfig);

// Querys para cada tipo de requisição tratada na api
const dbQueryGet = `
select 
id,
titulo,
status
from tarefas
`;
const dbQueryGetWithStatus = `
select
id, 
titulo, 
status
from tarefas
where tarefas.status = $1
`;
const dbQueryPost = `
insert into tarefas
(titulo, status)
values
($1, $2)
`;
const dbQueryPatch = `
update tarefas
set status = TRUE
where tarefas.id = $1 
`;

/*============================================================================================== */

// Instanciação do express
const app = express();

// Porta de acesso do localhost utilizada
const port = 3000;

// Adiciona middleware global express.json()
app.use(express.json()/*Middleware para interpretar corpo de requisições http no formato json*/);

// Define método com que servidor lida com requisições do tipo GET para /tarefas
app.get('/tarefas', async(req: Request, res: Response) => {
    try{
        // Recebe linhas da tablr
        const { rows } = await pool.query(dbQueryGet);

        // Iguala a lista de tarefas às linhas das tabelas
        const tarefas : Tarefa[] = rows;
        
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
});

app.get('/tarefas/status/:status', async(req: Request, res: Response) => {
    
    // Obtém status a serem considerados como parâmetro
    const status: number = Number(req.params.status);
    try{
        // Obtém linhas da table que contêm campo status igual o buscado
        const { rows } = await pool.query(dbQueryGetWithStatus, [status]);
        
        // Iguala lista de tarefas às linhas obtidas da table
        const tarefas: Tarefa[] = rows;
        
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
});


// Define método com que servidor lida com requisições do tipo POST para /tarefas
app.post('/tarefas', async(req: Request, res: Response) => {
    
    // Recebe nova tarefa a ser adicionada do corpo JSON da requisição POST
    const novaTarefa : Tarefa = req.body;
    try{
        // Obtém número de linhas adicionadas na table
        const { rowCount } = await pool.query(dbQueryPost, [novaTarefa.titulo, novaTarefa.status]);
        
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
});

// Modelo dinâmica para lidar com requisições do tipo PATCH para /tarefas levando em conta o parâmetro id
app.patch('/tarefas/:id', async(req: Request, res: Response) => {
    // obtém id passado por parâmetro
    const id : number = parseInt(req.params.id);
    try{
        // Obtém número de linhas com campo status atualizado
        const {rowCount} = await pool.query(dbQueryPatch, [id]);
        
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
});

/*
    Para mandar requisiçãoo patch para concluir tarefa de id igual a 1:
        curl -X PATCH http://localhost:3000/tarefas/1
*/

// Inicia servidor express, fazendo com que ele comece a lidar com requisições HTTP e uma porta específica passada por parâmetro
app.listen(port, () => {
    console.log(`serving on http://localhost:${port}`);
});



