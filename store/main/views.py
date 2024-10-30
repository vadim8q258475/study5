from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import *
from .models import *
from .utils import *
from rest_framework.permissions import IsAuthenticated

class TestAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("Hello World!")


class ProductAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, product_id):
        product = Product.objects.get(id=int(product_id))
        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ProductsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        params = request.GET.dict()
        products = preprocess_queryset(
            Product.objects.all(), params)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    

class ColorsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class SizesAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class BrandsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class TypesAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

    


class GenDelProductsAPIView(APIView):
    permission_classes = [IsAuthenticated]
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