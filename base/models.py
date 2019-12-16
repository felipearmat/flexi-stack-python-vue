import os
import datetime

from django.db import models

class MyModel(models.Model):
    field1 = models.CharField(max_length=100, unique=True, verbose_name='Campo 1')
    field2 = models.DateTimeField(auto_now=True, null=False, verbose_name='Campo 2')
    field3 = models.FloatField(blank=True, null=True, verbose_name='Campo 3')
