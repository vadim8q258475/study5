from django.db import models

class Type(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Тип продукта'
        verbose_name_plural = 'Типы продуктов'


class Size(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    qty = models.IntegerField(default=0, verbose_name='Колличество')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размеры'


class Color(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Цвет'
        verbose_name_plural = 'Цвета'


class Brand(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Производитель'
        verbose_name_plural = 'Производители'
    

class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    des = models.TextField(verbose_name='Описание')
    type = models.ForeignKey(Type, on_delete=models.PROTECT, 
                             verbose_name='Тип', blank=True, null=True)
    color = models.ForeignKey(Color, on_delete=models.PROTECT, 
                                   verbose_name='Цвет', blank=True, null=True)
    brands = models.ManyToManyField(Brand, verbose_name="Бренды")
    sizes = models.ManyToManyField(Size, verbose_name='Размер')
    price = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
