from fake_useragent import UserAgent
from bs4 import BeautifulSoup 
from urllib.request import Request, urlopen
from youtube_transcript_api import YouTubeTranscriptApi
from pytube import YouTube
from PyPDF2 import PdfReader
import jellyfish
import io
import re

word = ''

# class ServesIt(word):
ua = UserAgent()

def search_soup(str_or_txt, url):
    headers = {'User-Agent': ua.random}
    req = Request(url, headers = headers)
    html = urlopen(req).read()
    soup = BeautifulSoup(html) 
    if str_or_txt == 'str':
        s = str(soup)
    elif str_or_txt == 'txt':
        s = soup.get_text()
    return s

# GET_TEXT: DEFINITION SOUP
def get_dict(word):
    ddm = 'https://www.yourdictionary.com/'
    url = ddm + word
    dictionary = search_soup('txt', url)
    return dictionary

# GET_TEXT: QUOTE SOUP
def get_quote(word):
    qdm = 'https://www.quotes.net/serp.php?st='
    url = qdm + word + '&qtype=2'
    quote = search_soup('txt', url)
    return quote

# RETRIEVE DEFINITION
def get_dfn(word):
    dictionary = get_dict(word)
    fn = 'Definition Source'
    start = dictionary.find(fn)
    end = start + dictionary[start:].find('.')
    dfn = dictionary[start+len(fn)+1:end+1]
    start = len(dfn) - dfn[::-1].find('\n')  + 1
    dfn = dfn[start:]
    return dfn

# RETRIEVE SAMPLE SENTENCE
def get_snt(word):
    dictionary = get_dict(word)
    fn = 'Sentence Examples\n'
    start = dictionary.find(fn)
    end = start + dictionary[start:].find('.')
    snt = dictionary[start+len(fn)+1:end+1]
    start = snt.find(next(filter(str.isalpha, snt)))
    snt = snt[start:]
    return snt

# RETRIEVE QUOTE SOURCE --> USER CHOOSES QUOTE SOURCE
def get_qts(word):
    quote = get_quote(word)
    fn = 'Rate it:– '
    q = [q.start()+len(fn) for q in re.finditer(fn, quote)]
    e = [quote[u:].find(']')+u+1 for u in q]
    qrc = [quote[q[i]:e[i]] for i in range(len(q))]

    # RETRIEVE ALL QUOTES
    fn0 = 'Rate it:– '
    fn = 'RelevancyExact Match:YesNo'
    st = quote.find(fn)
    tmp = quote[st:q[0]-len(fn0)]
    st = len(tmp) - tmp[::-1].find('\n')

    qts = [tmp[st:]] + \
        [quote[q[i] + len(qrc[i]):e[i+1] - len(qrc[i+1]) - len(fn0)] \
        for i in range(len(e) - 1)]

    for t in range(len(qts)):
        qt = qts[t]
        qt = re.sub(r'(\w)((?:[?.!\]])+)(\w)', r'\1\2\n\3', qt)
        qts[t] = qt.split('\n')
        
    return qrc, qts


def get_ytl(qts, qrc, usr_choice, wrd):
    def strip_html(data):
        p = re.compile(r'<.*?>')
        temp = p.sub('', data)
        p = re.compile(r'\n')
        temp = p.sub('', temp)
        return temp
    
    # IDENTIFY EPISODE/TRUE QUOTE SOURCE
    site = 'https://www.google.com/search?q='
    q = qts[usr_choice][0].replace(' ','+').replace(',','%2C') # Danger Mouse qts[1]; usr_choice_origin = 1
    query = q[q.find(']')+1:] + '+"imdb"' + '"+quotes"'
    url = site + strip_html(query)
    s = search_soup('str', url)
    
    htp = re.findall(r'(https?://[^\s]+)', s)
    try:
        htp = [h for h in htp if h.find('imdb.com/title')!=-1]
        t = htp[0].find('/title/') + len('/title/')
        htp = htp[0][:htp[0][t:].find('/')+1+t] + 'quotes'
        url = htp

        print(usr_choice,url)

        # # QUOTE SOURCE AS STR
        s = search_soup('str', url)
        p = s[s.find('title'):]
        det = p[p.find('>')+len('>'):p.find(' - Quotes')]
        det = det[:det.find(' (')]

        # YOUTUBE SEARCH & CLIP FINDER
        site = 'https://www.youtube.com/results?search_query='
        nme = ' ' + qrc[usr_choice][:qrc[usr_choice].find('[')] # Danger Mouse title plus episode name
        det = word + " " + det.replace('"','') 
        det = det + [nme if det.find(nme)==-1 else ''][0] # + det 
        query = det.replace(' ','+').replace(',','%2C').replace("'",'%27s')
        url = site + query
        s = search_soup('str', url)

    # RETRIEVE YOUTUBE URL
        def get_tmtr(ch,s):
            hld = [m.start() for m in re.finditer('watch\?v=', s)]
            st = hld[ch]
            temp = s[st:]
            e = temp.find('\\')
            trl = s[st:st+e]
            trl = trl[len('watch?v='):]
            return trl

        # RETRIEVE VIDEO TRANSCRIPT
        def recur_ytscript(s, itr):
            if itr == 6:  # base case
                return 'Whoops! Couldn\'t find a video source for this quote :/',''
            try:
                trl = get_tmtr(itr,s)
                tmtr = YouTubeTranscriptApi.get_transcript(trl)
                return trl,tmtr
            except:
                itr+=1
                return recur_ytscript(s, itr)

        itr = 0
        trl,tmtr = recur_ytscript(s,itr)

        # PINPOINT TIMESTAMP FOR QUOTE
        d0 = 0
        tell = -1
        fn = [i for i in range(len(qts[usr_choice])) \
                if qts[usr_choice][i].find(wrd)!=-1][0]
        base = qts[usr_choice][fn]
        tmp = base[:base.find(word)][::-1].find('.')
        base = base[max([base.find(': ')+len(': '),tmp]):].split('.')[0]
        for i,t in enumerate(tmtr):
            dist = jellyfish.jaro_similarity(base, t['text'])
            bewl = len(t['text'].split()) > 3
            if bewl and dist > d0:
                d0 = dist
                tell = i

        #GET EMBEDDING URL
        ytl = 'https://www.youtube.com/embed/'
        tsp = '?start=' + str(int(tmtr[tell]['start']-1)) + \
                '&end=' + str(int(tmtr[tell+len(qts[usr_choice])+2]['start']))
        yt_url = ytl + trl + tsp
        print(yt_url)
    except:
        yt_url = 'Whoops! Couldn\'t find a video reference for ',\
              qrc[usr_choice]
        print(yt_url)

    return [yt_url]
