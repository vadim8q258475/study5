from django.urls import path, include, re_path
from .views import *

"""
    http://127.0.0.1:8000/accounts/api/v1/auth/users/
    http://127.0.0.1:8000/accounts/auth/token/login/

    in headers:
        Authorization: Token <token>
"""

urlpatterns = [
    path('', TestAccountsAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),          
    re_path(r'^auth/', include('djoser.urls.authtoken'))
]