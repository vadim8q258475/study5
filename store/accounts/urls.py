from django.urls import path, include, re_path
from .views import *


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