"""
сортировка по значению sort_by=<field_name> reverse=<True/False>
фильтрация по цветам colors=<c1>+<c2>
           по цене price_start=<value> price_end=<value>   
           по размерам sizes=<s1>+<s2>
           по брендам brands=<b1>+<b2>
           по типам types=<t1>+<t2>


НУЖНО ПОКРЫТЬ ВСЕ ЭТО ТЕСТАМИ
"""

ACCEPTABLE_SORT_FIELDS = ['price', 'name', '-price', '-name']

REVERSE_TRUE_VALUE = 'True'
REVERSE_FALSE_VALUE = 'False'

SORT_BY_KEY = 'sort_by'
REVERSE_KEY = 'reverse'
PRICE_START_KEY = 'price_start'
PRICE_END_KEY = 'price_end'
COLORS_KEY = 'colors'
SIZES_KEY = 'sizes'
BRANDS_KEY = 'brands'
TYPES_KEY = 'types'


def preprocess_queryset(queryset, params: dict):
    if  SORT_BY_KEY in params.keys():
        sort_by = params[SORT_BY_KEY]
    else:
        sort_by = None
    if  REVERSE_KEY in params.keys():
        reverse = params[REVERSE_KEY]
    else:
        reverse = None

    if PRICE_START_KEY in params.keys():
        price_start = int(params[PRICE_START_KEY])
    else:
        price_start = None
    if PRICE_END_KEY in params.keys():
        price_end = int(params[PRICE_END_KEY])
    else:
        price_end = None

    if COLORS_KEY in params.keys():
        colors = [int(i) for i in params[COLORS_KEY].split()]
    else:
        colors = None
    if SIZES_KEY in params.keys():
        sizes = [int(i) for i in params[SIZES_KEY].split()]
    else:
        sizes = None
    if BRANDS_KEY in params.keys():
        brands = [int(i) for i in params[BRANDS_KEY].split()]
    else:
        brands = None
    if TYPES_KEY in params.keys():
        types = [int(i) for i in params[TYPES_KEY].split()]
    else:
        types = None

    queryset = sort_queryset(queryset, sort_by, reverse=reverse)
    queryset = filter_queryset(queryset,
                               price_start, price_end,
                               colors, sizes,
                               brands, types)
    return queryset

def sort_queryset(queryset, field_name, reverse=REVERSE_FALSE_VALUE):
    if reverse == REVERSE_TRUE_VALUE:
        field_name = f'-{field_name}'
    if field_name in ACCEPTABLE_SORT_FIELDS:
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
        queryset = queryset.filter(colors__in=colors)

    if sizes:
        queryset = queryset.filter(size__in=sizes)

    if brands:
        queryset = queryset.filter(brands__in=brands)

    if types:
        queryset = queryset.filter(type__in=types)

    return queryset

    
