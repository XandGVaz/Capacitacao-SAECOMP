import { z } from 'zod';

// Esquema de obtenção de parâmetros para atualização de tarefas
export const updateTaskParamSchema = z.object({
    id: z.coerce.number(),
});

export type IupdateTaskParamSchema = z.infer<typeof updateTaskParamSchema>;