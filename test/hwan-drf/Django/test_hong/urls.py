from django.urls import path, include
import views

app_name = 'test_hong'

urlpatterns = [
   path('test/', views.test),
]