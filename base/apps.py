from django.apps import AppConfig
# from django.db.models.signals import post_migrate
from django.conf import settings

TESTING = getattr(settings, "TESTING", False)

# def callback(sender, **kwargs):
#     "Callback para ser executado após os migrates, normalmente um populate para testes."
#     from .seeds import populate

#     if TESTING in [True, 'True']:
#         populate()

class baseConfig(AppConfig):
    name = 'base'
    # def ready(self):
    #     super(baseConfig, self).ready()
    #     post_migrate.connect(callback, sender=self)
