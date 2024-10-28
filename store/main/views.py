from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
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
    

class ColorsAPIView(ListAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class SizesAPIView(ListAPIView):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class BrandsAPIView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class TypesAPIView(ListAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

    


class GenDelProductsAPIView(APIView):
    def get(self, request):
        params = request.GET.dict()
        num = int(params['num'])
        colors = [i for i in Color.objects.all()]
        sizes = [i for i in Size.objects.all()]
        brands = [i for i in Brand.objects.all()]
        types = [i for i in Type.objects.all()]
        generate_random_products(num, colors, sizes, brands, types)
        return Response('Generation succesfuly')

class GenDelColorsAPIView(APIView):
    pass

class GenDelTypesAPIView(APIView):
    pass

class GenDelBrandsAPIView(APIView):
    pass

class GenDelSizesAPIView(APIView):
    pass