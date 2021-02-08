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
  sudo git ipython3 nginx gnupg gnutls-dev build-essential curl libpq-dev gettext-base

# Baixando Source do NODEJS12 e instalando
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs \
 && apt-get clean

# Instalando yarn
RUN npm install -g yarn

# Adicionando repositorio de segurança
RUN add-apt-repository "deb http://security.debian.org/debian-security buster/updates main contrib non-free"

######################################################

# Instalando dependências do Python
COPY ./setup/requirements.txt /opt/requirements.txt
RUN pip3 install --no-cache-dir -r /opt/requirements.txt

# Diretório de Logs
RUN mkdir /app \
 && mkdir /app/log
RUN chown -R www-data:www-data /app/log

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
COPY ./base       /app/base
COPY ./config     /app/config
COPY ./templates  /app/templates
COPY ./util       /app/util
COPY ./vue        /app/vue
COPY ./manage.py  /app/manage.py

# Configurando o Open-SSH para conexão via Azure SSH
COPY ./setup/sshd_config /etc/ssh
RUN echo "root:Docker!" | chpasswd \
  && mkdir /run/sshd \
  && /etc/init.d/ssh reload \
  # Permitindo o www-data a iniciar o serviço de SSH via sudo
  && echo "www-data ALL=NOPASSWD: /etc/init.d/ssh restart" >> /etc/sudoers

# Configuração do nginx
COPY ./setup/nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
# Liberando acesso do www-data aos arquivos do nginx
RUN chown -R www-data:www-data /var/lib/nginx /var/www /app && touch /nginx.pid && chown www-data:www-data /nginx.pid

# Copiando arquivo de execução do container
COPY ./setup/run.sh /opt/
RUN chmod +x /opt/run.sh

# Executando build da aplicação
RUN /opt/run.sh build \
 && /opt/run.sh test:js

# Removendo excessos (node_modules)
RUN rm -rf /app/vue/node_modules /usr/local/share/.cache/yarn

######################################################

# Usuário do container
USER www-data

EXPOSE 8080 2222

WORKDIR /opt

# Comando padrão para execução do container
CMD ["/opt/run.sh"]
