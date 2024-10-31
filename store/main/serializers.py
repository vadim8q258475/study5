from rest_framework import serializers
from .models import *


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = "__all__"

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = "__all__"

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    type = TypeSerializer()
    color = ColorSerializer()
    brands = BrandSerializer(many=True)
    sizes = SizeSerializer(many=True)

    class Meta:
        model = Product
        fields = "__all__"