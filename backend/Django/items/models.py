from django.db import models
from django.conf import settings

class ItemCategory(models.Model):
    name = models.CharField(max_length=200)

class Item(models.Model):
    itemcategory = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    sell_price = models.IntegerField()
    buy_price = models.IntegerField()
    image_dir = models.TextField()
    isinshop = models.BooleanField(default=False)

class MyItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCASDE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    isinfarm = models.ForeingKey(default=False)
    location = models.IntegerField()