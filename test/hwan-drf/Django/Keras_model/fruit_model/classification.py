import keras
import cv2
import numpy as np 

def qwnkld(request):
  # print('filename', file, type(file))
  reconstructed_model = keras.models.load_model("/code/Keras_model/fruit_model/fruit_model")
  # reconstructed_model = keras.models.load_model("./fruit_model")
  
  # reconstructed_model.predict('banana.jpeg')
  shape = (200, 200)
  
  # img = cv2.imread('/code/Keras_model/fruit_model/banana.jpeg')
  # img = cv2.imread(file)
  img = cv2.imdecode(np.fromstring(request.FILES['image'].read(), np.uint8), cv2.IMREAD_COLOR)
  # img = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
  # img = cv2.imdecode(file.read(), cv2.IMREAD_UNCHANGED)
  # img.imshow()
  img = cv2.resize(img,shape)
  fruits = ['사과', '바나나', 'mixed', '오렌지']
  img = np.array([img])
  print(img.shape)
  print(reconstructed_model.predict(img))
  predict = reconstructed_model.predict(img)
  print('predict=', predict)
  output = { 0:'apple',1:'banana',2:'mixed',3:'orange'}
  print("Predicted :- ",output[np.argmax(predict)])
  return output[np.argmax(predict)]