from django.urls import path
from .views import *

urlpatterns = [
    path('', TestAPIView.as_view()),
    path('products', ProductsAPIView.as_view()),
    path('products/<int:product_id>', ProductAPIView.as_view()),
    path('colors', ColorsAPIView.as_view()),
    path('brands', BrandsAPIView.as_view()),
    path('types', TypesAPIView.as_view()),
    path('sizes', SizesAPIView.as_view()),
    path('gen_default', GenDelDefaultModelsAPIView.as_view()),
    path('product_ids', ProductIdsAPIView.as_view())
]