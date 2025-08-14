# Database

Esta pasta contém arquivos responsáveis pela configuração e gerenciamento da conexão com o banco de dados utilizado na aplicação.

## Descrição dos Arquivos

- [`connection.ts`](Back/Aula5/Atividade/src/database/connection.ts):  
  Realiza a configuração da conexão com o banco de dados PostgreSQL utilizando o pacote `pg`.  
  - Define os parâmetros de acesso (host, porta, usuário, senha, nome do banco, etc).
  - Cria um pool de conexões para otimizar o uso do banco, permitindo reutilização e gerenciamento eficiente das conexões.
  - Exporta o objeto `pool` para ser utilizado em outros módulos da aplicação para executar consultas SQL.

## Utilização

Importe o pool de conexão nos arquivos que precisam interagir com o banco de dados:

```ts
import pool from './database/connection';

// Exemplo de consulta
const result = await pool.query('SELECT * FROM tarefas');