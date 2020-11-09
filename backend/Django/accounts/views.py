from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .serializers import UserCreateSerializer, UserLoginSerializer, MyItemSerializer, MyMissionSerializer
from .models import User, MyItem as MyItemModel, MyMission as MyMissionModel

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    '''
    create User
    /return => message : Success or Fail(Error)
    '''
    if request.method == 'POST':
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(email=serializer.validated_data['email']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    '''
    Login User
    /return => JWT Token in Success or message : Fail(Login Error)
    '''
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['email'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)

class Gold(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        '''
        get your(user's) gold
        /return => {gold : yourgold(int)}
        '''
        user = get_object_or_404(User, email=request.user.email)
        info = {'gold': user.gold}
        return Response(info, status=status.HTTP_200_OK)

    def patch(self, request):
        '''
        change your gold after calculating
        /return => {gold : yourgold(int, after calculating)}
        '''
        user = get_object_or_404(User, email=request.user.email)
        nowgold = user.gold
        user.gold = nowgold + int(request.data['price'])
        user.save()
        info = {'gold': user.gold}
        return Response(info, status=status.HTTP_200_OK)

class MyItem(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        '''
        get your(user's) Item list
        /return => your item's list
        '''
        myitems = MyItemModel.objects.filter(user=request.user)
        serializer = MyItemSerializer(myitems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        '''
        create your Item
        /return => message : Item's information or Fail Message
        '''
        serializer = MyItemSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Please Check Item's Context"}, status=status.HTTP_409_CONFLICT)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MyItemDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, item_pk):
        '''
        get your single item's information
        '''
        myitem = get_object_or_404(MyItemModel, pk=item_pk)
        serializer = MyItemSerializer(myitem)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, item_pk):
        '''
        update your item's information
        /return => Item's Information or Fail Message
        '''
        myitem = get_object_or_404(MyItemModel, pk=item_pk)
        serializer = MyItemSerializer(myitem, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Please Check Item's Context"}, status=status.HTTP_409_CONFLICT)

    def delete(self, request, item_pk):
        '''
        delete your item
        /return => Success or Fail
        '''
        myitem = get_object_or_404(MyItemModel, pk=item_pk)
        myitem.delete()
        return Response({"message": "Successfully delete item"}, status=status.HTTP_200_OK)

class MyMission(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        mymissions = MyMissionModel.objects.filter(user=request.user)
        serializer = MyMissionSerializer(mymissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = MyMissionSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "please check my mission's context"})
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


