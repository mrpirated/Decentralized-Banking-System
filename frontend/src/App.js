import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import Register from "./components/layout/Register"
import Login from "./components/layout/Login"
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
      <Navbar/>
      <section className = 'section'>
        <Switch>
          <Route exact path ='/register' component = {Register} />
          <Route exact path = '/login' component = {Login} />
        </Switch>
      </section>
      </Fragment>
    </Router>
  );
}

export default App;
