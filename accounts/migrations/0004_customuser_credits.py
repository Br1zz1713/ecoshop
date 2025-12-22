# Generated manually for adding credits field to CustomUser
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='credits',
            field=models.PositiveIntegerField(default=3, help_text='User credits for purchases'),
        ),
    ]
