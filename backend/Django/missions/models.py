from django.db import models
from djagno.conf import settings
from Django.items import Item

# Create your models here.

class MissionCategory(models.Model):
    name = models.CharField(max_length=200)

class Mission(models.Model):
    mission_category = models.ForeignKey(MissionCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()

class MyMission(models.Model):
    missioon = models.ForeignKey(Mission, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCASDE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    iscleared = models.BooleanField(default=False)