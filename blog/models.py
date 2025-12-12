from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    excerpt = models.TextField(blank=True, help_text="Short summary for the card view")
    content = models.TextField()
    image = models.ImageField(upload_to='blog/%Y/%m/', blank=True)
    author = models.CharField(max_length=100, default="Eco Shop Team")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
