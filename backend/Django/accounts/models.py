from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionMixin
from django.db import models

class UserManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, email, password, is_superuser, name):
        user = self.model(
            email = self.normalize_email(email),
            name = name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(
            email = self.nomalize_email(email),
            name = name,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser, PermissionMixin):
    objects = UserManager()
    email = models.EmailField(max_length=255, null=False, unique=True)
    name = models.CharField(max_length=20, null=False)
    is_active = models.BooleanField(default=True)  # Django 유저모델 필수요소
    is_admin = models.BooleanField(default=False)  # Django 유저모델 필수요소
    is_superuser = models.BooleanField(default=False)
    signupdate = models.DateTimeField(auto_now_add=True)
    gold = models.IntegerField(default=0),  # 사용자가 가진 돈
    farm_theme = models.IntegerField(default=1)  # 사용자가 가진 농장의 테마 // 추후 업데이트 요소임
    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['email', 'name']
    


