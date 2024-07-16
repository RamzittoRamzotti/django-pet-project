from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics, status
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from ads.models import Advert
from ads.serializers import AdsSerializer


class AdsViewSet(ListAPIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = AdsSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['topic']

    def get_queryset(self):
        return Advert.objects.filter(is_approved=True)

    # def list(self, request):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     queryset_filtered = queryset
    #     page = self.paginate_queryset(queryset_filtered)
    #     serializer = self.get_serializer(page, many=True)
    #     if page is not None:
    #         return self.get_paginated_response(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_200_OK)




class AdsStartPageView(ListAPIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = AdsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Advert.objects.filter(is_approved=True).order_by('-datetime')


class UserAdsViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['topic']
    serializer_class = AdsSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        return self.request.user.adverts.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     try:
    #         if serializer.is_valid(raise_exception=True):
    #             self.perform_create(serializer)
    #             headers = self.get_success_headers(serializer.data)
    #             return Response({"detail": "Advert successfully uploaded"}, status=201, headers=headers)
    #     except Exception as e:
    #         return Response({"detail": f"{e.args}"}, status=400)
    
