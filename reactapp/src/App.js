
import React, { Component } from 'react'
import './App.css';
import Table from './components/Table';
import {BrowserRouter as Router , Route ,NavLink } from "react-router-dom";
import AddAlert from './components/AddAlert';
import {Navbar,Nav} from 'react-bootstrap';
import Home from './components/Home';
// import Input from './components/Input';


class App extends Component {
  
  
  render() {
    
    return (
      <Router>
        <div className = "container">
          
          <h1 className ="primary" align = "middle">ALERT SYSTEM</h1>
          <Navbar sticky="top" expand="lg" variant="light" bg="light">
          <Navbar.Brand href="#home" >Navbar</Navbar.Brand>
              <div className = "container">
                <div className = "navbar-header">
                  <Nav className="mr-auto">
                  
                    <NavLink exact to = {"/home"} activeStyle = {{color : "red" }}>•Home&nbsp;&nbsp;&nbsp;</NavLink>
                    
                  
                    <NavLink exact to = {"/table"} activeStyle = {{color : "red", fontWeight : "bold"}}>•List &nbsp;&nbsp;&nbsp;</NavLink>
                  
                  
                    <NavLink exact to = {"/add"} activeStyle = {{color : "red"}}>•Add Alert </NavLink>
                  
                  </Nav>
                </div>
              </div>
            </Navbar>
          
            
          <Route exact path = '/table' component = {Table}/>
          <Route exact path = '/add' component = {AddAlert}/>
          <Route exact path = '/home' component = {Home}/>
          <hr/>
        </div>
        
      </Router>
      
    )
  }
}
export default App;
