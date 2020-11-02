from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from items.models import Item
from missions.models import Mission

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    use_in_migrations = True

    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('The Email must be required')
        
        user = self.model(
            email = self.normalize_email(email),
            name = name
            )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(
            email = self.normalize_email(email),
            name = name,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    objects = UserManager()
    email = models.EmailField(max_length=255, null=False, unique=True)
    username = models.CharField(max_length=20)
    signupdate = models.DateTimeField(auto_now_add=True)
    gold = models.IntegerField(default=0),  # 사용자가 가진 돈
    farm_theme = models.IntegerField(default=1)  # 사용자가 가진 농장의 테마 // 추후 업데이트 요소임

    is_active = models.BooleanField(default=True)  # Django 유저모델 필수요소
    is_admin = models.BooleanField(default=False)  # Django 유저모델 필수요소
    is_superuser = models.BooleanField(default=False)  # Django 유저모델 필수요소
    is_staff = models.BooleanField(default=False)  # Django 유저모델 필수요소
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

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