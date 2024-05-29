
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [word, setWord] = useState('');
  const [bank, setBank] = useState([]);

  return (
    <>
      <h1>Enter word(s) here:</h1>
      <input
        value={word}
        onChange={e => setWord(e.target.value)}
      />
      <button onClick={() => {
        setBank([
          ...bank,
          { id: nextId++, word: word }
        ]);
      }}>Submit</button>
      <ul>
        {bank.map(bank => (
          <li key={bank.id}>{bank.word}</li>
        ))}
      </ul>
    </>
  );
}
