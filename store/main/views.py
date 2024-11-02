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
    
    
class ProductIdsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        product_ids = [i.id for i in Product.objects.all()]
        return Response(product_ids)


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

    


class GenDelDefaultModelsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        colors = generate_simple_models(Color, settings.DEFAULT_COLORS)
        sizes = generate_sizes(settings.DEFAULT_SIZES)
        brands = generate_simple_models(Brand, settings.DEFAULT_BRANDS)
        types = generate_simple_models(Type, settings.DEFAULT_TYPES)
        
        params = request.GET.dict()
        num = int(params['num'])
        
        generate_random_products(num, colors, sizes, brands, types)
        return Response('Generation succesfuly')
    
    def delete(self, request):
        delete_all_models(Product.objects.all())
        delete_all_models(Color.objects.all())
        delete_all_models(Size.objects.all())
        delete_all_models(Brand.objects.all())
        delete_all_models(Type.objects.all())
        return Response("success")

class GenDelColorsAPIView(APIView):
    pass

class GenDelTypesAPIView(APIView):
    pass

class GenDelBrandsAPIView(APIView):
    pass

class GenDelSizesAPIView(APIView):
    pass