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
 
function adicionarTarefa(listaTarefas: Tarefa[], nomeTarefa: string): void{
    const novaTarefa: Tarefa = {
        id: listaTarefas.length +1,
        titulo: nomeTarefa,
        status:  Status.Pendente,
    }
    listaTarefas.push(novaTarefa);
}

function listartarefas(listaTarefas: Tarefa[]): void{
    listaTarefas.forEach(el => console.log("Id: " + el.id + ", Nome: " + el.titulo + ", Status: " + el.status));
    console.log('\n');
}

function concluirTarefa(listaTarefas: Tarefa[], nomeTarefa: string): void{
    const tarefa = listaTarefas.find(el => el.titulo === nomeTarefa);
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

adicionarTarefa(tarefas, 'jogar bola');
adicionarTarefa(tarefas, 'jogar beach tennis');

listartarefas(tarefas);

concluirTarefa(tarefas, 'jogar bola');
tarefas = filtrarPorStatus(tarefas, Status.Concluida);

listartarefas(tarefas);