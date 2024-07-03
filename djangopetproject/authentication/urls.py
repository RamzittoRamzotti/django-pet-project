from django.urls import path, include
from rest_framework import routers

from authentication.views import AuthenticationViewSet, LoginView, LogoutView

app_name = 'authentication'

router = routers.DefaultRouter()
router.register(r'auth', AuthenticationViewSet, basename='auths')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
