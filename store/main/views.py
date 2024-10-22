from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from .utils import *

class TestAPIView(APIView):
    def get(self, request):
        return Response("Hello World!")
    

class ProductAPIView(APIView):
    def get(self, request, product_id):
        product = Product.objects.get(id=int(product_id))
        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ProductsAPIView(APIView):
    def get(self, request):
        params = request.GET.dict()
        products = preprocess_queryset(
            Product.objects.all(), params)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    


class GenDelProductsAPIView(APIView):
    pass

class GenDelColorsAPIView(APIView):
    pass

class GenDelTypesAPIView(APIView):
    pass

class GenDelBrandsAPIView(APIView):
    pass

class GenDelSizesAPIView(APIView):
    pass