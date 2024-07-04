import datetime
from rest_framework import serializers

from ads.models import Advert


class AdsSerializer(serializers.ModelSerializer):
    topic = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=500)
    image = serializers.ImageField()
    datetime = serializers.DateTimeField()

    def create(self, validated_data):
        return Advert.objects.create(**validated_data)

    class Meta:
        model = Advert
        fields = '__all__'
