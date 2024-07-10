from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

from rest_framework import routers

from ads import views

router = routers.DefaultRouter()
router.register('userads', views.UserAdsViewSet, basename='userads')

urlpatterns = [
    path('startads/', views.AdsStartPageView.as_view(), name='startads'),
    path('ads/', views.AdsViewSet.as_view(),name='ads'),
    path('', include(router.urls)),
]
