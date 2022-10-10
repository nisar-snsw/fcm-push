import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { initlialiseFirebase } from "./firebase";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={initlialiseFirebase}> Get FCM Token </button>
        <p>Look at the token in Console Logs</p>
      </header>
    </div>
  );
}

export default App;
