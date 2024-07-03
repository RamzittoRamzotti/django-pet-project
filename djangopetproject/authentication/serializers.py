from django.contrib.auth.models import User, Group
from rest_framework import serializers


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']
