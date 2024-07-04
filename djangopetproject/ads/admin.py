from django.contrib import admin

from ads.models import Advert


class AdsAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'description_short', 'topic', 'datetime', 'image', 'user']
    list_display_links = ['pk', 'name']
    ordering = ['datetime', 'pk']
    search_fields = ['name', 'description', 'topic']

    # def get_queryset(self, request):
    #     return Advert.objects.select_related('user')


admin.site.register(Advert, AdsAdmin)
