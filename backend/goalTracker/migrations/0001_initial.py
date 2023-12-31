# Generated by Django 4.2.7 on 2023-11-10 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GoalNode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=500)),
                ('Description', models.CharField(max_length=1000)),
                ('Motivation', models.CharField(max_length=5000)),
                ('Subtask', models.CharField(max_length=1000)),
                ('Status', models.CharField(max_length=50)),
                ('GoalId', models.IntegerField()),
                ('X', models.IntegerField()),
                ('Y', models.IntegerField()),
                ('Height', models.IntegerField()),
                ('Width', models.IntegerField()),
                ('CreatedAt', models.DateField(auto_now_add=True)),
                ('StartedAt', models.DateField()),
                ('ToStartAt', models.DateField()),
                ('CompletedAt', models.DateField()),
            ],
        ),
    ]
