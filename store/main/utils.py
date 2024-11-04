import random as rd
from django.conf import settings
from .models import *



"""
сортировка по значению sort_by=<field_name> reverse=<True/False>
фильтрация по цветам colors=<c1>+<c2>
           по цене price_start=<value> price_end=<value>   
           по размерам sizes=<s1>+<s2>
           по брендам brands=<b1>+<b2>
           по типам types=<t1>+<t2>


НУЖНО ПОКРЫТЬ ВСЕ ЭТО ТЕСТАМИ
"""


def preprocess_queryset(queryset, params: dict):
    print(params)
    if settings.SORT_BY_KEY in params.keys():
        sort_by = params[settings.SORT_BY_KEY]
    else:
        sort_by = None
    if settings.REVERSE_KEY in params.keys():
        reverse = params[settings.REVERSE_KEY]
    else:
        reverse = None

    if settings.PRICE_START_KEY in params.keys():
        price_start = int(params[settings.PRICE_START_KEY])
    else:
        price_start = None
    if settings.PRICE_END_KEY in params.keys():
        price_end = int(params[settings.PRICE_END_KEY])
    else:
        price_end = None

    if settings.BRANDS_KEY in params.keys():
        brands = [int(i) for i in params[settings.BRANDS_KEY].split()]
    else:
        brands = None
    if settings.TYPES_KEY in params.keys():
        types = [Type.objects.get(id=int(i))  for i in params[settings.TYPES_KEY].split()]
    else:
        types = None

    queryset = sort_queryset(queryset, sort_by, reverse=reverse)
    queryset = filter_queryset(queryset,
                               price_start, price_end,
                               brands, types)
    return queryset

def sort_queryset(queryset, field_name, reverse=settings.REVERSE_FALSE_VALUE):
    if reverse == settings.REVERSE_TRUE_VALUE:
        field_name = f'-{field_name}'
    if field_name in settings.ACCEPTABLE_SORT_FIELDS:
        queryset = queryset.order_by(field_name)
    return queryset

def filter_queryset(queryset,
                    price_start, price_end,
                    brands, types):

    if price_start and price_end:
        queryset = queryset.filter(price__range=(price_start, price_end))
    elif price_start and not price_end:
        queryset = queryset.filter(price__gte=price_start)
    elif price_end and not price_start:
        queryset = queryset.filter(price__lte=price_end)

    if brands:
        queryset = queryset.filter(brand__in=brands)

    if types:
        queryset = queryset.filter(type__in=types)

    return queryset



def generate_simple_models(model, names):
    queryset = []
    for name in names:
        element = model.objects.create(name=name)
        element.save()
        queryset.append(element)
    return queryset


def generate_random_products(num_models, brands, types):
    queryset = []
    for i in range(num_models):
        kwargs = {
            'name': f'name{i}',
            'des':  settings.LOREM,
            'type': rd.choice(types),
            'brand': rd.choice(brands),
            'price': rd.randint(settings.DEFAULT_PRICE_START, settings.DEFAULT_PRICE_END),
            'qty': rd.randint(settings.DEFAULT_QTY_START, settings.DEFAULT_QTY_END)
        }
        product = Product.objects.create(**kwargs)
       
        product.save()
        queryset.append(product)
    return queryset



def delete_all_models(queryset):
    for element in queryset:
        element.delete()

    
