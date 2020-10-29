from django.db import models
from django.conf import settings

class ItemCategory(models.Model):
    name = models.CharField(max_length=200)

class Item(models.Model):
    ItemCategory = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    sell_price = models.IntegerField()
    buy_price = models.IntegerField()
    image_dir = models.TextField()
    isInShopw = models.BooleanField()

class MyItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCASDE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    isInFarm = models.ForeingKey()
    location = models.IntegerField()