from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser
from .forms import CustomAdminAuthenticationForm

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('email', 'phone_number', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'phone_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )
    search_fields = ('email', 'phone_number')
    ordering = ('email',)
    filter_horizontal = ()

admin.site.unregister(CustomUser) if admin.site.is_registered(CustomUser) else None
admin.site.register(CustomUser, CustomUserAdmin)

# Set custom login form
admin.site.login_form = CustomAdminAuthenticationForm
admin.site.login_template = 'admin/login.html'
