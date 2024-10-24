from pathlib import Path
# from django.contrib.auth import get_user_model


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-pmtt$j7m1svp2moxitkzx9q8$4a@^&_tr83t8!scg#3dq8l5!p'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'main',
    'accounts'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'store.urls'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

# User = get_user_model()

# DJOSER = {
#     'SEND_ACTIVATION_EMAIL': True,
#     'LOGIN_FIELD': User.EMAIL_FIELD,
# }

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'store.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


DEFAULT_COLORS = ['red', 'blue', 'green', 'yellow', 'pink', 'black', 'white']
DEFAULT_SIZES = ['XXL', 'XL', 'L', 'M', 'S', 'XS']
DEFAULT_BRANDS = ['Nike', 'Amiri', 'Balenciaga', 'Adidas', 'Rick Owens', 'Bape']
DEFAULT_TYPES = ['Hoodie', 'T-shirt', 'Jeans', 'Jacket', 'Pants']
DEFAULT_PRICE_START = 1000
DEFAULT_PRICE_END = 100_000
DEFAULT_QTY_START = 1
DEFAULT_QTY_END = 1000


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
