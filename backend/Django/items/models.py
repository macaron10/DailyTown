from django.db import models

class ItemCategory(models.Model):
    name = models.CharField(max_length=200)

class Item(models.Model):
    itemcategory = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    sell_price = models.IntegerField()
    buy_price = models.IntegerField()
    image_dir = models.TextField()
    isinshop = models.BooleanField(default=False)

                                                                                                                                     