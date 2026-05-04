from django.contrib.auth import get_user_model
from django.test import TestCase


User = get_user_model()


class AccountsApiTests(TestCase):
    def test_register_and_login_flow(self):
        register_payload = {
            'phone_number': '+380501112233',
            'email': 'user@example.com',
            'password': 'StrongPass123!',
        }
        register_response = self.client.post('/api/register/', data=register_payload, content_type='application/json')
        self.assertEqual(register_response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)

        login_payload = {
            'username': '+380501112233',
            'password': 'StrongPass123!',
        }
        login_response = self.client.post('/api/token/', data=login_payload, content_type='application/json')
        self.assertEqual(login_response.status_code, 200)
        self.assertIn('access', login_response.json())
        self.assertIn('refresh', login_response.json())

    def test_profile_requires_auth(self):
        response = self.client.get('/api/me/')
        self.assertEqual(response.status_code, 401)

    def test_profile_with_token_returns_user(self):
        user = User.objects.create_user(
            phone_number='+380501112244',
            email='profile@example.com',
            password='StrongPass123!',
        )
        login_response = self.client.post(
            '/api/token/',
            data={'username': user.phone_number, 'password': 'StrongPass123!'},
            content_type='application/json',
        )
        self.assertEqual(login_response.status_code, 200)
        access = login_response.json()['access']

        profile_response = self.client.get(
            '/api/me/',
            HTTP_AUTHORIZATION=f'Bearer {access}',
        )
        self.assertEqual(profile_response.status_code, 200)
        self.assertEqual(profile_response.json().get('email'), user.email)

    def test_login_with_email_identifier(self):
        user = User.objects.create_user(
            phone_number='+380501112255',
            email='email-login@example.com',
            password='StrongPass123!',
        )
        response = self.client.post(
            '/api/token/',
            data={'username': user.email, 'password': 'StrongPass123!'},
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())
