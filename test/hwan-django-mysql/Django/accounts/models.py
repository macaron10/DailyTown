from django.db import models
from domino.models import Pizza
# Pizza = apps.get_model('domino', 'Pizza')

# Create your models here.
class price(models.Model):
  name = models.CharField(max_length=30)
  # piz = models.ForeignKey('Pizza')
  product = models.ForeignKey(Pizza, on_delete=models.CASCADE)