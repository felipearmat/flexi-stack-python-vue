# Django-Vue-Postgres-Docker-Dev-Stack

## Resumo do Projeto:

Uma pilha básica utilizando Django como back-end e API, Vue.js como front-end no modo SPA. Por uma pilha necessitar de um banco de dados para persistência se faz necessário também um container com POSTGRESQL, que também será apresentado neste guia.

## Como executar?
- Instale o Docker Desktop: https://www.docker.com/get-started
- Acesse a pasta do projeto e faça o build da Imagem (isso criará o container do Docker com as dependências do Django e do Vue.js):
```
docker build -t django-vue-app .
```
- Você também precisará de um banco de dados para persistir a informação, para isso teremos um banco de dados em background para ser utilizado com a nossa aplicação. Ainda na pasta do projeto execute o seguinte comando:
```
# Comando para Windows
docker run -d --rm
  --name=django-vue-db
  -p 5432:5432
  -e POSTGRES_PASSWORD=password
  -v django-vue-db:/var/lib/postgresql/data
  -v %cd%/dbinit:/docker-entrypoint-initdb.d
  postgres:12

# Comando para Unix
docker run -d --rm
  --name=django-vue-db
  -p 5432:5432
  -e POSTGRES_PASSWORD=password
  -v django-vue-db:/var/lib/postgresql/data
  -v `pwd`/dbinit:/docker-entrypoint-initdb.d
  postgres:12
```
- Ainda na pasta do projeto, execute o comando abaixo para iniciar a Imagem (esse comando iniciará o container com o django e o Vue.js, mapeando a porta 8080 do seu pc com a porta 8080 do container e mapeando a pasta do projeto para a pasta /app do container):
```
# Comando para Windows
docker run -it --rm --name=django-vue-app -p 8080:8080 -v %cd%:/app django-vue-app

# Comando para Unix
docker run -it --rm --name=django-vue-app -p 8080:8080 -v `pwd`:/app django-vue-app
```
- Acesse com seu navegador predileto o endereço localhost:8080

- Senhas para utilizar a interface admin (localhost:8080/admin):
```
  # superuser (usuario / senha):
  admin
  admin
```

## Como acessar o BD?
- Para acessar o banco de dados é necessário que você esteja com o container do BD em execução, uma vez que ele esteja rodando basta usar o comando:
```
docker exec -it django-vue-db psql -U postgres
```
- Com esse comando você acessará o terminal do postgresql. O comando `\l` listará todos os bancos de dados criados, o comando `\c <nome do banco (p. ex. app)>` conecta o terminal à um banco para que você possa executar consultas e o comando `\d` lista todas as tabelas do banco conectado.

## Como acessar o Container?
- Para acessar o container basta um comando parecido com o de acesso ao bd (como é de se esperar o container deve estar em execução para isso):
```
docker exec -it django-vue-app bash
```
- Com esse comando você acessa o terminal do Debian em que a aplicação está rodando, daí em diante você pode navegar no container como desejar.

## Como parar o Banco de dados?
- Essa é simples, basta rodar o comando `docker stop`, qualquer informação desnecessária além dos volumes mapeados será eliminada graças ao parâmetro `--rm` colocado no comando para iniciar o container:
```
docker stop django-vue-db
```
