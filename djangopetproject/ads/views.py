from rest_framework import viewsets, generics, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from ads.models import Advert
from ads.serializers import AdsSerializer


class AdsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AdsSerializer
    filterset_fields = ['topic']

    def get_queryset(self):
        return Advert.objects.filter(is_approved=True)

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        queryset_filtered = queryset
        page = self.paginate_queryset(queryset_filtered)
        serializer = self.get_serializer(page, many=True)
        if page is not None:
            return self.get_paginated_response(serializer.data)
        # serializer = self.get_serializer(queryset_filtered, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response({"detail": "Advert successfully uploaded"}, status=201, headers=headers)
        except Exception as e:
            return Response({"detail": f"{e.args}"}, status=400)

    def perform_create(self, serializer):
        serializer.save()


class AdsStartPageView(ListAPIView):
    serializer_class = AdsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Advert.objects.filter(is_approved=True).order_by('-datetime')
