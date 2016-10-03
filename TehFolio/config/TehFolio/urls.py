from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('apps.homepage.urls')),
    url(r'^news', include('apps.scrapper.urls')),
    #url(r'^glimpse', include('apps.glimpse.urls')),
]
