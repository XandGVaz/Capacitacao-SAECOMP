export enum Status{
    Pendente = 0,
    Concluida = 1
}

export interface Tarefa{
    id: number;
    titulo: string;
    status: Status;
}
