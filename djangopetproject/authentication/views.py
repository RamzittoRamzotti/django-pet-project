from django.contrib.auth.models import User, Group
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import AuthSerializer


class AuthenticationViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request: Request, pk=None) -> Response:
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)

        serialized = AuthSerializer(user)
        return Response(serialized.data, status=200)


class LoginView(APIView):
    def post(self, request: Request) -> Response:
        username_or_email = request.data.get('login')
        password = request.data.get('password')
        if '@' in username_or_email:
            email = username_or_email
            username = None
        else:
            username = username_or_email
            email = None
        if email:
            user = authenticate(request=request, email=email, password=password)
        else:
            user = authenticate(request=request, username=username, password=password)
        if not user:
            return Response({"detail": "invalid login or password"}, status=400)
        login(request=request, user=user)
        user_query = User.objects.get(username=username)
        serialized = AuthSerializer(user_query)
        return Response(serialized.data, status=200)
    # {"login":"admin", "password":"admin"}


class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        logout(request=request)
        return Response({"detail": "successful logout"}, status=200)

# class AuthView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#     def get(self,request):
#         if request.user:
#             return Response({"user": request.user.username}, status=200)
#         else:
#             return Response({"detail": "Вам нужно аутентифицироваться"}, status=400)
