from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()

class EmailOrPhoneBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Django admin может передавать phone_number вместо username
        if username is None:
            username = kwargs.get('phone_number') or kwargs.get(User.USERNAME_FIELD)
        
        if not username:
            return None
        
        try:
            # Check against email OR phone_number
            user = User.objects.get(Q(email=username) | Q(phone_number=username))
        except User.DoesNotExist:
            return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
