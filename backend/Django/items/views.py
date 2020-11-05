from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Item as ItemModel, ItemCategory
from .serializers import ItemCategorySerializer, ItemSerializer

class Category(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        categories = ItemCategory.objects.all()
        print(categories)
        serializer = ItemCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ItemCategorySerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Please Check name"}, status=status.HTTP_409_CONFLICT)
        serializer.save()
        return Response({"message": f"new Item Category '{request.data['name']}' was created"}, status=status.HTTP_201_CREATED)

class Item(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        items = ItemModel.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Please Check Item's Context"}, status=status.HTTP_409_CONFLICT)
        serializer.save()
        return Response({"message": f"new Item '{request.data['name']}' was created"}, status=status.HTTP_201_CREATED)
    

class ItemDetail(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, item_pk):
        item = get_object_or_404(ItemModel, pk=item_pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # def patch(self, request. item_pk):


    