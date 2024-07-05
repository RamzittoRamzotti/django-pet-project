from rest_framework import viewsets, generics, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ads.models import Advert
from ads.serializers import AdsSerializer


class AdsViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = AdsSerializer

    queryset = Advert.objects.all()

    def list(self, request):
        queryset = Advert.objects.all()
        queryset_filtered = queryset.filter(is_approved=True).order_by('datetime')
        serializer = AdsSerializer(queryset_filtered, many=True)
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
