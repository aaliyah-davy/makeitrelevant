import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

class App extends React.Component {

  // const [word, setWord] = useState('');

  state = { details: [], }

  componentDidMount() {

    let data;
    axios.get('http://localhost:8000')
    .then(res => {
      data = res.data;
      this.setState({
        details: data
      });
    })
    .catch(err => { 'error :/ ' })
  }

  render() {
    return (
      <div>
        <div>
          <form id='usr_wrd' methods="post">
                <h2>Enter word(s) here:</h2>
                <p><input id='inn_arr' type="text" name="wd" /></p>
                <p><input type="submit" value="Submit" /></p>
          </form>
          </div>
        <h2>You entered:</h2>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div>
              <h2>{output.word}</h2>
          </div>
            </div>

        ))}


      </div>
    )
  }
}

// let word_list = document.getElementById("inn_arr");


export default App;
