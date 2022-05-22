from django.db import models

class InfoProduit(models.Model):
    tigID = models.AutoField(primary_key=True)
    name = models.TextField(max_length=255, default='-1')
    category = models.IntegerField(default='-1')
    price = models.FloatField(default='-1.0')
    unit = models.TextField(max_length=255, default='-1')
    availability = models.BooleanField(default=False)
    sale = models.BooleanField(default=False)
    discount = models.FloatField(default='-1.0')
    comments = models.TextField(max_length=255, default='-1')
    owner = models.TextField(max_length=255, default='-1')
    quantity_stock = models.IntegerField(default='-1')
    quantity_sold = models.IntegerField(default='-1')
    price_on_sale =  models.FloatField(default='-1.0')

    class Meta:
        ordering = ('tigID',)

