from django.forms import ModelForm
from util.funcoes import custom_errors
from .models import MyModel

class BaseForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(BaseForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].error_messages = custom_errors(field, self.fields[field])

# Se os campos no modelo já possuirem a lógica necessária, não há necessidade de adicionar
# lógica para os campos, a não ser que existam lógicas a serem executadas no próprio formulário

class MyForm(BaseForm):
    class Meta:
        model = MyModel
        fields = (
            'field1',
            'field2',
            'field3',
        )
