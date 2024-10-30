from django.urls import path, include, re_path
from .views import *


"""
    http://127.0.0.1:8000/accounts/api/v1/auth/users/ post
    http://127.0.0.1:8000/accounts/auth/token/login/ post 

    in headers:
        Authorization: Token <token> 048f016a3a1e9c783c23cc190e0eb9d2d391e929

    /cart patch
          в body передается id продукта и количество
          get 
          возвращает корзину пользователя
          delete
          в body передается id продукта

    /wish_list update
               в body передается id продукта
               get возвращает список желаемого пользователя
               delete
               в body передается id продукта

     /orders get возвращает заказы юзера
             post создает заказ 
                в body передается адрес id типа доставки и id статуса заказа
                список продуктов получается из корзины, при этом в корзине продукты удаляются
"""

urlpatterns = [
    path('', TestAccountsAPIView.as_view()),
    path('delivery_types', DeliveryTypesAPIView.as_view()),
    path('cart', CartAPIView.as_view()),
    path('wish_list', WishListAPIView.as_view()),
    path('orders', OrdersAPIView.as_view()),
    path('orders/<int:order_id>/', OrderAPIView.as_view()),
    path('profile', ProfileAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),          
    re_path(r'^auth/', include('djoser.urls.authtoken'))
]