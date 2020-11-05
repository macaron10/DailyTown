from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from .serializers import ItemCategoryCreateSerializer, ItemCategoryListSerializer, ItemListSerializer
from .models import ItemCategory, Item

class Category(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = ItemCategory.objects.all()
        serializer = ItemCategoryListSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ItemCategoryCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Please Check name"}, status=status.HTTP_409_CONFLICT)
        serializer.save()
        print(serializer)
        return Response({"message": f"new Item Category '{request.data['name']}' was created"}, status=status.HTTP_201_CREATED)

class item(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = Item.objects.all()
        serializer = ItemListSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ItemCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Please Check Item's Context"}, status=status.HTTP_409_CONFLICT)
    

class ItemDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        items = Item