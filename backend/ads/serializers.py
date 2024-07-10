import datetime
from rest_framework import serializers
from django.contrib.auth.models import User
from ads.models import Advert


class AdsSerializer(serializers.ModelSerializer):
    CHOICES = (
        ("cars", "Машины"),
        ("real_estate", "Недвижимость"),
        ("appliances", "Бытовая техника"),
        ("clothing", "Одежда"),
        ("other", "Другое"),
    )
    topic = serializers.ChoiceField(choices=CHOICES)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=500)
    image = serializers.ImageField()
    datetime = serializers.DateTimeField(default=datetime.datetime.now(), read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    is_approved = serializers.BooleanField(default=False, read_only=True)
    display_topic = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()

    def get_user_name(self,obj):
        return obj.user.username
    
    def get_display_topic(self, obj):
        return dict(self.CHOICES).get(obj.topic)

    class Meta:
        model = Advert
        fields = "__all__"
