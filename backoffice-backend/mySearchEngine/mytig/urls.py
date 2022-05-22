from django.urls import path, register_converter

from mytig import views
from mytig import converters

register_converter(converters.FloatConverter, 'float')

urlpatterns = [
    path('products/', views.ProduitInfo.as_view()),
    path('product/<int:pk>/', views.ProduitInfoDetail.as_view()),
    path('incrementStock/<int:pk>/<int:number>/', views.IncrementDetail.as_view()),
    path('decrementStock/<int:pk>/<int:number>/', views.DecrementDetail.as_view()),
]
