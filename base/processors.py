# from .models import ConfigSite
# from util.funcoes import queryToDict

# def configs(request):
#     "Retorna as configurações do site como um mapa de contexto."
#     config_site = queryToDict(ConfigSite.objects.all(), 'nome')
#     return {'CONFIG_SITE': config_site,}

def base_processor(request):
    "Retorna todas as funções de processamento de contexto já definidas."
    # return configs(request)
    return
