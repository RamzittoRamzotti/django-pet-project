from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Message, Chat, Advert
from .serializers import ChatSerializer, MessageSerializer
from django.contrib.auth.models import User
from django.db.models import Q

class ChatViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(sender=user.id).distinct() | Chat.objects.filter(getter=user.id).distinct()

class MessagesView(APIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, chat_id):
        chat = get_object_or_404(Chat, id=chat_id)
        messages = chat.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, chat_id):
        chat = get_object_or_404(Chat, id=chat_id)
        data = request.data.copy()
        data['chat'] = chat.id
        data['sender'] = request.user.id
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save(chat=chat, sender=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ShowChats(APIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, sender_id, getter_id):
        chat = Chat.objects.filter(getter__id=getter_id, sender__id=sender_id).first()
        if chat is None:
            chat = Chat.objects.filter(getter__id=sender_id, sender__id=getter_id).first()
        
        if chat:
            serializer = ChatSerializer(chat)
            return Response(serializer.data, status=200)
        return Response({"detail":"No such chat"}, status=404)
    
class ShowChatsForAds(APIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, sender_id, getter_id, advert_id):
        chat = Chat.objects.filter(getter__id=getter_id, sender__id=sender_id, advert__id=advert_id).first()
        if chat is None:
            chat = Chat.objects.filter(getter__id=sender_id, sender__id=getter_id, advert__id=advert_id).first()

        if chat:
            serializer = ChatSerializer(chat)
            return Response(serializer.data, status=200)
        return Response({"detail":"No such chat"}, status=404)
    
    def post(self, request, sender_id, getter_id, advert_id):
        advert = get_object_or_404(Advert, id=advert_id)
        sender = get_object_or_404(User, id=sender_id)
        getter = get_object_or_404(User, id=getter_id)
        data = request.data.copy()
        data['advert'] = advert.id
        data['sender'] = sender.id
        data['getter'] = getter.id
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save(advert=advert, sender=sender, getter=getter)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
        # if chat:
        #     return Response(chat, status=200)
        # elif created:
        #     return Response(created, status=201)
        # return Response(status=400)
