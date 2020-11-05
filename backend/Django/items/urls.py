from django.urls import path
from . import views

urlpatterns = [
    path('', views.Item.as_view()),
    path('category/', views.Category.as_view()),
    path('<int:item_pk>/', views.ItemDetail.as_view()),
]