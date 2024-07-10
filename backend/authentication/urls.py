from django.urls import path, include
from rest_framework import routers

from authentication.views import AuthenticationViewSet, LoginView, LogoutView,RegisterView

app_name = 'authentication'

router = routers.DefaultRouter()
router.register('', AuthenticationViewSet, basename='auths')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls), name='auths')
]
