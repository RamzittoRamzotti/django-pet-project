import datetime
from rest_framework import serializers

from ads.models import Advert


class AdsSerializer(serializers.ModelSerializer):
    CHOICES = ("Машины", "Недвижимость", "Бытовая техника", "Одежда", "Другое")
    topic = serializers.ChoiceField(choices=CHOICES)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=500)
    image = serializers.ImageField()
    datetime = serializers.DateTimeField(default=datetime.datetime.now(), read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True, )
    is_approved = serializers.BooleanField(default=False, read_only=True)

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data['user'] = user
        return Advert.objects.create(**validated_data)

    class Meta:
        model = Advert
        fields = "__all__"
