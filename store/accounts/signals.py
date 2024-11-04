from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed, pre_delete
from .utils import recalc
from .models import *
from django.contrib.auth import get_user_model
from main.models import *

User = get_user_model()


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
        
        
@receiver(m2m_changed, sender=Cart.products.through)
def cart_update_total(sender, instance, action, *args, **kwargs):
    if action == 'post_add' or action == 'post_remove':
        recalc(instance)
        


@receiver(post_save, sender=CartProduct)
def create_profile(sender, instance, created, **kwargs):
    cart = Cart.objects.filter(products__in=[instance])
    if cart.exists():
        cart = cart[0]
        recalc(cart)
        

# если запрос на создание заказа прилетает с фронта то все работает
# если запрос прилетает с админки то ничего не происходит
@receiver(post_save, sender=Order)
def create_profile(sender, instance, created, **kwargs):
    if instance.is_paid:
        for order_product in instance.products.all():
            product = order_product.product
            product.qty -= order_product.qty
            product.save()   
        
        
@receiver(post_save, sender=Product)
def create_profile(sender, instance, **kwargs):
    cart_products = CartProduct.objects.filter(product=instance)
    if cart_products.exists():
        for cart_product in cart_products: 
            if cart_product.qty > instance.qty:
                cart_product.qty = instance.qty
                cart_product.save()
                if cart_product.qty == 0:
                    cart_product.delete()
        
        
                
@receiver(pre_delete, sender=CartProduct)
def create_profile(sender, instance, **kwargs):
    cart = Cart.objects.filter(products__in=[instance])
    if cart.exists():
        cart = cart[0]
        cart_product_price = instance.product.price * instance.qty
        cart.total -= cart_product_price
        cart.save()