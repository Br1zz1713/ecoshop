from django.test import TestCase

from shop.models import Category, Product, Order


class ApiSmokeTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name='Test Category',
            slug='test-category',
        )
        self.product = Product.objects.create(
            category=self.category,
            name='Test Product',
            slug='test-product',
            price='10.00',
            available=True,
        )

    def test_ping_endpoint(self):
        response = self.client.get('/ping/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'pong')

    def test_product_list_endpoint(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_product_view_increment_endpoint(self):
        response = self.client.post(f'/api/products/{self.product.id}/view/')
        self.assertEqual(response.status_code, 200)
        self.product.refresh_from_db()
        self.assertEqual(self.product.views, 1)

    def test_health_endpoints(self):
        live = self.client.get('/health/live/')
        ready = self.client.get('/health/ready/')
        self.assertEqual(live.status_code, 200)
        self.assertEqual(ready.status_code, 200)
        self.assertEqual(live.json().get('status'), 'ok')
        self.assertEqual(ready.json().get('status'), 'ready')

    def test_order_create_endpoint_with_valid_payload(self):
        payload = {
            'first_name': 'Test',
            'last_name': 'Buyer',
            'email': 'buyer@example.com',
            'address': 'Some street',
            'city': 'Kyiv',
            'paid': True,
            'items': [
                {
                    'product': self.product.id,
                    'price': '10.00',
                    'quantity': 2,
                }
            ],
        }
        response = self.client.post('/api/orders/create/', data=payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Order.objects.count(), 1)

