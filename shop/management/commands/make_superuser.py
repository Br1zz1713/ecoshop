from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Make a user a superuser or create one if email is provided'

    def add_arguments(self, parser):
        parser.add_argument('identifier', type=str, help='Email or username of the user')
        parser.add_argument('--revoke', action='store_true', help='Revoke superuser status')

    def handle(self, *args, **options):
        identifier = options['identifier']
        revoke = options.get('revoke', False)

        # Try to find user by email first, then by username
        try:
            user = User.objects.get(email=identifier)
        except User.DoesNotExist:
            # If not found by email, try username (if field exists)
            if hasattr(User, 'username'):
                try:
                    user = User.objects.get(username=identifier)
                except User.DoesNotExist:
                    self.stdout.write(self.style.ERROR(f'User with email or username "{identifier}" does not exist.'))
                    return
            else:
                self.stdout.write(self.style.ERROR(f'User with email "{identifier}" does not exist.'))
                return

        if revoke:
            user.is_superuser = False
            user.is_staff = False
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully revoked superuser privileges from {identifier}'))
        else:
            user.is_superuser = True
            user.is_staff = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully made {identifier} a superuser'))
