# Generated by Django 4.2.7 on 2023-11-10 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goalTracker', '0002_alter_goalnode_completedat_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='GraphFlow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UserId', models.IntegerField()),
                ('AdjList', models.CharField(max_length=5000)),
                ('NodeCount', models.IntegerField()),
            ],
        ),
    ]