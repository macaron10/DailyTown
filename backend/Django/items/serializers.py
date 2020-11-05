from rest_framework import serializers
from .models import ItemCategory, Item

class ItemCategoryCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        category = ItemCategory.objects.create(
            name = validated_data['name']
        )
        return category
    
    class Meta:
        model = ItemCategory
        fields = ['name']

class ItemCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ['id', 'name']

class ItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'