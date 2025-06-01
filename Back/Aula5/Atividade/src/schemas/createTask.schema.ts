import { z } from 'zod';
import { Status } from '../interfaces/task.interface';

// Esquema de obtenção de parâmetros para criação de tarefa
export const createTaskBodySchema = z.object({
    titulo: z.string(),
    status: z.coerce.number(),
});

export type ICreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;