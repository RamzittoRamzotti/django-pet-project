# Generated by Django 5.0.6 on 2024-07-04 20:47

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0004_alter_adverts_date'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Adverts',
            new_name='Advert',
        ),
        migrations.RenameField(
            model_name='advert',
            old_name='date',
            new_name='datetime',
        ),
    ]