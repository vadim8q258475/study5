from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *

"""
    Дописать функционал создания заказа
    Покрыть все тестами
"""


class TestAccountsAPIView(APIView):
    def get(self, request):
        return Response('Hello accounts!')
    

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        serializer = CartSerilizer(cart)
        return Response(serializer.data)
    
    def update(self, request):
        id = int(request.data['product_id'])
        qty = int(request.data['product_qty'])
        product = Product.objects.filter(id=id)

        if product.exists():
            product = product[0]
            if qty > 0:
                return Response('Количество товара должно быть больше нуля')
            elif product.qty < qty:
                return Response('Недостаточно товара в наличии, выберите меньшее значение')
            product = CartProduct(product=product, qty=qty)
            product.save()
        else:
            return Response('Товара с таким id не существует')
        
        user = request.user
        cart = Cart.objects.get(user=user)
        cart.products.add(product)
        return Response('Товар успешно добавлен в корзину')




class WishListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        wish_list = WishList.objects.get(user=user)
        serializer = WishListSerilizer(wish_list)
        return Response(serializer.data)
    
    def update(self, request):
        id = int(request.data['product_id'])
        product = Product.objects.filter(id=id)
        
        if not product.exists():
            return Response('Товара с таким id не существует')
        
        user = request.user
        cart = WishList.objects.get(user=user)
        cart.products.add(product)
        return Response('Товар успешно добавлен в список желаемого')


class OrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        orders = Order.objects.filter(user=user)
        serializer = OrderSerilizer(orders, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        pass


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        order = Order.objects.get(id=order_id)
        serializer = OrderSerilizer(order)
        return Response(serializer.data)


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerilizer(profile)
        return Response(serializer.data)

