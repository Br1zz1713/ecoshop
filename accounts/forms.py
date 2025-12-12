from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate

class CustomAdminAuthenticationForm(AuthenticationForm):
    """Simplified authentication form"""
    username = forms.CharField(
        label="Username (phone number)",
        max_length=254,
        widget=forms.TextInput(attrs={'autofocus': True}),
    )
    
    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username is not None and password:
            # Try to authenticate with phone_number as username
            self.user_cache = authenticate(
                self.request,
                phone_number=username,
                password=password,
            )
            if self.user_cache is None:
                raise forms.ValidationError(
                    "Invalid credentials",
                    code='invalid_login',
                )
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data
