# MakeItRelevant
### (word --> relevance)

MakeItRelevant is a project that takes a word as input and outputs the definition, a sample sentence, user-choice of TV show/movie quote, and accompanying video clip. It employs web-scraping on the backend with Django and rendering the server output as React components on the frontend (connected via axios). 

_Libraries_: rest_framework, django, react, axios, useState, useCallback, fake_useragent, bs4, urllib.request, youtube_transcript_api, pytube, PyPDF2 import PdfReader, jellyfish, io, re

# Usage

react:
  - npm start --> http://10.0.0.81:3000

django: 
  - python3 manage.py runserver --> http://127.0.0.1:8000


Type in a vocab word and MakeItRelevant will give you the definition, a sample sentence, your choice of TV show/movie quote and a clip of the quote in action. 

It’s made for students of all ages (including prospective grad students) who need to study uncommon vocabulary for standardized tests. Since it’s easier to remember vocab when you have context for the word, using mainstream media sources we’re familiar with (like TV shows/movies) facilitates memorization.

Unlike other platforms, MakeItRelevant is tailored for studying vocabulary with not just the definition and a sentence, but also the user’s choice of pop culture references all in one place. And it’s free (student-friendly)!

As a visual learner studying for the GRE, I’ll definitely be using MakeItRelevant myself.

# Challenges
- web-scraping video clips of the quote sources was tricky due to copyright restrictions
- used YouTube as the main source of clip-scraping but having access to a vast library of downloaded videos would’ve been more fruitful yet, less cost-effective
- difficult to map user-choice to video scraper —> wait time for video scraper is too long (until I improve my approach) 
