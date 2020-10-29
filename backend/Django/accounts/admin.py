from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'signupdate'
    )

    list_display_links = (
        'name',
        'email'
    )