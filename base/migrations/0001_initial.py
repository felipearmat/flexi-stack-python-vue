from django.conf import settings
from django.contrib.auth.models import User
from django.db import migrations, models

def cria_superuser(apps, schema_editor):
    # Cria o superuser admin se o ambiente não for de produção
    ENV = getattr(settings, "ENV", "development")
    if ENV != 'Production':
        User.objects.create_superuser('admin','','admin')

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field1', models.CharField(max_length=100, unique=True, verbose_name='Campo 1')),
                ('field2', models.DateTimeField(auto_now=True, verbose_name='Campo 2')),
                ('field3', models.FloatField(blank=True, null=True, verbose_name='Campo 3')),
            ],
        ),
        migrations.RunPython(cria_superuser),
    ]
