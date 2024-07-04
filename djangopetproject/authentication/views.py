from django.contrib.auth.models import User, Group
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.renderers import JSONRenderer

from .serializers import AuthSerializer, UserSerializer


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
        if email:
            user_query = User.objects.get(email=email)
        else:
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

class RegisterView(CreateAPIView):
    permission_classes = [
        AllowAny
    ]
    
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                check_user = User.objects.filter(username=request.data.get("username")).first()
                check_email = User.objects.filter(email=request.data.get("email")).first()
                if check_user or check_email:
                    raise Exception("Пользователь с данным username или email уже существует!")
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response({"detail": "User successfully registered"}, status=201, headers=headers)
        except Exception as e:
            return Response({"detail": f"{e.args}"}, status=400)
        
    def perform_create(self, serializer):
        serializer.save()

