# Django-Vue-Postgres-Docker-Dev-Stack

## Resumo do Projeto:

Uma pilha básica utilizando Django como back-end e API, Vue.js como front-end no modo SPA e PostgreSQL como banco de dados. Toda essa pilha está montada em um único container Docker, assim não é necessário instalar nenhum pacote adicional no seu sistema operacional nativo.

## Como executar?
- Instale o Docker Desktop: https://www.docker.com/get-started
- Acesse a pasta do projeto e faça o build da Imagem (isso criará o container do Docker com todos as dependências necessárias para se rodar o sistema):
```
docker build -t django-vue-stack .
```
- Ainda na pasta do projeto, execute o comando abaixo para iniciar a Imagem (esse comando iniciará o container com a pilha, mapeando a porta 8000 do seu pc com a porta 8000 do container, criando um diretório virtual para guardar os dados do BD como django-vue-db e mapeando a pasta do projeto para a pasta /work/app do container):
```
# Comando para Windows
docker run -it --rm --name=django-vue-stack -p 8000:8000 -v django-vue-db:/var/lib/postgresql/data -v %cd%:/work/app django-vue-stack

# Comando para Unix
docker run -it --rm --net=host --name=django-vue-stack -v django-vue-db:/var/lib/postgresql/data -v `pwd`:/work/app django-vue-stack
```
- Acesse com seu navegador predileto o endereço localhost:8000

- Senhas:
```
  # superuser (usuario / senha):
  admin
  admin
```

## Como acessar o BD?
- Para acessar o banco de dados é necessário que você esteja com o container em execução, uma vez que ela esteja rodando basta usar o comando:
```
docker exec -it django-vue-stack psql -U postgres
```
- Com esse comando você acessará o terminal do postgresql. O comando `\l` listará todos os bancos de dados criados, o comando `\c <nome do banco>` conecta o terminal à um banco para que você possa executar consultas.

## Como acessar o Container?
- Para acessar o container basta um comando parecido com o de acesso ao bd (como é de se esperar o container deve estar em execução para isso):
```
docker exec -it django-vue-stack bash
```
- Com esse comando você acessa o terminal do Debian em que a aplicação está rodando, daí em diante você pode navegar no container como desejar.
