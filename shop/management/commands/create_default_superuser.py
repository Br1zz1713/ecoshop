from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a default superuser if none exists'

    def handle(self, *args, **options):
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.WARNING('Superuser already exists'))
            return

        try:
            user = User.objects.create_user(
                email='admin@ecoshop.com',
                phone_number='+9999999999',
                password='EcoShop2024!'
            )
            user.is_staff = True
            user.is_superuser = True
            user.save()
            
            self.stdout.write(self.style.SUCCESS(
                f'Superuser created successfully!\n'
                f'Phone: +9999999999\n'
                f'Email: admin@ecoshop.com\n'
                f'Password: EcoShop2024!'
            ))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating superuser: {e}'))
