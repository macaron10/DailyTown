# Generated by Django 3.1.2 on 2020-11-05 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_hong', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='isTrue',
            field=models.BooleanField(default=False),
        ),
    ]
