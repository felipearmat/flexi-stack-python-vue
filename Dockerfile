FROM python:3.9-slim-buster

LABEL maintainer="felipearmat"

ENV TZ America/Sao_Paulo

# Setup do ambiente (atualiza o SO, acerta o timezone e instala nginx, node e uwsgi).
RUN echo $TZ > /etc/timezone \
 && rm /etc/localtime \
 && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
 && apt-get update \
 && apt-get install -y --no-install-recommends openssh-server locales libcurl4-gnutls-dev \
  acl ntp htop python3-pip supervisor apt-transport-https software-properties-common \
  git ipython3 nginx gnupg gnutls-dev build-essential curl libpq-dev gettext-base

# Baixando Source do NODEJS12 e instalando
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs \
 # Instalando uwsgi
 && apt-get install -y uwsgi \
 && apt-get clean

# Instalando yarn
RUN npm install -g yarn

# Adicionando repositorio de segurança
RUN add-apt-repository "deb http://security.debian.org/debian-security buster/updates main contrib non-free"

######################################################

# Instalando dependências do Python
COPY ./setup/requirements.txt /opt/requirements.txt
RUN pip3 install --no-cache-dir -r /opt/requirements.txt

# Variáveis de ambiente que configuram o watcher "chokidar" do node.js,
# para evitar problemas com o docker e o Vue.js em hosts windows
ENV CHOKIDAR_USEPOLLING 1
ENV CHOKIDAR_INTERVAL 1000

# Variável de ambiente que define o diretório do app
ENV DJANGO_APP_PATH /app

# Descomentar essas linhas se você quiser rodar o contâiner sem
# o comando para mapear o diretório "-v %cd%:/app"
######################################################
## Copiando Arquivos do Django para serem utilizados de dentro do contâiner
# COPY ./base       /app/base
# COPY ./config     /app/config
# COPY ./templates  /app/templates
# COPY ./util       /app/util
# COPY ./vue        /app/vue
# COPY ./manage.py  /app/manage.py

## Pré-instalando dependencias do Vue
#RUN cd /app/vue \
# && npm install
#
## Gerando arquivos estáticos do Django
#RUN cd /app/ \
# && python3 manage.py collectstatic --noinput
#
## Removendo excessos (node_modules)
#RUN rm -rf /app/vue/node_modules
######################################################

# Copiando script para execução do container
COPY ./setup/run.sh /opt/run.sh

EXPOSE 8000

WORKDIR /opt

# Comando padrão para execução do container
CMD ["/opt/run.sh"]
