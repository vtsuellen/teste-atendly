# Teste Atendly
Este projeto implementa um sistema de autenticação utilizando **`Node.js`**, **`Express`**, **`MySQL`**, **`Sequelize`** no backend e **`Vue 3`** no frontend. O sistema permite o cadastro de usuários, login com autenticação JWT e visualização do perfil do usuário.

## Backend
Endpoints:

|Metodo|Rota| Descrição |
|---|---|---|
| POST | **`/api/register`**| Cadastro de usuário (com hash de senha).
| POST | **`/api/login`**| Login do usuário (retorna JWT).
| GET | **`/api/profile`** | Exibe dados do usuário logado (requere autenticação com JWT).

## Uso

### Backend

Navegue até a pasta backend:

    cd backend

Instale as dependências:

    npm install

Rode o comando de build:

    npm run build 


Rode as migrações e seeders:

    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all

Inicie o servidor:

    npm run dev



### Frontend
Navegue até a pasta frontend:

    cd frontend

Instale as dependências:

    npm install
Inicie o servidor:

    npm run dev


