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

let tarefas: Tarefa[] = [];
 
function adicionarTarefa(listaTarefas: Tarefa[], nomeTarefa: string): Tarefa{
    const novaTarefa: Tarefa = {
        id: listaTarefas.length +1,
        titulo: nomeTarefa,
        status:  Status.Pendente,
    }
    listaTarefas.push(novaTarefa);
    return novaTarefa;
}

function listarTarefas(listaTarefas: Tarefa[]): void{
    listaTarefas.forEach(el => console.log("Id: " + el.id + ", Nome: " + el.titulo + ", Status: " + el.status));
    console.log('\n');
}

function concluirTarefa(listaTarefas: Tarefa[], id: number): void{
    const tarefa = listaTarefas.find((el) => el.id === id);
    if(tarefa)
        tarefa.status = Status.Concluida;
    else 
        console.log('Tarefa não existente');
}  

function filtrarPorStatus(listaTarefas: Tarefa[], stt: Status): Tarefa[]{
    let novaLista: Tarefa[] = [];
   novaLista = listaTarefas.filter(el => el.status === stt);
   return novaLista;
}

/*============================================================================================== */

// Instanciação do express
const app = express();

// Porta de acesso do localhost utilizada
const port = 3000;

// Adiciona middleware global express.json()
app.use(express.json()/*Middleware para interpretar corpo de requisições http no formato json*/);

// Define método com que servidor lida com requisições do tipo GET para /tarefas
app.get('/tarefas', (req: Request, res: Response) => {
    // Retorna tarefas em formato json
    res.json(tarefas);
});

// Modelo dinâmica para lidar requisições GET em /tarefas/status que têm como parâmetro o ID da tarefa desejada
app.get('/tarefas/status/:status', (req: Request, res: Response) => {
    
    // Procura tarefas com status enviado por parãmetro na requisição 
    const tarefasDesejadas = filtrarPorStatus(tarefas, Number(req.params.status));

    // Verifica se alguma tarefa foi encontrada
    if(!tarefasDesejadas){
        res.status(404).json({message: 'Nenhuma tarefa não encontrada'});
        return ;
    }
    
    // Retorna tarefa em formato json
    res.json(tarefasDesejadas);
});

// Define método com que servidor lida com requisições do tipo POST para /tarefas
app.post('/tarefas', (req: Request, res: Response) => {
    // Adiciona nova tarefa, supondo que req.body é uma string com o nome da tarefa
    const novaTarefa: Tarefa = adicionarTarefa(tarefas, req.body.titulo);

    // Manda mensagem de êxito
    res.status(201).json(novaTarefa);
});

// Modelo dinâmica para lidar com requisições do tipo PATCH para /tarefas levando em conta o parâmetro id
app.patch('/tarefas/:id', (req: Request, res: Response) => {
    // Conclui tarefa com id passado por parâmetro
    concluirTarefa(tarefas, parseInt(req.params.id));
    
    // Manda mensagem de êxito
    res.status(201).json(tarefas);
});

/*
    Para mandar requisiçãoo patch para concluir tarefa de id igual a 1:
        curl -X PATCH http://localhost:3000/tarefas/1
*/

// Inicia servidor express, fazendo com que ele comece a lidar com requisições HTTP e uma porta específica passada por parâmetro
app.listen(port, () => {
    console.log(`serving on http://localhost:${port}`);
});

/*============================================================================================== */
const poolConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    ssl: false,
    max: 6
}

const pool = new Pool(poolConfig);

const dbQueryGet = `
select

`