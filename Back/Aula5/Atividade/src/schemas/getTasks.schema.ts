import { z } from 'zod';
import { Status } from '../interfaces/task.interface';

// Esquema de obtenção de parâmetros para obtenção (retorno) de tarefas
export const getTasksParamSchema = z.object({
    status: z.coerce.number(),
});

export type IGetTasksParamSchema = z.infer<typeof getTasksParamSchema>;

