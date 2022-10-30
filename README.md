"# jwt-bcrypt-module" 

# JWT-BCRYPT-MODULE 

## Sobre
Esta api faz o gerenciamento de Ferramentas e Funcionários, permitindo o cadastro, visualização, atualização e remoção das informações. Este projeto foi desenvolvido com o intuito de por em prática os conhecimentos sobre JWT,para autenticação de rotas e usuários; Bcrypt, para criptografia de senhas para melhor segurança do usuário e o Sequeliza para fazer conexão com o banco Postgres.
<br>

## Requisitos
- [x] CRUD de ferramentas.

- [x] Autenticação de usuário.

- [x] Criptografia de senha.

- [x] Conexão Postgres.



## Começando
- Primeiramente, instale as dependências utilizando ```yarn install``` , depende do gerenciador de pacotes de sua preferência
- Antes de começar dever ter:
    - Uma conexão Postgress, nessa aplicação foi utilizado o Sequelize.   
- Criar um arquivo ```.env``` para armezenzar dados sensiveis a aplicação, como o secret para o token e a conexão postgress
```.env
SECRET=<Chave md5>
DATABASE_HOST=<Host do Banco de Dados>
DATABASE_USER=<User do Banco de Dados>
DATABASE_PASSWORD=<Senha do Banco de Dados>
DATABASE=<Schema do Banco de Dados>
PORT=<Porta usada pela aplicação>
```
Com essas variáveis de ambiente configuradas podemos executar nossa aplicação. 

## Executando
Para a execução foram criados alguns scripts dentro da aplicação
- dev-server : Execute  o comando ```yarn dev``` para executar a aplicação com o nodemon para desenvolvimento, ele vai recarregar a aplicação sempre que uma nova mudança for salva.

- Para criar as migrations no banco execute o comando ```yarn sequelize db:migrate```.

As rotas dispostas pela API são:
- ```/employee  POST``` : Para cadastro do usuário
- ```/login POST``` : Para autenticação do usuário

<br> *Todas abaixo precisam de autenticação*

- ```/employee PUT```: Para atualização de usuário
- ```/tool POST```: Para criação de ferramenta
- ```/tool GET``` : Para listagem de ferramentas
- ```/tool/:id GET``` : Retorna ferramenta pelo ID



## Autor
*Ernandes Ventura Silva Neto*

[![Linkedin Badge](https://img.shields.io/badge/-Ernandes%20Ventura-6633cc?style=flat-square&logo=Linkedin&logoColor=black&link=https://www.linkedin.com/in/guilherme-ventura-703612150/)](https://www.linkedin.com/in/ernandes-ventura-892a88119/)