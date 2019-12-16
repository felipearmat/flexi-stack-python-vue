from base.auth import TokenLoginRequiredMixin

from django.views.generic.base import TemplateView
from django.contrib.auth import authenticate, login, logout

from rest_framework import status as _status
from rest_framework.response import Response
from rest_framework.views import APIView

from util.funcoes import add_permissoes_contexto


class HomeView(TemplateView):
    template_name = 'index.html'
    # Modifica contexto com as permissões do usuário
    # na forma de lista para ser utilizado no front-end
    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        return add_permissoes_contexto(context, self.request)

class APILogin(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'resposta': {'logado': request.user.is_authenticated}}, status=_status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if (user is not None) and user.is_active:
            login(request, user)
            return Response({'resposta': 'Logado com sucesso!'}, status=_status.HTTP_200_OK)
        return Response({'erros': ['Login inválido!']}, status=_status.HTTP_400_BAD_REQUEST)

class APILogout(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            logout(request)
            return Response({'resposta': 'Usuário deslogado!'}, status=_status.HTTP_200_OK)
        return Response({'erros': ['Não logado!']}, status=_status.HTTP_400_BAD_REQUEST)

# Classe de API que redireciona para '/efetua_login' caso o usuário não esteja logado
class APIBaseView(TokenLoginRequiredMixin, APIView):
    class Meta:
        abstract = True
        login_url = '/efetua_login'
        redirect_field_name = 'next'
