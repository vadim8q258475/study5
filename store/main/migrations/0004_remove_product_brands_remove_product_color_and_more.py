# Generated by Django 5.1.2 on 2024-10-31 07:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_product_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='brands',
        ),
        migrations.RemoveField(
            model_name='product',
            name='color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price',
        ),
        migrations.RemoveField(
            model_name='product',
            name='sizes',
        ),
        migrations.RemoveField(
            model_name='product',
            name='type',
        ),
    ]