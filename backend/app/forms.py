from django import forms
from . import models

# class CreatePost(forms.ModelForm):
#     class Meta: 
#         model = models.React
#         fields = ['word']

class UsrInputForm(forms.ModelForm):
        model = models.MirModel
        fields = ['word']

# class UsrInputForm(forms.Form):
#     word = forms.CharField(label="Enter word(s) here:", max_length=100)

