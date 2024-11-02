from rest_framework import serializers
from .models import *
from main.serializers import ProductSerializer, SizeSerializer
from django.contrib.auth import get_user_model



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class OrderStatusSerilizer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


class DeliveryTypeSerilizer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryType
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    size = SizeSerializer()

    class Meta:
        model = CartProduct
        fields = '__all__'


class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    size = SizeSerializer()

    class Meta:
        model = OrderProduct
        fields = '__all__'


class CartSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = CartProductSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'


class OrderSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = OrderProductSerializer(many=True)
    delivery_type = DeliveryTypeSerilizer()
    status = OrderStatusSerilizer()

    class Meta:
        model = Order
        fields = '__all__'


class WishListSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = ProductSerializer(many=True)

    class Meta:
        model = WishList
        fields = '__all__'


class ProfileSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    cart = CartSerilizer()
    wish_list = WishListSerilizer()
    orders = OrderSerilizer(many=True)

    class Meta:
        model = Profile
        fields = '__all__'