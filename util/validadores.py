import datetime
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
# Validadores para serem utilizados em modelos

def apenasnumeros():
    return RegexValidator(r'^[0-9]*$', 'Apenas números são permitidos.', 'apenas_numeros')

def alphanumerico():
    return RegexValidator(r'^[a-zA-Z0-9]+$', 'Apenas números e letras são permitidos.', 'alpha_numerico')

def RG():
    return RegexValidator(r'^[X0-9]+$', 'Apenas números e a letra X são permitidos.', 'rg_invalido')

def apenasletras():
    return RegexValidator(r'^[a-zA-Z]*$', 'Apenas letras são permitidas.', 'apenas_letras')
