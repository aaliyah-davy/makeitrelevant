// import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React from 'react';
import { useState, useCallback } from 'react';



export default function AddWord() {
  const [word, setWord] = useState('');
  const [ret, setRet] = useState([]);
  var formField = new FormData();
  const [curr, setCurr] = useState([]);
  const [usr, setUsr] = useState(0);

  const MakeAPICall = useCallback(async () => {
    await axios ({
      method: 'post',
      url: 'http://127.0.0.1:8000/',
      data: formField
    }).then((response) => {
      setRet([...ret, response.data])
      setCurr([...curr,response.data[0]])
    }).then((response) => console.log(ret))
  }, [ret,formField,curr]);

  const HandleClick = (word) => {
    formField.set('word', word)
    MakeAPICall(ret,formField)}

  const [index, setIndex] = useState(0);

  const onNext = () => {
    console.log(ret.length);

    if (index < ret.length - 1) {
      let idx = index + 1;
      setIndex(idx);
    } else {
      setIndex(0);
    }
  };

  const onPrev = () => {
    if (index > 0 && index < ret.length) {
      let idx = index - 1;
      setIndex(idx);
    } else {
      setIndex(ret.length - 1);
    }
  };

  function ToggleQuote() {
    var quo = document.getElementById("qrc_selector").value;
    document.getElementById("quo").innerHTML = quo.split(/,(?=[A-Z])/g).join("<br /><br />");
    var usr_choice = document.getElementById("qrc_selector").selectedIndex;
    usr_choice.addEventListener('change', function() {
      setUsr(this.value);
    }, false);
    var qrc = ret[0][3][0][usr_choice];
    document.getElementById("curr").innerHTML = curr;

  }

  return (
    <html>
        <head>
        <meta charSet="UTF-8" />
        <title>MakeItRelevant</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script> 
        <script src="https://www.npmjs.com/package/react-responsive-carousel"></script>
        <script type="text/javascript" id="www-widgetapi-script" src="https://www.youtube.com/s/player/3b96d06c/www-widgetapi.vflset/www-widgetapi.js" async=""></script>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://www.youtube.com/iframe_api"></script>
        </head>
  <body>        
    <h1>MakeItRelevant</h1>
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
                <button id="submit" className="submit" onClick={() => HandleClick(word)}>Submit</button>
        </div>
    <div>

    <div className="car">
      {ret.map((item, i) =>
         i === index ? (
          <div className="car-item" key="">
          <h2 name="word">You typed in: {word}</h2>
          <h2 name="curr" id="curr">{curr[i]}</h2>
          <h2 name="dfn">Definition:</h2>
            <p id="dfn"placeholder="Loading Definition...">{item[1]}</p>
          <h2 name="snt">Sentence:</h2>
            <p id="snt" placeholder="Loading Sentence...">{item[2]}</p>
          <h2 name="qrc_label">Choose your quote source:</h2>
            <select name="qrc_selector" id="qrc_selector" placeholder="" onChange={() => ToggleQuote()}>
              {item[3][0].map((qrc,k) => 
                <option id="option_mapped" key={k} value={item[4][0][k]} >{qrc}</option>
              )}
            
            </select>
            <h2>Quote:</h2>
            <p id="quo">{item[4][0][0]}</p>

            <h2>Video:</h2>
            <p id="vid"></p>
            <iframe id="qv" class="video" src={item[5][2]} width="640" height="480" 
              frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
          </div>
         ) : null
      )} 
      <a className="prev" onClick={onPrev}>
        PREV
      </a>
      <a className="next" onClick={onNext}>
        NEXT
      </a>
    </div>
          
        </div>
    </div>
    </body>
    </html> 
  )
};
