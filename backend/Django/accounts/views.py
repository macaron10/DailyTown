from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .serializers import UserCreateSerializer, UserLoginSerializer, UserSerializer, MyItemSerializer, MyMissionSerializer
from .models import User, MyItem as MyItemModel, MyMission as MyMissionModel
from items.models import Item as ItemModel
from missions.models import Mission as MissionModel

@api_view(['POST', 'GET'])
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

            # 가입하면 바로 미션 3개를 추가하는 로직을 짜야하는데
            # 미션 목록과 아이템 목록이 나오지 않아서
            # 해당 로직을 못 짜고 잇읍니다.

            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)
    else:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

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
        n = int(request.data['quantity'])
        loc = int(request.data['location'])
        item_info = get_object_or_404(ItemModel, pk=int(request.data['item']))
        for i in range(n):
            serializer = MyItemSerializer(data=request.data)
            if not serializer.is_valid(raise_exception=True):
                return Response({"message": "Please Check Item's Contex"})
            serializer.save(user=request.user, location=loc+i, item=item_info, quantity=1)
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
        
        # import random

        # print('helllllllllllllllllllo')
        # users = User.objects.all()
        # missions = MissionModel.objects.all()
        # items = ItemModel.objects.all()

        # for n in range(len(users)):  # 해당 유저가 가지고있는 미션 3개를 삭제
        #     ownmission = MyMissionModel.objects.filter(user=users[n])
        #     for j in range(len(ownmission)):
        #         ownmission[j].delete()

        #     mission_pk_list = random.sample(range(1, len(missions)+1), 3)
        #     item_pk_list = random.sample(range(1, len(items)+1), 3)

        #     for j in range(3):
        #         mission_info = get_object_or_404(MissionModel, pk=mission_pk_list[j])
        #         item_info = get_object_or_404(ItemModel, pk=item_pk_list[j])
        #         tmp = { "iscleared": False }
        #         serializer = MyMissionSerializer(data=tmp)
        #         if not serializer.is_valid(raise_exception=True):
        #             return Response({"message": "Failure at Automatically update Mission"})
        #         serializer.save(user=users[n], mission=mission_info, item=item_info)
        
        # print("Daily Mission Update was done")

        mymissions = MyMissionModel.objects.filter(user=request.user)
        serializer = MyMissionSerializer(mymissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        item_info = get_object_or_404(ItemModel, pk=int(request.data['item']))
        mission_info = get_object_or_404(MissionModel, pk=int(request.data['mission']))
        serializer = MyMissionSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "please check my mission's context"})
        serializer.save(user=request.user, mission=mission_info, item=item_info)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MyMissionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, mymission_pk):
        mymission = get_object_or_404(MyMissionModel, pk=mymission_pk)
        serializer = MyMissionSerializer(mymission)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, mymission_pk):
        mymission = get_object_or_404(MyMissionModel, pk=mymission_pk)
        serializer = MyMissionSerializer(mymission, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Please Check mission's context"})
    
    def delete(self, request, mymission_pk):
        mymission = get_object_or_404(MyMissionModel, pk=mymission_pk)
        mymission.delete()
        return Response({"message": "Successfully delete mission"}, status=status.HTTP_200_OK)

class Exchange(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        item1 = get_object_or_404(MyItemModel, pk=int(request.data['item_id1']))
        item2 = get_object_or_404(MyItemModel, pk=int(request.data['item_id2']))
        
        loc1 = item1.location
        loc2 = item2.location

        item1.location = loc2
        item1.save()
        item2.location = loc1
        item2.save()

        return Response({"message": "two item's location was exchanged"}, status=status.HTTP_200_OK)