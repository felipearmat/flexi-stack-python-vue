from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
# Um namespace para que as urls sejam chamadas facilmente.
app_name = 'base'

# Caminhos da nossa aplicação que referenciam uma função em views.py
urlpatterns = [
    path('efetua_login/', views.APILogin.as_view(), {"root": "base:index"}, name='efetua_login'),
    path('efetua_logout/', views.APILogout.as_view(), {"root": "base:index"}, name='efetua_logout'),
    path('', views.HomeView.as_view(), name='index'),
    re_path(r'^.*/$', views.HomeView.as_view(), name='reindex'),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
