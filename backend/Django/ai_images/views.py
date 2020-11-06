from rest_framework.decorators import api_view
from django.http import JsonResponse

from .Keras_model.fruit_model import classification
from .Keras_model.fruit_model.classification import qwnkld

@api_view(['POST'])
def predict(request):
	result = {
		'ans': False
	}
	# category == 물건의 종류, title == 물건의 detail
	keyword = request.data['category']
	target = request.data['title']

	# 물건 종류에 따라 if문 model 분기
	if keyword == 'fruit':
		result['ans'] = qwnkld(request, target)

	# test용 print문.
	# print(request)
	# print(request.data)
	# print(request.FILES)
	# print(request.FILES['image'])
	# qwnkld(request.FILES['image'])
	return JsonResponse(result)