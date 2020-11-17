from django.shortcuts import render
import random

# Create your views here.
def index(request):
  return render(request, 'pages/index.html')

def hello(request):
  pick = random.sample(range(1, 46), 6)
  return render(request, 'pages/hello.html', context={
    'pick': pick,
  })

def iam(request):
  return render(request, 'pages/iam.html')

def lunch(request):
  return render(request, 'pages/lunch.html')

def hi(request, name):
  return render(request, 'pages/hi.html', context={
    'name': name,
  })

def add(request, prev, next):
  return render(request, 'pages/add.html', context={
    'result': prev+next,
  })
def posts(request, id):
  content = 'life is short, you need python'
  replies = ['111', '222', '333']
  no_replies = []
  user = 'admin'
  context = {
    'id': id,
    'content': content,
    'replies': replies,
    'no_replies': no_replies,
    'user': user,
  }
  return render(request, 'pages/posts.html', context)