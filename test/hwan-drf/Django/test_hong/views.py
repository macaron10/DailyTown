from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
# from .serializers import ImageSerializer
from .models import Post
from django.http import JsonResponse

from Keras_model.fruit_model import classification
from Keras_model.fruit_model.classification import qwnkld

# class PostViewSet(ModelViewSet):
# 	queryset = Post.objects.all()
# 	serializer_class = ImageSerializer
# 	print('check1234', queryset)
# 	print('check2345', serializer_class)

@api_view(['POST'])
def test(request):
	temp = {
		'test1': 1
	}
	print(request)
	print(request.data)
	# print(request.data['image'])
	print(request.FILES)
	print(request.FILES['image'])
	# qwnkld(request.FILES['image'])
	qwnkld(request)
	return JsonResponse(temp)