# Generated by Django 4.2.7 on 2023-11-10 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goalTracker', '0003_graphflow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='graphflow',
            name='AdjList',
            field=models.CharField(default='[]', max_length=5000),
        ),
        migrations.AlterField(
            model_name='graphflow',
            name='NodeCount',
            field=models.IntegerField(default=0),
        ),
    ]
