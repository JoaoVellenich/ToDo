# ToDo List

## Descrição

É uma lista de afazeres para facilitar e organizar o seu cotidiano de uma forma simples e rápida.

## Tecnologias

Para fazer esse projeto tanto o back end quanto o front end foi utilizado typescript. Segue uma lista de ferramentas utilizadas.

#### Back end:

- Express, para fazer a API em rest
- Sequelize, ORM para manipular o banco em SQL
- JOI, para fazer a validação de entrada vinda do usuário
- jsonWebToken, para fazer a criação dos token JWT para autenticação dos usuários

#### Front end:

- React
- styledComponents
- axios

## Tabelas no banco de dados

Dentro do banco de dados temos 2 tabelsa uma delas para os usuários e outra para armazenar as tasks, seguem o modelo dessas 2 tabelas:

#### Usuários

| Colunas   | Tipo   |
| --------- | ------ |
| id        | INT    |
| name      | STRING |
| email     | STRING |
| password  | STRING |
| createdAt | DATE   |
| updatedAt | DATE   |

- id, representa a chave primária da tabela
- name, representa o nome do usuário
- email, representa uma valor unico, ou seja não pode se repetir dentor do banco
- password, representa um codigo hash da senha do usuário
- createdAt e updatedAt, representam as datas de criação e de update do usuário respectivamente

#### Tasks

| Colunas     | Tipo   |
| ----------- | ------ |
| id          | INT    |
| name        | STRING |
| createdAt   | DATE   |
| updatedAt   | DATE   |
| completedAt | DATE   |
| excludeAt   | DATE   |
| ownerId     | INT    |

- id, representa a chave primária da tabela
- name, representa o nome da task
- completedAt, representa a data que o usuário marcou como completa
- excludeAt representa quando o usuário excluiu o dado
- ownerId, é o id do usuario que criou a task
- createdAt e updatedAt, representam as datas de criação e de update do usuário respectivamente

## Rodar localmente
