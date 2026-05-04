# create_admin.py
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()

def run():
    phone = '+380980955165'
    password = 'Jek.19092002'
    email = 'admin@ecodeviva.com' # Placeholder as email is required by model, though not for login per se if using phone

    if not User.objects.filter(phone_number=phone).exists():
        print(f"Creating superuser {phone}...")
        User.objects.create_superuser(
            phone_number=phone,
            password=password,
            email=email
        )
        print("Superuser created successfully.")
    else:
        print("Superuser already exists.")

if __name__ == '__main__':
    run()
