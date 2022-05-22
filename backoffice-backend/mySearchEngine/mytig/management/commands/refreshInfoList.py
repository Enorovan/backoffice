from django.core.management.base import BaseCommand
from mytig.models import InfoProduit
from mytig.serializers import InfoProduitSerializer
from mytig.config import baseUrl
import requests
import time


class Command(BaseCommand):
    help = 'Refresh the list of products.'

    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        InfoProduit.objects.all().delete()
        for product in jsondata:
            if product['id']:
                serializer = InfoProduitSerializer(data={
                    'tigID': str(product['id']),
                    'name': str(product['name']),
                    'category': str(product['category']),
                    'price': str(product['price']),
                    'unit': str(product['unit']),
                    'availability': str(product['availability']),
                    'sale': str(product['sale']),
                    'discount': str(product['discount']),
                    'comments': str(product['comments']),
                    'owner': str(product['owner']),
                    'quantity_stock': str('0'),
                    'quantity_sold': str('0'),
                    'price_on_sale': str('0'),
                })
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS(
                        '['+time.ctime()
                        + '] Successfully added product id="%s"' % product['id']
                        ))
        self.stdout.write('['+time.ctime()+'] Data refresh terminated.')
