# Controllers

Esta pasta contém os arquivos responsáveis por controlar o fluxo das requisições HTTP e implementar a lógica das rotas da aplicação.

## Função dos Controllers

Os controllers recebem as requisições dos clientes, processam os dados, interagem com outros módulos (como serviços ou banco de dados) e retornam as respostas apropriadas.

## Descrição dos Arquivos

- [`createTask.ts`](Back/Aula5/Atividade/src/controllers/createTask.ts):  
  Recebe uma nova tarefa via corpo da requisição POST, valida os dados, insere no banco de dados e retorna uma mensagem de sucesso ou erro.

- [`getTasks.ts`](Back/Aula5/Atividade/src/controllers/getTasks.ts):  
  Busca todas as tarefas cadastradas, retornando a lista ou uma mensagem de erro caso não existam tarefas.

- [`getTasksWithStatus.ts`](Back/Aula5/Atividade/src/controllers/getTasksWithStatus.ts):  
  Busca tarefas filtrando pelo status informado na requisição, retornando apenas as tarefas que correspondem ao filtro.

- [`updateTaskWithId.ts`](Back/Aula5/Atividade/src/controllers/updateTaskWithId.ts):  
  Atualiza o status de uma tarefa específica pelo seu ID, retornando o número de tarefas atualizadas ou uma mensagem de erro.

## Estrutura Recomendada

Cada controller exporta uma função assíncrona que recebe os objetos `Request` e `Response` do Express, executa a lógica necessária e retorna a resposta adequada ao cliente.

## Observação

Mantenha a lógica de negócio separada dos controllers, utilizando serviços ou modelos para facilitar a manutenção