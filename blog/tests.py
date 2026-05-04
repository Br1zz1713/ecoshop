from django.test import TestCase

from blog.models import BlogPost


class BlogApiTests(TestCase):
    def setUp(self):
        self.post = BlogPost.objects.create(
            title='Test Blog Post',
            slug='test-blog-post',
            excerpt='Short summary',
            content='Long test content',
            author='Eco Team',
        )

    def test_blog_list_endpoint(self):
        response = self.client.get('/api/blog/')
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_blog_detail_endpoint(self):
        response = self.client.get(f'/api/blog/{self.post.slug}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('slug'), self.post.slug)
