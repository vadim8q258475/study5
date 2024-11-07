# Generated by Django 5.1.2 on 2024-10-31 07:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='colors',
        ),
        migrations.RemoveField(
            model_name='product',
            name='qty',
        ),
        migrations.RemoveField(
            model_name='product',
            name='size',
        ),
        migrations.AddField(
            model_name='product',
            name='color',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.color', verbose_name='Цвет'),
        ),
        migrations.AddField(
            model_name='product',
            name='sizes',
            field=models.ManyToManyField(to='main.size', verbose_name='Размер'),
        ),
        migrations.AddField(
            model_name='size',
            name='qty',
            field=models.IntegerField(default=0, verbose_name='Колличество'),
        ),
    ]
