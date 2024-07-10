from django.contrib import admin
from .models import Chat, Message

class ChatAdmin(admin.ModelAdmin):
    list_display = ['pk', 'sender', 'getter']
    list_display_links = ['pk']
    ordering = ['pk']

    # def get_queryset(self, request):
    #     return Advert.objects.select_related('user')
class MessageAdmin(admin.ModelAdmin):
    list_display = ['pk', 'text', 'datetime','chat_id', 'sender']
    list_display_links = ['pk']
    ordering = ['datetime', 'pk']

admin.site.register(Chat, ChatAdmin)
admin.site.register(Message, MessageAdmin)