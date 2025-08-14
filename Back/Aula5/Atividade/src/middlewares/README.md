# Middlewares

Esta pasta contém middlewares personalizados para o projeto, responsáveis por adicionar funcionalidades extras ao processamento das requisições HTTP no Express.

## Arquivos

### [`cors.ts`](Back/Aula5/Atividade/src/middlewares/cors.ts)

Implementa o middleware [`corsMiddleware`](Back/Aula5/Atividade/src/middlewares/cors.ts) para controle de acesso entre origens (CORS):

- **Função**: Permite apenas requisições vindas de origens autorizadas (ex: `http://localhost:3000`) e métodos HTTP específicos (`GET`, `POST`, `PATCH`).
- **Como funciona**:
  - Verifica se o `origin` da requisição está na lista de permitidos.
  - Verifica se o método HTTP está autorizado.
  - Bloqueia requisições não permitidas, retornando status `403` ou `200` com mensagem de erro.

## Como usar

Os middlewares devem ser importados e utilizados no arquivo principal do servidor, por exemplo:

```ts
import { corsMiddleware } from './middlewares/cors';

app.use(corsMiddleware);