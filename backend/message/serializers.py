from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from ads.models import Advert
class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())
    
    datetime = serializers.DateTimeField(read_only=True)
    def validate(self, data):
        chat = data["chat"]
        user = data['sender']
        if chat.getter != user and chat.sender != user:
            raise ValidationError("Несанкционированный доступ к чату")
        return data

    # def create(self, validated_data):
    #     chat = validated_data.pop('chat')
    #     sender = validated_data['request'].user
    #     message = Message.objects.create(chat=chat, sender=sender, **validated_data)
    #     return message
        

    def get_sender_username(self, obj):
        return obj.sender.username
    
    class Meta:
        model = Message
        fields = "__all__"
    #{"text":"test"}

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    getter = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    advert = serializers.PrimaryKeyRelatedField(queryset=Advert.objects.all())
    advert_name = serializers.SerializerMethodField()
    sender_username = serializers.SerializerMethodField()
    getter_username = serializers.SerializerMethodField()
    def validate(self, data):
        advert=data["advert"]
        sender = data['sender']
        getter=data["getter"]
        if advert.user != sender and advert.user != getter:
            raise ValidationError("Несанкционированный доступ к чату")
        return data
    def get_sender_username(self, obj):
        return obj.sender.username
    def get_getter_username(self, obj):
        return obj.getter.username
    def get_advert_name(self, obj):
        return obj.advert.name
    class Meta:
        model = Chat
        fields = "__all__"