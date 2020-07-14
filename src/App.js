import React from 'react';
import './App.css';
import Todosinfinite from './Todosinfinite'
import Home from './home.svg'

function App() {
const [msg, setMsg] = React.useState("Hey don't be lazy, complete yours todos!")

// React Use Effect Message
React.useEffect(()=>{
  setTimeout(()=>{
    setMsg('')
  }, 10000);
},[msg]);


// ─── RETURN ─────────────────────────────────────────────────────────────────────

  return (
    <div className="App">
       <a href="/catalog" className='home'>
        <img src={Home} alt="home-img" />
    </a>

      <Todosinfinite msg={msg} setMsg={setMsg}  />
    </div>
  );
}

export default App;
