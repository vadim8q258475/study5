import random as rd
from django.conf import settings
from .models import *

def make_cache_key(prefix, params):
    s = f'{prefix}_'
    for k, v in params.items():
        if ' ' in v:
            s += f'{k}={'+'.join(v.split(' '))}&'
        else:
            s += f'{k}={v}&'
    return s[:len(s) - 1]


def preprocess_queryset(queryset, params: dict):
    if settings.SORT_BY_KEY in params.keys():
        sort_by = params[settings.SORT_BY_KEY]
    else:
        sort_by = None

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

    queryset = sort_queryset(queryset, sort_by)
    queryset = filter_queryset(queryset,
                               price_start, price_end,
                               brands, types)
    return queryset

def sort_queryset(queryset, field_name):
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


def generate_random_products(num, brands, types):
    queryset = []
    for _ in range(num):
        for i, type in enumerate(types):
            for j in range(1, 6):
                kwargs = {
                    'name': f'name_{i}{j}',
                    'des':  settings.LOREM,
                    'type': type,
                    'brand': rd.choice(brands),
                    'price': rd.randint(settings.DEFAULT_PRICE_START, settings.DEFAULT_PRICE_END),
                    'qty': rd.randint(settings.DEFAULT_QTY_START, settings.DEFAULT_QTY_END)
                }
                product = Product.objects.create(**kwargs)
                product.img = f"static/images/{type.name}/img_{j}.jpg"
                product.save()
                queryset.append(product)
    return queryset



def delete_all_models(queryset):
    for element in queryset:
        element.delete()

    
