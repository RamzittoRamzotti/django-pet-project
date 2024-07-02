from django.urls import path, include
from rest_framework import routers

from authentication.views import AuthenticationViewSet
app_name = 'authentication'

router = routers.DefaultRouter()
router.register('', AuthenticationViewSet, basename='auths')
urlpatterns =  router.urls