from django.db import models
from django.contrib.auth import get_user_model
from main.models import Product
from django.dispatch import receiver
from django.db.models.signals import post_save


User = get_user_model()


class OrderStatus(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    des = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Статус заказа'
        verbose_name_plural = 'Статусы заказа'


class DeliveryType(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    price = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')
    time = models.IntegerField(default=0, verbose_name='Время доставки (в днях)')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Типы доставки'
        verbose_name_plural = 'Типы доставки'


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    products = models.ManyToManyField(Product, verbose_name='Товары')
    total = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')
    
    def __str__(self):
        return f'Корзина пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    address = models.TextField(verbose_name='Адрес доставки')
    products = models.ManyToManyField(Product, verbose_name='Товары')
    delivery_type = models.ForeignKey(DeliveryType, on_delete=models.PROTECT, verbose_name='Тип доставки')
    status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT, verbose_name='Статус')
    total = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')

    def __str__(self):
        return f'Заказ {self.id} пользователя {self.user.name}'
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    products = models.ManyToManyField(Product, verbose_name='Товары')

    def __str__(self):
        return f'Список желаемого пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Список желаемого'
        verbose_name_plural = 'Списки желаемого'


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, verbose_name='Корзина')
    wish_list = models.ForeignKey(WishList, on_delete=models.CASCADE, verbose_name='Список желаемого')
    orders = models.ManyToManyField(Order, verbose_name='Заказы')

    def __str__(self):
        return f'Профиль пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created: 
        cart = Cart.objects.create(user=instance)
        cart.save()
        wish_list = WishList.objects.create(user=instance)
        wish_list.save()
        Profile.objects.create(
            user=instance, 
            cart=cart, 
            wish_list=wish_list
        )




