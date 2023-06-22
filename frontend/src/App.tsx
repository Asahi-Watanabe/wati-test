import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [tree, setTree] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [res, setResult] = useState<string>('');

  const onClickCreate = async () => {
    try {
      const response = await axios.put('http://localhost:8080/tree', JSON.parse(tree));
      setResult(response.data.message);
    } catch(err) {
      console.log(err);
    }
  }

  const onClickGet = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/tree?path=${path}`, JSON.parse(tree));
      setResult(response.data.value);
    } catch(err: any) {
      console.log(err);
      setResult(err.response.data.message);
    }
  }
  return (
    <div className="App">
      <input type="text" value={tree} onChange={(e) => setTree(e.target.value)} />
      <input type="text" value={path} onChange={(e) => setPath(e.target.value)} />
      <button onClick={onClickCreate}>create</button>
      <button onClick={onClickGet}>get</button>
      <div>{res}</div>
    </div>
  );
}

export default App;
