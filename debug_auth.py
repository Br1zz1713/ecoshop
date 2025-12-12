
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import authenticate, get_user_model
from accounts.serializers import UserRegistrationSerializer

User = get_user_model()

def test_registration_and_login():
    print("Testing Registration...")
    base_phone = '099999999'
    email = 'test_script@test.com'
    password = 'password123'
    
    # Clean up
    User.objects.filter(email=email).delete()
    User.objects.filter(phone_number__startswith=base_phone).delete()
    
    # Test valid phone
    data = {
        'phone_number': base_phone + '0',
        'email': email,
        'password': password
    }
    serializer = UserRegistrationSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        print(f"User created: {user}")
    else:
        print("Registration Failed:", serializer.errors)
        return

    print("\nTesting Login...")
    # Test login with phone
    user_auth = authenticate(username=data['phone_number'], password=password)
    print(f"Login with phone: {'Success' if user_auth else 'Failed'}")

    # Test login with email
    user_auth_email = authenticate(username=email, password=password)
    print(f"Login with email: {'Success' if user_auth_email else 'Failed'}")

    print("\nTesting CustomTokenObtainPairSerializer...")
    from accounts.serializers import CustomTokenObtainPairSerializer
    
    # Mock request
    class MockRequest:
        pass
        
    context = {'request': MockRequest()}
    
    # Test with phone
    data_login = {'username': data['phone_number'], 'password': password}
    serializer = CustomTokenObtainPairSerializer(data=data_login, context=context)
    if serializer.is_valid():
        print("Serializer Valid (Phone)")
    else:
        print("Serializer Invalid (Phone):", serializer.errors)
        
    try:
        serializer.validate(data_login)
        print("Serializer Validate Success")
    except Exception as e:
        print(f"Serializer Validate CRASHED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    try:
        test_registration_and_login()
    except Exception as e:
        print(f"CRASHED: {e}")
        import traceback
        traceback.print_exc()
