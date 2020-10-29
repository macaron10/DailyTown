from django.db import models

class Topping(models.Model):
  name = models.CharField(max_length=30)

class Pizza(models.Model):
  toppings = models.ManyToManyField(Topping)

class Mission(models.Model):
  name = models.CharField(max_length=30)
  content = models.CharField(max_length=30)

class User(models.Model):
  name = models.CharField(max_length=30)
  money = models.IntegerField()
  theme = models.IntegerField()
  Missions = models.ManyToManyField(Mission, through='MyMissions')

class Item(models.Model):
  name = models.CharField(max_length=30)
  sell_price = models.IntegerField()
  buy_price = models.IntegerField()

class MyMissions(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
  item = models.ForeignKey(Item, on_delete=models.CASCADE)
  isCleared = models.BooleanField()