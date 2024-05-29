from django.contrib import admin
from .models import *

class MIRAdmin(admin.ModelAdmin):
    list_display = ('id','word', 'dfn', 'snt', 'qrc', 'curr', 'ytl')

admin.site.register(MirModel, MIRAdmin)
