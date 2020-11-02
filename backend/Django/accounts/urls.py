from django.urls import path
from . import views
from .views import current_user, UserList
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token


app_name = 'myaccount'

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('validate/', views.validate_jwt_token),
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    path('create/', UserList.as_view()),
]