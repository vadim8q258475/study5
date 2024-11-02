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

    if settings.COLORS_KEY in params.keys():
        colors = [int(i) for i in params[settings.COLORS_KEY].split()]
    else:
        colors = None
    if settings.SIZES_KEY in params.keys():
        sizes = [int(i) for i in params[settings.SIZES_KEY].split()]
    else:
        sizes = None
    if settings.BRANDS_KEY in params.keys():
        brands = [int(i) for i in params[settings.BRANDS_KEY].split()]
    else:
        brands = None
    if settings.TYPES_KEY in params.keys():
        types = [int(i) for i in params[settings.TYPES_KEY].split()]
    else:
        types = None

    queryset = sort_queryset(queryset, sort_by, reverse=reverse)
    queryset = filter_queryset(queryset,
                               price_start, price_end,
                               colors, sizes,
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
                    colors, sizes,
                    brands, types):

    if price_start and price_end:
        queryset = queryset.filter(price__range=(price_start, price_end))
    elif price_start and not price_end:
        queryset = queryset.filter(price__gte=price_start)
    elif price_end and not price_start:
        queryset = queryset.filter(price__lte=price_end)

    if colors:
        queryset = queryset.filter(color__in=colors)

    if sizes:
        queryset = queryset.filter(sizes__in=sizes)

    if brands:
        queryset = queryset.filter(brands__in=brands)

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

def generate_sizes(names):
    queryset = []
    for name in names:
        element = Size.objects.create(name=name, qty=rd.randint(1, 100))
        element.save()
        queryset.append(element)
    return queryset


def generate_random_products(num_models, colors, sizes, brands, types):
    queryset = []
    for i in range(num_models):
        kwargs = {
            'name': f'name{i}',
            'des':  f'des{i}',
            'type': rd.choice(types),
            'color': rd.choice(colors),
            'price': rd.randint(settings.DEFAULT_PRICE_START, settings.DEFAULT_PRICE_END),
        }
        product = Product.objects.create(**kwargs)
        product.sizes.set(
            rd.sample(sizes, rd.randint(3, len(sizes)))
        )
        ln_brands = 3
        if len(brands) < ln_brands:
            ln_brands = len(brands)
            
        product.brands.set(
            rd.sample(brands, rd.randint(1, ln_brands))
        )
       
        product.save()
        queryset.append(product)
    return queryset



def delete_all_models(queryset):
    for element in queryset:
        element.delete()

    
