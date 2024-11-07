from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('accounts/', include('accounts.urls')),
    path('__debug__/', include(debug_toolbar.urls)),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
