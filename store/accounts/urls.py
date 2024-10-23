from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('', TestAccountsAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),          
    re_path(r'^auth/', include('djoser.urls.authtoken'))
]