from django.contrib import admin, auth

from ads.models import Advert

class AdsAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'description_short', 'topic', 'datetime', 'image', 'user']
    list_display_links = ['pk', 'name']
    ordering = ['datetime', 'pk']
    search_fields = ['name', 'description', 'topic']


admin.site.register(Advert, AdsAdmin)