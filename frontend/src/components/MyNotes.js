
// const [ytl, setYtl] = useState("");
// var ytField = new FormData();

//  const YtAPICall = useCallback(async () => {
//     await axios ({
//       method: 'post',
//       url: 'http://127.0.0.1:8000/ytl/',
//       data: ytField
//     }).then((response) => {
//       setYtl([...ytl, response.data]);
//       setPlay([...play, response.data]);
//       console.log("play:", response.data);
      
//     }).catch(error => {
//       console.log(error.response.data.error)
//    })
//   }, [ytl, ytField]);

      // console.log(curr);
    // ytField.append('curr', curr);
    // ytField.append('usr_choice', usr_choice);
    // YtAPICall(ytl, ytField);


// def get_ytl(qts, qrc, usr_choice):
//     # IDENTIFY EPISODE/TRUE QUOTE SOURCE
//     site = 'https://www.google.com/search?q='
//     q = qts[usr_choice][0].replace(' ','+').replace(',','%2C') # Danger Mouse qts[1]; usr_choice_origin = 1
//     query = q[q.find(']')+1:] + '+"imdb"' + '"+quotes"'
//     url = site + query
//     s = search_soup('str', url)

//     hld = [m.start() for m in re.finditer('imdb.com/', s)][:10]
//     st = hld[1]
//     temp = s[st:]
    // e = temp.find('quotes/') + len('quotes/')
    // url = 'https://www.' + s[st:st+e].replace('%3F','?').replace('%3D','=')

    // # QUOTE SOURCE AS STR
    // s = search_soup('str', url)
    // p = s[s.find('title'):]
    // det = p[p.find('>')+len('>'):p.find(' - Quotes')]
    // det = det[:det.find(' (')]

//     # YOUTUBE SEARCH & CLIP FINDER
//     site = 'https://www.youtube.com/results?search_query='
//     nme = qrc[usr_choice][:qrc[usr_choice].find('[')] # Danger Mouse title plus episode name
//     det = nme + det 
//     query = det.replace(' ','+').replace(',','%2C').replace("'",'%27s')
//     url = site + query
//     s = search_soup('str', url)

//     # RETRIEVE YOUTUBE URL
//     hld = [m.start() for m in re.finditer('watch\?v=', s)]
//     st = hld[0]
//     temp = s[st:]
//     e = temp.find('\\')
//     trl = s[st:st+e]
//     trl = trl[len('watch?v='):]

//     # RETRIEVE VIDEO TRANSCRIPT
//     tmtr = YouTubeTranscriptApi.get_transcript(trl)

//     # PINPOINT TIMESTAMP FOR QUOTE
//     d0 = 0
//     tell = -1
//     base = qts[usr_choice][0][qts[usr_choice][0].find(': ') + len(': '):]
//     for i,t in enumerate(tmtr):
//         dist = jellyfish.jaro_similarity(base, t['text'])
//         if dist > d0:
//             d0 = dist
//             tell = i

//     #GET EMBEDDING URL
//     ytl = 'https://www.youtube.com/embed/'
//     tsp = '?start=' + str(int(tmtr[tell]['start'])) + \
//             '&end=' + str(int(tmtr[tell+len(qts[usr_choice])+2]['start']))
//     yt_url = ytl + trl + tsp

//     return yt_url


let option_map = document.getElementsByClassName("qrc_option").attributes;
ret.map((item, i) =>
  i === index ? (
    document.getElementsByClassName("car-item").attributes.item(2).nodeValue = i,
    document.getElementById("dfn").innerHTML = item[0],
    document.getElementById("snt").innerHTML = item[1],
    item[2][0].map((qrc,k) => {
      option_map.item(2).nodeValue = k
      option_map.item(3).nodeValue = item[3][0][k]
      document.getElementsByClassName("qrc_option").innerHTML = qrc
    }
  )) : null
)




let trr = []
let temp = Array.from(new Set(word.split(",")))
for (let t of temp) {
  if (arr.indexOf(t)===-1) {
    trr.push(t)
  }}
trr = trr.join(",")
setWord(trr)
setArr(...arr, trr.split(","))
formField.set('word', word)
MakeAPICall(ret,formField)



// import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React from 'react';
import { useState, useCallback, useEffect } from 'react';



// class AddWord extends React.Component {
export default function AddWord() {
  const [word, setWord] = useState("");
  const [ret, setRet] = useState([]);
  const [ready, setReady] = useState(false);
  const [arr, setArr] = useState([]);
  var formField = new FormData();
  const [test, setTest] = useState("");

  const MakeAPICall = useCallback(async () => {
    await axios ({
      method: 'post',
      url: 'http://127.0.0.1:8000/',
      data: formField
    }).then((response) => {
      setRet(...ret, response.data)
      setReady(true) 
    })
  }, [ret,formField])

  
    const HandleClick = asyn(word) => {
      // setTest(word.split(","))
      if (word.split(",")=== undefined)
      useEffect((word) => {
        let trr = []
        let temp = Array.from(new Set(word.split(",")))
        for (let t of temp) {
          if (arr.indexOf(t)===-1) {
            trr.push(t)
          }
        }
        trr = trr.join(",")
        setWord(trr)
        setArr(...arr, trr.split(","))
        formField.set('word', word)
        MakeAPICall(ret,formField)
        
        if (ready) {
          document.getElementById("dfn").innerHTML = ret[0];
          document.getElementById("snt").innerHTML = ret[1];
          document.getElementById("qrc").innerHTML = ret[2];
        }
  }, [word]);
}

// const CleanWord = (word) => {
//   if (o===-1) {
//     setTest(word)
//     o+=1
//   }
//   // splice
//   // setWord(...word, word)
// }


  return (
    <div className="container">
        <div className="form-gr">
            <div className="form-ctrl">
                <label>Add words</label>
                <input 
                    id="word"
                    type="textarea"
                    className="form-ctrl form-ctrl-lg"
                    name="word"
                    value={word}
                    placeholder="Enter word(s) here"
                    onChange={(e) => setWord(e.target.value)} />
            </div>
                <button id="submit" className="submit" onClick={HandleClick(word)}>Submit</button>
        </div>
        <div>
         
          {/* <Carousel> // outs is an array // HandleClick(word) // pithy,ersatz,ersatz
            {this.outs.map(out => (
            <Carousel.Out>
              <img
                className="d-block w-100"
                src={out.src}
                alt={out.alt}
              />
              <Carousel.Caption>
                <h3>{out.captionTitle}</h3>
                <p>{out.caption}</p>
              </Carousel.Caption>
            </Carousel.Out>
            )} */}
          {/* </Carousel> */} 
          <h2 name="testy">{test.split(",")}</h2>
          <h2 name="word">{word}</h2>
          <h2 name="dfn">Definition:</h2>
            <p id="dfn"placeholder="" />
          <h2 name="snt">Sentence:</h2>
            <p id="snt" placeholder=""/>
          <h2 name="qrc">Choose your quote source and you video will appear:</h2>
            <p id="qrc" placeholder=""/>
          
        </div>
    </div>
  )
};
// export default withRouter(AddWord);