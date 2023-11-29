
# CORELAB - API






## Sobre o projeto

API desenvolvida para um sistema de tarefas, proporcionando aos usuários a capacidade de criar, editar e personalizar posts.

# Arquitetura do projeto

Para desenvolver o backend, optei por implementar a arquitetura de camadas Service e Repository, aprimorando significativamente a distribuição de responsabilidades, a organização do código e a eficácia na detecção e correção de eventuais erros. Além disso, adotei o conceito de Value Object/DTO para manipulação de dados dentro da aplicação, evitando a exposição direta de entidades em contextos mais amplos e mantendo o foco nas áreas de atuação primárias.

# Tecnologias Utilizadas na API

- **Linguagem:** [Typescript]

- **Framework:** [Express + Overnightjs]

- **Banco de Dados:** [PostgreSQL]

- **ORM:** [Sequelize-ts]

- **Outras Tecnologias:** [Docker]
## Instalação

### Via Github
 - **Primeiros passos**
1. **Clone o projeto do Github:**
    ```bash
    git clone https://github.com/PedroSS11/backend-corelab-api
    ```
    - Atenção !
    - **Caso for iniciar a aplicação via NPM, abra o arquivo `.env` e mude a variável DATABASE_HOST para a CONEXÃO PARA DEV.**
    - **Caso for iniciar a aplicação via DOCKER-COMPOSE, abra o arquivo `.env` e mude a variável DATABASE_HOST para a CONEXÃO PARA DOCKER (já está como padrão).**
    

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure as credenciais de ambiente (Opcional. Já estou fornecendo credenciais padrão para ambiente docker):**
    - Abra o arquivo `.env` na pasta raiz e insira as credenciais desejadas

4. **Inicie a aplicação:**
    ```bash
    npm start
    ```

### Via Docker

1. **Inicie o container Docker:** 
- Abra o terminal e use o comando
    ```bash
    docker-compose up
    ```

# Rotas
## Usuários

### 1. Criar um novo usuário
- **Endpoint:** `/api/user`
- **Método:** `POST`
- **Parâmetros do corpo (JSON):**
  - `username`: Nome do usuário
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 201 Created
  - **Corpo:**
    ```json
    {
      "id": 1,
      "username": "Nome do Usuário",
    }
    ```

### 2. Obter informações de um usuário
- **Endpoint:** `/api/user/{id}`
- **Método:** `GET`
- **Parâmetros do caminho:**
  - `id`: ID do usuário
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "id": 1,
      "username": "Nome do Usuário",
    }
    ```

### 3. Atualizar informações de um usuário
- **Endpoint:** `/api/user/{id}`
- **Método:** `PUT`
- **Parâmetros do caminho:**
  - `id`: ID do usuário
- **Parâmetros do corpo (JSON):**
  - `username`: Nome atualizado do usuário
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "id": 1,
      "username": "Novo Nome do Usuário",
    }
    ```


## Posts

### 1. Criar um novo post
- **Endpoint:** `/api/post`
- **Método:** `POST`
- **Parâmetros do corpo (JSON):**
  - `title`: Título do post
  - `content`: Conteúdo do post
  - `color`: Cor do post
  - `favorited`: Se o post foi favoritado
  - `userId`: ID do autor do post
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 201 Created
  - **Corpo:**
    ```json
    {
      "id": 1,
      "title": "Título do Post",
      "content": "Conteúdo do Post",
      "color": "Cor do Post",
      "favorited": "Se o post foi favoritado",
      "userId": 1
    }
    ```

### 2. Obter informações de um post
- **Endpoint:** `/api/post/{id}`
- **Método:** `GET`
- **Parâmetros do caminho:**
  - `id`: ID do post
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "id": 1,
      "title": "Título do Post",
      "content": "Conteúdo do Post",
      "color": "Cor do Post",
      "favorited": "Se o post foi favoritado",
      "userId": 1,
      "user": "Model de Usuário"
    }
    ```

### 3. Atualizar informações de um post
- **Endpoint:** `/api/posts/{id}`
- **Método:** `PUT`
- **Parâmetros do caminho:**
  - `id`: ID do post
- **Parâmetros do corpo (JSON):**
  - `title`: Título do post
  - `content`: Conteúdo do post
  - `color`: Cor do post
  - `favorited`: Se o post foi favoritado
  - `userId`: ID do autor do post
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "id": 1,
      "title": "Título do Post",
      "content": "Conteúdo do Post",
      "color": "Cor do Post",
      "favorited": "Se o post foi favoritado",
      "userId": 1,
    }
    ```

### 4. Excluir um post
- **Endpoint:** `/api/post/delete/{postId}/{userId}`
- **Método:** `DELETE`
- **Parâmetros do caminho:**
  - `id`: ID do post
- **Resposta bem-sucedida (Exemplo):**
  - **Código:** 204 No Content






## Autor

- [@pedross11](https://www.github.com/pedross11)

