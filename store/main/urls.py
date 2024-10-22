from django.urls import path
from .views import *

urlpatterns = [
    path('', TestAPIView.as_view()),
    path('products', ProductsAPIView.as_view()),
    path('products/<int:product_id>', ProductAPIView.as_view()),
]