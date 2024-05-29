from rest_framework import serializers
from .models import *

class MirSerializer(serializers.ModelSerializer):
    class Meta:
        model = MirModel
        fields = ('id', 'word', 'dfn', 'snt', 'qrc', 'curr', 'usr_choice', 'ytl')

