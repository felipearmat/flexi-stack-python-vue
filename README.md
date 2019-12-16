# Django-Vue-Postgres-Docker-Dev-Stack

## Resumo do Projeto:

Uma pilha básica utilizando Django como back-end e API, Vue.js como front-end no modo SPA e PostgreSQL como banco de dados. Toda essa pilha está montada em um único container Docker, assim não é necessário instalar nenhum pacote adicional no seu sistema operacional nativo.

## Como executar?
- Instale o Docker: https://docs.docker.com/v17.12/install/
- Acesse a pasta do projeto e faça o build da Imagem (isso criará o contâiner do Docker com todos as dependências necessárias para se rodar o sistema):
```
docker build -t django-vue-stack .
```
- Ainda na pasta do projeto, execute o comando abaixo para iniciar a Imagem (esse comando iniciará o contâiner com a pilha, mapeando a porta 8000 do seu pc com a porta 8000 do contâiner, criando um diretório virtual para guardar os dados do BD como django-vue-db e mapeando a pasta do projeto para a pasta /work/app do contâiner):
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
