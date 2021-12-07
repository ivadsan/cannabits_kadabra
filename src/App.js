import React from "react";
import { Router } from "@reach/router"
import Home from "./pages/home";
import Notes from "./pages/notes"
import "./styles/global.scss"

const THEME = process.env.REACT_APP_THEME

function App() {
  return (
    <div className={THEME}>
    <Router>
        <Home path="/"/>
        <Notes path="notes" />     
    </Router>    

    </div>
  );
}

export default App;
