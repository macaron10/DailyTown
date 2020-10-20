from django.urls import path
from . import views

urlpatterns = [
  path('index/', views.index),
  path('hello/', views.hello),
  path('iam/', views.iam),
  path('hi/<str:name>', views.hi),
  path('add/<int:prev>/<int:next>', views.add),
  path('lunch/', views.lunch),
  path('posts/<int:id>/', views.posts),
]
