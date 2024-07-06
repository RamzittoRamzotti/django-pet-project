from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

from rest_framework import routers

from ads import views

router = routers.DefaultRouter()
router.register('', views.AdsViewSet, basename='ads')

urlpatterns = [
    path('startads/', views.AdsStartPageView.as_view(), name='startads'),
    path('', include(router.urls)),
]
