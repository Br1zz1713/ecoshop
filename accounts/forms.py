from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate

class CustomAdminAuthenticationForm(AuthenticationForm):
    """Custom authentication form for Django admin that works with phone_number"""
    username = forms.CharField(
        label="Phone number or Email",
        max_length=254,
        widget=forms.TextInput(attrs={'autofocus': True}),
    )
    
    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username is not None and password:
            self.user_cache = authenticate(
                self.request,
                username=username,
                password=password,
            )
            if self.user_cache is None:
                raise forms.ValidationError(
                    "Please enter a correct phone number/email and password. "
                    "Note that both fields may be case-sensitive.",
                    code='invalid_login',
                )
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data
