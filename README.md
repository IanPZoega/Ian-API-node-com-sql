# API Node com MySQL

Aluno: Ian
Turma: 3º DSN

Trabalho prático de PW3. É uma API REST feita com Node.js, Express e MySQL (mysql2, sem ORM) com CRUD de usuários.

## Como rodar

1. Clone o repositório e entre na pasta

```
git clone https://github.com/SEU-USUARIO/nome-do-aluno-API-node-com-sql.git
cd nome-do-aluno-API-node-com-sql
```

2. Instale as dependências

```
npm install
```

3. Crie o banco rodando o arquivo `schema.sql` no MySQL (pelo Workbench ou pelo terminal)

```
mysql -u root -p < schema.sql
```

4. Copie o `.env.example` para `.env` e coloque seu usuário e senha do MySQL

```
cp .env.example .env
```

5. Inicie o servidor

```
npm start
```

Vai rodar em http://localhost:3000

## Rotas

- POST /usuarios - cadastra (body: nome e email)
- GET /usuarios - lista todos
- PUT /usuarios/:id - atualiza (body: nome e email)
- DELETE /usuarios/:id - remove

## Exemplo

```
POST /usuarios
{
  "nome": "Maria",
  "email": "maria@email.com"
}
```
