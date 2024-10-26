from django.contrib import admin

from django.contrib import admin

from .models import *

admin.site.register(OrderStatus)
admin.site.register(DeliveryType)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(WishList)
admin.site.register(Profile)
admin.site.register(CartProduct)
admin.site.register(OrderProduct)

