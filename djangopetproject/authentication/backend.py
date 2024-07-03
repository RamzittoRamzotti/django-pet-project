from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist

class EmailLoginBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, email=None):
        try:
            if email:
                user = User.objects.get(email=email)
            elif username:
                user = User.objects.get(username=username)
            else:
                return None
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return None

        if user and check_password(password, user.password):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
