from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessagesView,ShowChats,ShowChatsForAds


router = DefaultRouter()
router.register(r'', ChatViewSet, basename="chats")

urlpatterns = [
    
    path('', include(router.urls)),
    
    path('messages/<int:chat_id>/', MessagesView.as_view(), name='chat-messages'),
    path('<int:sender_id>/<int:getter_id>/', ShowChats.as_view(), name='show-chats'),
    path('<int:sender_id>/<int:getter_id>/<int:advert_id>/', ShowChatsForAds.as_view(), name='show-chats-for-ads'),
]