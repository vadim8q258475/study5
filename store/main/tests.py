from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.status import HTTP_200_OK
from .models import *
from .serializers import *
import random as rd

"""
сортировка по значению sort_by=<field_name> reverse=<True/False>
фильтрация по цветам colors=<c1>+<c2>
           по цене price_start=<value> price_end=<value>   
           по размерам sizes=<s1>+<s2>
           по брендам brands=<b1>+<b2>
           по типам types=<t1>+<t2>

НУЖНО ПОКРЫТЬ ВСЕ ЭТО ТЕСТАМИ
"""

COLORS = ['red', 'blue', 'green', 'yellow', 'pink', 'black', 'white']
SIZES = ['XXL', 'XL', 'L', 'M', 'S', 'XS']
BRANDS = ['Nike', 'Amiri', 'Balenciaga', 'Adidas', 'Rick Owens', 'Bape']
TYPES = ['Hoodie', 'T-shirt', 'Jeans', 'Jacket', 'Pants']
PRICE_START = 1000
PRICE_END = 100_000
QTY_START = 1
QTY_END = 1000


def generate_simple_models(model, names):
    queryset = []
    for name in names:
        element = model.objects.create(name=name)
        element.save()
        queryset.append(element)
    return queryset


def generate_random_products(num_models, colors, sizes, brands, types):
    queryset = []
    for i in range(num_models):
        kwargs = {
            'name': f'name{i}',
            'des':  f'des{i}',
            # 'colors': rd.sample(colors, rd.randint(1, len(colors))),
            'type': rd.choice(types),
            'size': rd.choice(sizes),
            # 'brands': rd.sample(brands, rd.randint(1, len(brands))),
            'price': rd.randint(PRICE_START, PRICE_END),
            'qty': rd.randint(QTY_START, QTY_END),
        }
        product = Product.objects.create(**kwargs)
        product.colors.set(
            rd.sample(colors, rd.randint(1, len(colors)))
        )
        product.brands.set(
            rd.sample(brands, rd.randint(1, len(brands)))
        )
       
        product.save()
        queryset.append(product)
    return queryset




class ProductsAPIView(APITestCase):

    base_url = 'http://127.0.0.1:8000/products'
    base_query_url = 'http://127.0.0.1:8000/products?sort_by={}&colors={}&sizes={}&types={}&brands={}&price_start={}&price_end={}'
    colors = generate_simple_models(Color, COLORS)
    sizes = generate_simple_models(Size, SIZES)
    brands = generate_simple_models(Brand, BRANDS)
    types = generate_simple_models(Type,TYPES)

    def setUp(self):
        generate_random_products(20, self.colors, self.sizes, self.brands, self.types)
        return super().setUp()

    def test_filter_sort_by_all(self):
        colors_samples = '+'.join(
            rd.sample(
                [str(i.id) for i in self.colors], 
                rd.randint(1, len(self.colors))
                )
            )
        brands_samples = '+'.join(
            rd.sample(
                [str(i.id) for i in self.brands], 
                rd.randint(1, len(self.brands))
                )
            )
        sizes_samples = '+'.join(
            rd.sample(
                [str(i.id) for i in self.sizes], 
                rd.randint(1, len(self.sizes))
                )
            )
        types_samples = '+'.join(
            rd.sample(
                [str(i.id) for i in self.types], 
                rd.randint(1, len(self.types))
                )
            )
        price_start_sample = rd.randint(PRICE_START, PRICE_END)
        price_end_sample = str(rd.randint(price_start_sample, PRICE_END))
        price_start_sample = str(price_start_sample)

        url1 = self.base_query_url.format('price', 
                                          colors_samples, sizes_samples, 
                                          types_samples, brands_samples,
                                          price_start_sample, price_end_sample)
        url2 = self.base_query_url.format('name', 
                                          colors_samples, sizes_samples, 
                                          types_samples, brands_samples,
                                          price_start_sample, price_end_sample) + '&reverse=True'
        
        url3 = f'{self.base_url}?sort_by={'price'}&colors={colors_samples}'
        url4 = f'{self.base_url}?&types={types_samples}&brands={brands_samples}&price_start={price_start_sample}'

        products = Product.objects.all()
        products1 = products.order_by('price').filter(
            colors__in=[int(i) for i in colors_samples.split('+')]
            ).filter(
                size__in=[int(i) for i in sizes_samples.split('+')]
            ).filter(
                type__in=[int(i) for i in types_samples.split('+')]
            ).filter(
                brands__in=[int(i) for i in brands_samples.split('+')]
            ).filter(
                price__range=(price_start_sample, price_end_sample)
            )
        products2 = products.order_by('-name').filter(
            colors__in=[int(i) for i in colors_samples.split('+')]
            ).filter(
                size__in=[int(i) for i in sizes_samples.split('+')]
            ).filter(
                type__in=[int(i) for i in types_samples.split('+')]
            ).filter(
                brands__in=[int(i) for i in brands_samples.split('+')]
            ).filter(
                price__range=(price_start_sample, price_end_sample)
            )
        products3 = products.filter(
            colors__in=[int(i) for i in colors_samples.split('+')]
            ).order_by('price')
        products4 = products.filter(
                type__in=[int(i) for i in types_samples.split('+')]
            ).filter(
                brands__in=[int(i) for i in brands_samples.split('+')]
            ).filter(price__gte=price_start_sample)
        
        response1 = self.client.get(url1)
        response2 = self.client.get(url2)
        response3 = self.client.get(url3)
        response4 = self.client.get(url4)

        self.assertEqual(HTTP_200_OK, response1.status_code)
        self.assertEqual(HTTP_200_OK, response2.status_code)
        self.assertEqual(HTTP_200_OK, response3.status_code)
        self.assertEqual(HTTP_200_OK, response4.status_code)

        self.assertEqual(ProductSerializer(products1, many=True).data, response1.data)
        self.assertEqual(ProductSerializer(products2, many=True).data, response2.data)
        self.assertEqual(ProductSerializer(products3, many=True).data, response3.data)
        self.assertEqual(ProductSerializer(products4, many=True).data, response4.data)
