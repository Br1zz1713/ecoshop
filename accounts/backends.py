from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()

class EmailOrPhoneBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Django admin can pass phone_number instead of username
        if username is None:
            username = kwargs.get('phone_number') or kwargs.get(User.USERNAME_FIELD)
        
        if not username:
            return None
        
        try:
            # Check against email OR phone_number
            # Strip non-digits for phone search if it looks like one
            clean_username = username
            if any(char.isdigit() for char in username) and '@' not in username:
                # Keep + if present at start, but strip other non-digits
                prefix = '+' if username.startswith('+') else ''
                digits = ''.join(filter(str.isdigit, username))
                clean_username = prefix + digits

            user = User.objects.filter(
                Q(email=username) | 
                Q(phone_number=username) | 
                Q(phone_number=clean_username)
            ).first()
            if not user:
                return None
        except Exception:
            return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
