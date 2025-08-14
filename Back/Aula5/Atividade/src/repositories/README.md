# Repositories

Esta pasta contém os arquivos responsáveis pela camada de acesso aos dados (Data Access Layer) da aplicação. Cada arquivo implementa operações específicas de consulta e manipulação de dados na tabela `tarefas` do banco de dados PostgreSQL.

## Arquivos

### [`createTaskData.ts`](Back/Aula5/Atividade/src/repositories/createTaskData.ts)

**Função**: Responsável por inserir novas tarefas no banco de dados.

- **Operação**: `INSERT`
- **Parâmetros**: `titulo` (string) e `status` (number)
- **Retorno**: Número de linhas inseridas (`number | null`)
- **Query SQL**: Insere uma nova tarefa na tabela `tarefas` com título e status especificados

### [`getTaskData.ts`](Back/Aula5/Atividade/src/repositories/getTaskData.ts)

**Função**: Busca todas as tarefas existentes no banco de dados.

- **Operação**: `SELECT`
- **Parâmetros**: Nenhum
- **Retorno**: Array de tarefas (`Tarefa[]`)
- **Query SQL**: Seleciona todos os registros (id, titulo, status) da tabela `tarefas`

### [`getTasksWithStatusData.ts`](Back/Aula5/Atividade/src/repositories/getTasksWithStatusData.ts)

**Função**: Busca tarefas filtradas por status específico.

- **Operação**: `SELECT` com filtro `WHERE`
- **Parâmetros**: `status` (number)
- **Retorno**: Array de tarefas com status específico (`Tarefa[]`)
- **Query SQL**: Seleciona tarefas onde o campo `status` corresponde ao valor fornecido

### [`updateTaskWithIdData.ts`](Back/Aula5/Atividade/src/repositories/updateTaskWithIdData.ts)

**Função**: Atualiza o status de uma tarefa específica para concluída (TRUE).

- **Operação**: `UPDATE`
- **Parâmetros**: `id` (number)
- **Retorno**: Número de linhas atualizadas (`number | null`)
- **Query SQL**: Atualiza o campo `status` para `TRUE` da tarefa com ID especificado

## Padrão de Implementação

Todos os arquivos seguem o mesmo padrão:

1. **Importação**: Importam o [`pool`](Back/Aula5/Atividade/src/database/connection.ts) de conexão com o banco
2. **Query SQL**: Definem uma constante com a query SQL correspondente
3. **Função assíncrona**: Implementam uma função que executa a query usando `pool.query()`
4. **Tratamento de retorno**: Processam o resultado da query e retornam dados tipados
5. **Exportação default**: Exportam a função como exportação padrão

## Dependências

- **Pool de conexão**: [`../database/connection`](Back/Aula5/Atividade/src/database/connection.ts)
- **Interfaces**: [`../interfaces/task.interface`](Back/Aula5/Atividade/src/interfaces/task.interface.ts) (para tipagem da interface `Tarefa`)

## Uso

Estes repositórios são utilizados pelos controladores na pasta [`controllers`](Back/Aula5/Atividade/src/controllers/) para separar a lógica de negócio da lógica de acesso aos dados, seguindo o padrão de arquitetura em