from rest_framework.serializers import ModelSerializer
from mytig.models import InfoProduit

class InfoProduitSerializer(ModelSerializer):
    class Meta:
        model = InfoProduit
        fields = ('tigID', 'name', 'category', 'price', 'unit', 'price_on_sale',
                'availability', 'sale', 'discount', 'comments', 'owner', 'quantity_stock', 'quantity_sold')
        extra_kwargs = {
            'tigID': {'read_only': False},
        }
