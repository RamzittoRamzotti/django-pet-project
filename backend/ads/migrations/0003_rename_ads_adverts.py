# Generated by Django 5.0.6 on 2024-07-04 20:38

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0002_ads_image'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Ads',
            new_name='Adverts',
        ),
    ]