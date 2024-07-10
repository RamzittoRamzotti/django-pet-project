from django.db import models
from django.contrib.auth.models import User
from ads.models import Advert
class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_chats", null=False)
    getter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_chats", null=False)
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE, related_name='adverts')

class Message(models.Model):
    text = models.CharField(max_length=500, blank=False)
    datetime = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")

    def __str__(self):
        return f"{self.sender}: {self.text}"