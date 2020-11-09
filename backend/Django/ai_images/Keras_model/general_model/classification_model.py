import keras
import cv2
import numpy as np 

def check_general(request, target):
  # import 학습 model
  reconstructed_model = keras.models.load_model("/code/ai_images/Keras_model/general_model/general.h5")
  
  # request에서 들어온 image 변환, 사이즈 input에 맞게 변환
  img = cv2.imdecode(np.fromstring(request.FILES['image'].read(), np.uint8), cv2.IMREAD_COLOR)
  shape = (32, 32)
  img = cv2.resize(img,shape)
  img = np.array([img])
  img = img.astype('float32')/255
  # 결과값 바탕으로 T/F 반환
  output = { 0:'car', 1:'cat', 2:'dog', 3:'flower', 4:'motorbike', 5:'person'}
  predict = (reconstructed_model.predict(img) > 0.5).astype("int32")
  
  return output[np.argmax(predict[0])] == target