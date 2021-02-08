#!/bin/bash

migrate () {
    # Salvando caminho da pasta atual
    local currDir=`pwd`
    echo "Atualizando Banco de Dados..."
    cd $DJANGO_APP_PATH
    python3 manage.py migrate
    python3 manage.py makemigrations
    cd "$currDir"
}
instala_deps () {
    local currDir=`pwd`
    echo "Instalando Dependencias do Vue..."
    cd "$DJANGO_APP_PATH/vue"
    yarn install
    # Voltando para pasta inicial
    cd "$currDir"
}
run_dev () {
    cd $DJANGO_APP_PATH
    echo "Iniciando Servidor Django no modo Dev..."
    python3 manage.py collectstatic --noinput
    python3 manage.py runserver 0:8080
}
run_nginx () {
    cd $DJANGO_APP_PATH
    uwsgi --socket :8000 --wsgi-file config/wsgi.py & sleep 10
    echo "Iniciando Servidor Nginx..."
    python3 manage.py collectstatic --noinput
    nginx
}

if [ ! -z "$1" ] && [ "$1" = "dev" ]; then
    echo "Executando aplicação no modo DEV..."
    instala_deps
    cd "$DJANGO_APP_PATH/vue"
    echo "Construíndo app Vue.js e observando mudanças..."
    yarn run build:watch &
    run_dev

elif [ ! -z "$1" ] && [ "$1" = "build" ]; then
    instala_deps
    cd "$DJANGO_APP_PATH/vue"
    echo "Executando o build do app Vue.js..."
    yarn run build

elif [ ! -z "$1" ] && [ "$1" = "nginx" ]; then
    echo "Executando aplicação no modo DEV com nginx..."
    instala_deps
    cd "$DJANGO_APP_PATH/vue"
    echo "Construíndo app Vue.js e observando mudanças..."
    yarn run build:watch &
    run_nginx

elif [ ! -z "$1" ] && [ "$1" = "test:js" ]; then
    instala_deps
    cd "$DJANGO_APP_PATH/vue"
    echo "Executando testes do app Vue.js..."
    yarn run test

elif [ ! -z "$1" ] && [ "$1" = "test:python" ]; then
    cd $DJANGO_APP_PATH
    echo "Executando testes do Python..."
    prospector
    python3 manage.py test

elif [ ! -z "$1" ] && [ "$1" = "test" ]; then
    /opt/run.sh test:js
    /opt/run.sh test:python

else
    echo "Rodando a versão de produção ('./run.sh build' já deve ter sido executado)..."
    # Iniciando o serviço de SSH do container e o nginx
    sudo /etc/init.d/ssh restart &
    run_nginx
fi
