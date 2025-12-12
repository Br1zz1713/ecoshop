from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Grant superuser privileges to an existing user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username to grant superuser privileges')
        parser.add_argument(
            '--revoke',
            action='store_true',
            help='Revoke superuser privileges instead of granting them',
        )

    def handle(self, *args, **options):
        username = options['username']
        revoke = options.get('revoke', False)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise CommandError(f'User "{username}" does not exist')

        if revoke:
            user.is_staff = False
            user.is_superuser = False
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully revoked superuser privileges from "{username}"')
            )
        else:
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully granted superuser privileges to "{username}"')
            )
