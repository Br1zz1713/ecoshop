from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Replace the dynamically generated field (which is 'phone_number') with a generic 'username' field
        # or just allow 'username' in addition.
        self.fields['username'] = serializers.CharField()
        # Remove the requirement for the specific USERNAME_FIELD if it exists
        if User.USERNAME_FIELD in self.fields:
             del self.fields[User.USERNAME_FIELD]

    def validate(self, attrs):
        # The parent validate() method expects the USERNAME_FIELD to be present in attrs
        # because it uses it to call authenticate().
        # Since we use a generic 'username' field, we need to map it.
        username_value = attrs.get('username')
        if User.USERNAME_FIELD and User.USERNAME_FIELD != 'username':
            attrs[User.USERNAME_FIELD] = username_value
            
        data = super().validate(attrs)
        
        # Add extra user data to the response
        data['username'] = self.user.username if self.user.username else str(self.user)
        data['email'] = self.user.email
        data['is_staff'] = self.user.is_staff
        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('phone_number', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone_number', 'email', 'is_staff')
