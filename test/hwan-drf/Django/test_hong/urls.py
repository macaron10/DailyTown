from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register('image', views.PostViewSet)

app_name = 'test_hong'

urlpatterns = [
   # path('', include(router.urls)),
   path('test/', views.test),
]