from django.urls import path
from .views import *

urlpatterns = [
    path('', TestAPIView.as_view()),
    path('products', ProductsListAPIView.as_view()),
    path('products/<slug:product_slug>', ProductAPIView.as_view()),
    path('brands', BrandsAPIView.as_view()),
    path('types', TypesAPIView.as_view()),
    path('gen_default_products', GenDelDefaultProductsAPIView.as_view()),
    path('gen_default_simple_model', GenDelDefaultSimpleModelsAPIView.as_view()),
    path('product_slugs', ProductSlugsAPIView.as_view()),
    path('min_max', MinMaxProductsPriceAPIView.as_view())
]