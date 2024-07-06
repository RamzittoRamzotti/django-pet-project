from django.contrib.auth.models import User
from django.db import models
from django.db.models import ForeignKey

from djangopetproject import settings


class Advert(models.Model):
    CHOICES = (
        ("cars", "Машины"),
        ("real_estate", "Недвижимость"),
        ("appliances", "Бытовая техника"),
        ("clothing", "Одежда"),
        ("other", "Другое"),
    )
    topic = models.CharField(max_length=30, choices=CHOICES)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    datetime = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='ads/images/', null=True)
    user = ForeignKey(User, on_delete=models.CASCADE, related_name="ads")
    is_approved = models.BooleanField(default=False)

    @property
    def description_short(self):
        if len(self.description) > 50:
            return self.description[:50] + '...'
        return self.description

    @property
    def url(self):
        if self.image:
            return self.image.url
        return None

    def __str__(self):
        return f'{self.pk=!r} {self.name=!r}'
