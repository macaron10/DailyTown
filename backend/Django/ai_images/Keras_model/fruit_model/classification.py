import keras
import cv2
import numpy as np 

reconstructed_model = keras.models.load_model("/code/ai_images/Keras_model/fruit_model/fruit_model")

def check_fruit(request, target):
  # import 학습 model
  
  # request에서 들어온 image 변환, 사이즈 input에 맞게 변환
  img = cv2.imdecode(np.fromstring(request.FILES['image'].read(), np.uint8), cv2.IMREAD_COLOR)
  shape = (200, 200)
  img = cv2.resize(img,shape)
  img = np.array([img])
  
  # 결과값 바탕으로 T/F 반환
  output = { 0:'apple',1:'banana',2:'mixed',3:'orange'}
  predict = reconstructed_model.predict(img)
  print('target:', target)
  print('real:', output[np.argmax(predict)])
  return output[np.argmax(predict)] == target