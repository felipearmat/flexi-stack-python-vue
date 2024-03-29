'''
Django settings for config project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
'''

import os
from pathlib import Path
import dj_database_url

# Importando condicionalmente o values para utilização em produção
try:
    from .values import values
except ImportError as e:
    # print('Erro de importacao: ', e)
    values = {}

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
PROJECT_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = values.get('DJANGO_SECRET_KEY', '%-dev_super_secret_key@-')

ENV = values.get('ENVIROMENT', 'dev')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if ENV != 'Production' else False

if ENV != 'Production':
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

ALLOWED_HOSTS = list(values.get('ALLOWED_HOSTS', '*').split(','))

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 3rd-party apps.
    'rest_framework',
    # 'ckeditor',
    # Project apps.
    'base.apps.baseConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(PROJECT_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# host.docker.internal é um alias para o host do ambiente docker. Como mapeamos o BD na porta 5432 do
# computador hospedeiro, acessar o host na porta 5432 acaba sendo o mesmo que acessar o BD na porta mapeada.
DATABASE_URL = values.get('DATABASE_URL',
                          'postgres://app:password@host.docker.internal:5432/app')

# Config padrão do BD (sqlite3) para referência
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=500)
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Desativando interface do rest_framework no modo produção
if DEBUG:
    REST_FRAMEWORK = {
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework.renderers.JSONRenderer',
        )
    }

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
MEDIA_ROOT = values.get('MEDIA_ROOT',
                        os.path.join(PROJECT_DIR, 'media'))
MEDIA_URL = '/media/'

STATIC_ROOT = values.get('STATIC_ROOT',
                         os.path.join(PROJECT_DIR, 'static'))
STATIC_URL = '/static/'

# CKEDITOR_BASEPATH = os.path.join(STATIC_URL, 'ckeditor/ckeditor/')

# Email settings.

EMAIL_HOST = values.get('EMAIL_HOST')
EMAIL_PORT = values.get('EMAIL_PORT', 587)
EMAIL_HOST_USER = values.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = values.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL = 'Info <info@testmail.com>'
SERVER_EMAIL = 'Alerts <alerts@testmail.com>'

ADMINS = (
    ('Admin', 'admin@testmail.com'),
)
