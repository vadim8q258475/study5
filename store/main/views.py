from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import *
from .models import *
from .utils import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from django.core.cache import cache
from django_filters.rest_framework import DjangoFilterBackend


class TestAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("Hello World!")
    
    
    
class ProductSlugsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        product_slugs = [i.slug for i in Product.objects.all()]
        return Response(product_slugs)



class ProductAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)



class ProductAPIListPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 10000 

class ProductsListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductAPIListPagination

    def list(self, request, *args, **kwargs):    
        params = request.GET.dict()
        cache_key = make_cache_key('products', params)
        cache_time = 30
        
        if not cache.get(cache_key):
            queryset = preprocess_queryset(self.get_queryset(), params)
            cache.set(cache_key, queryset, cache_time)
        else:
            queryset = cache.get(cache_key)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    

class BrandsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
    def list(self, request, *args, **kwargs):    
        cache_key = "brands"
        cache_time = 30
        
        if not cache.get(cache_key):
            queryset = self.filter_queryset(self.get_queryset())
            cache.set(cache_key, queryset, cache_time)
        else:
            queryset = cache.get(cache_key)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)




class TypesAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    
    def list(self, request, *args, **kwargs):    
        cache_key = "types"
        cache_time = 30
        
        if not cache.get(cache_key):
            queryset = self.filter_queryset(self.get_queryset())
            cache.set(cache_key, queryset, cache_time)
        else:
            queryset = cache.get(cache_key)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    
    
class GenDelDefaultSimpleModelsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        
        generate_simple_models(Brand, settings.DEFAULT_BRANDS)
        generate_simple_models(Type, settings.DEFAULT_TYPES)
        return Response('Generation succesfuly')



class GenDelDefaultProductsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        brands = Brand.objects.all()
        types = Type.objects.all()
        
        params = request.GET.dict()
        num = int(params["num"])
        
        generate_random_products(num, brands, types)
        return Response('Generation succesfuly')
    
    def delete(self, request):
        delete_all_models(Product.objects.all())
        return Response("success")
    
    
    
class MinMaxProductsPriceAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        products = Product.objects.all()
        mx = max(products, key=lambda x: x.price).price
        mn = min(products, key=lambda x: x.price).price
        return Response({"min": mn, 'max': mx, "current_min": mn, "current_max": mx})