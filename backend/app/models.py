from django.db import models
from .serving import *

class MirModel(models.Model):
    word = models.CharField(max_length=200, blank=True)
    dfn = models.CharField(max_length=1000, blank=True)
    snt = models.CharField(max_length=1000, blank=True)
    qrc = models.CharField(max_length=1000, blank=True)
    curr = models.CharField(max_length=200, blank=True)
    usr_choice = models.CharField(max_length=200, blank=True)
    ytl = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.word, self.dfn

