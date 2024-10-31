from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from .utils import *

"""
    Дописать функционал создания заказа
    Покрыть все тестами
    Добавить перещет корзины
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
    
    def patch(self, request):
        id = int(request.data['product_id'])
        qty = int(request.data['product_qty'])
        size_id = int(request.data['size_id'])
        product = Product.objects.filter(id=id)

        if product.exists():
            product = product[0]
            size = product.sizes.filter(id=size_id)
            
            if size.exists():
                size = size[0]
                
                if qty <= 0:
                    return Response('Количество товара должно быть больше нуля')
                elif size.qty < qty:
                    return Response('Товар с таким размером закончился')
                
                product = CartProduct(product=product, qty=qty, size_name=size.name)
                product.save()
        else:
            return Response('Товара с таким id не существует')
        
        user = request.user
        cart = Cart.objects.get(user=user)
        cart.products.add(product)
        recalc(cart)
        return Response('Товар успешно добавлен в корзину')
    
    def delete(self, request):
        id = int(request.data['cart_product_id'])
        cart = Cart.objects.get(user=request.user)
        cart_product = cart.products.filter(id=id)

        if cart_product.exists():
            cart_product = cart_product[0]
            cart_product.delete()
            return Response("Товар успешно удален из корзины пользователя")
        
        return Response("В корзине пользователя не существует продукта с таким id")


class WishListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        wish_list = WishList.objects.get(user=user)
        serializer = WishListSerilizer(wish_list)
        return Response(serializer.data)
    
    def patch(self, request):
        id = int(request.data['product_id'])
        product = Product.objects.filter(id=id)
        
        if not product.exists():
            return Response('Товара с таким id не существует')
        product = product[0]
        
        user = request.user
        cart = WishList.objects.get(user=user)
        cart.products.add(product)
        return Response('Товар успешно добавлен в список желаемого')
    
    def delete(self, request):
        id = int(request.data['product_id'])
        wish_list = WishList.objects.get(user=request.user)
        product = wish_list.products.filter(id=id)

        if not product.exists():
            return Response('Товара с таким id не существует в списке желаемого пользователя')
        product = product[0]

        wish_list.products.remove(product)

        return Response("Товар успешно удален из списка желаемого пользователя")



class OrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        orders = Order.objects.filter(user=user)
        serializer = OrderSerilizer(orders, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        cart_products = Cart.objects.get(user=user).products.all()
        
        address = request.data['address']
        delivery_type_id = int(request.data['delivery_type_id'])
        status_id = int(request.data['status_id'])

        delivery_type = DeliveryType.objects.get(id=delivery_type_id)
        status = OrderStatus.objects.get(id=status_id)

        order = Order.objects.create(
            user=user,
            address=address,
            delivery_type=delivery_type,
            status=status
            )

        for cart_product in cart_products:
            order_product = OrderProduct(
                product=cart_product.product,
                qty=cart_product.qty,
                size_name=cart_product.size_name
                )
            
            order_product.save()
            cart_product.delete()
            # добавить изменение количества товаров в таблице при оплате заказа
            order.products.add(order_product)
        
        order.save()
        return Response('Заказ успешно создан')


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
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
    

class DeliveryTypesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        delivery_types = DeliveryType.objects.all()
        serializer = DeliveryTypeSerilizer(delivery_types, many=True)
        return Response(serializer.data)

