import requests
from django.http import Http404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl

from mytig.models import InfoProduit
from mytig.serializers import InfoProduitSerializer

class ProduitInfo(APIView):
    def get(self, request, format=None):
        products = InfoProduit.objects.all()
        serializer = InfoProduitSerializer(products,many=True)
        return Response(serializer.data)


class ProduitInfoDetail(APIView):
    def get_object(self, pk):
        try:
            return InfoProduit.objects.get(tigID=pk)
        except InfoProduit.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        response = requests.get(baseUrl+'product/'+str(pk)+'/')
        jsondata = response.json()
        jsondata.update({"discount": InfoProduit.objects.get(tigID=pk).discount})
        jsondata.update({"price_on_sale": InfoProduit.objects.get(tigID=pk).price_on_sale})
        jsondata.update({"quantity_stock": InfoProduit.objects.get(tigID=pk).quantity_stock})
        jsondata.update({"quantity_sold": InfoProduit.objects.get(tigID=pk).quantity_sold})
        return Response(jsondata)
    
    def put(self, request, pk, format=None):
        serializer = InfoProduitSerializer(InfoProduit.objects.get(tigID=pk), data=request.data)
        if serializer.is_valid():
            jsondata = serializer.validated_data
            jsondata.update({"discount": request.data['discount']})
            jsondata.update({"price_on_sale": request.data['price'] * (100 - request.data['discount']) / 100})
            jsondata.update({"sale": request.data['sale']})
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class IncrementDetail(APIView):
    def get_object(self, pk):
        try:
            return InfoProduit.objects.get(tigID=pk)
        except InfoProduit.DoesNotExist:
            raise Http404

    def get(self, request, pk, number, format=None):
        response = requests.get(baseUrl+'product/'+str(pk)+'/')
        jsondata = response.json()
        jsondata.update({"quantity_stock ": InfoProduit.objects.get(tigID=pk).quantity_stock })
        return Response(jsondata)

    def put(self, request, pk, number, format=None):
        serializer = InfoProduitSerializer(InfoProduit.objects.get(tigID=pk), data=request.data)
        if serializer.is_valid():
            jsondata = serializer.validated_data
            jsondata.update({"quantity_stock": InfoProduit.objects.get(tigID=pk).quantity_stock + request.data['quantity_stock']})
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class DecrementDetail(APIView):
    def get_object(self, pk):
        try:
            return InfoProduit.objects.get(tigID=pk)
        except InfoProduit.DoesNotExist:
            raise Http404

    def get(self, request, pk, number, format=None):
        response = requests.get(baseUrl+'product/'+str(pk)+'/')
        jsondata = response.json()
        jsondata.update({"quantity_stock": Stock.objects.get(tigID=pk).quantity_stock})
        return Response(jsondata)

    def put(self, request, pk, number, format=None):
        serializer = InfoProduitSerializer(InfoProduit.objects.get(tigID=pk,), data=request.data)
        if serializer.is_valid():
            jsondata = serializer.validated_data
            jsondata.update({"quantity_sold":  request.data['quantity_sold']})
            jsondata.update({"quantity_stock": InfoProduit.objects.get(tigID=pk).quantity_stock - request.data['quantity_stock']})
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


