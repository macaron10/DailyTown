from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from items.models import Item
from missions.models import Mission

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, name, **extra_fields):
        if not email:
            raise ValueError('The Email must be required')
        email = self.nomalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, name):
        extra_fields.setdefault('is_staff', True),
        extra_fields.setdefault('is_superuser', True),
        extra_fields.setdefault('is_active', True),

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Super User must is_staff == True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Super User must is_superuser == True')
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    objects = UserManager()
    email = models.EmailField(max_length=255, null=False, unique=True)
    name = models.CharField(max_length=20, null=False)
    is_active = models.BooleanField(default=True)  # Django 유저모델 필수요소
    is_admin = models.BooleanField(default=False)  # Django 유저모델 필수요소
    is_superuser = models.BooleanField(default=False)
    signupdate = models.DateTimeField(auto_now_add=True)
    gold = models.IntegerField(default=0),  # 사용자가 가진 돈
    farm_theme = models.IntegerField(default=1)  # 사용자가 가진 농장의 테마 // 추후 업데이트 요소임
    # USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['email', 'name'],
    myitems = models.ManyToManyField(Item, through='MyItem')
    mymissions = models.ManyToManyField(Mission, through='MyMission')
    

class MyItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isinfarm = models.BooleanField(default=False)
    location = models.IntegerField()

class MyMission(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    iscleared = models.BooleanField(default=False)