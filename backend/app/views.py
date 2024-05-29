from rest_framework.views import APIView
from .models import MirModel
from .serializers import *
from rest_framework.response import Response
from rest_framework import viewsets
from .serving import *
from rest_framework.decorators import api_view, renderer_classes
from django.http import *
from django import forms
from .forms import *



class MirView(APIView):
    serializer_class = MirSerializer
    queryset = MirModel.objects.all()

    def get(self, request):
        out =  self.request.GET.get("word")
        return Response(out)
    
    def post(self, request):
        serializer = MirSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            wrd = serializer.data["word"].split()[0]
            dfn = [get_dfn(wrd)]
            snt = [get_snt(wrd)]
            qrc, qte = get_qts(wrd)    
            ytl = []
            for y in range(len(qrc)):
                try:
                    src = get_ytl(qte, qrc, y, wrd)
                    # print(src)
                    ytl.append(src)
                    
                except:
                    ytl.append("Sorry, couldn't webscrape this video.")
            return Response((wrd,dfn,snt,[qrc],[qte],ytl))


class Post_Ytl(APIView):
    serializer_class = MirSerializer
    queryset = MirModel.objects.all()

    def get(self, request):
        qrc = self.request.GET.get("qrc")
        qts = self.request.GET.get("qts")
        usr_choice = self.request.GET.get("usr_choice")
        return Response(qrc, qts, usr_choice)

    def post(self, request):
        serializer = MirSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            curr = serializer.data["curr"].split()[0]
            qrc, qts = get_qts(curr)
            ytl = []
            for y in range(len(qrc)):
                try:
                    src = get_ytl(qts, qrc, y, curr)
                    # print(src)
                    ytl.append(src)
                    
                except:
                    ytl.append("Sorry, couldn't webscrape this video.")
            return Response((ytl))