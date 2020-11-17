from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request, 'boards/index.html')

def new(request):
  return render(request, 'boards/new.html')

def complete(request):
  # print(request.GET)
  # GET /boards/complete/?title=asd&content=asda
  # 입력값을 가져올 수 있다.
  title = request.GET.get('title')
  content = request.GET.get('content')
  context = {
    'title': title,
    'content': content,
  }
  return render(request, 'boards/complete.html', context)