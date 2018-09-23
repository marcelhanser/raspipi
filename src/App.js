import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Poster from "./Poster";
import Displayer from "./Displayer";
import ZVV from "./ZVV";
import NavBar from "./NavBar";
import Music from "./Music";
import Paraworld from "./Paraworld";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <Switch>
                    <Route path='/poster' component={Poster}/>
                    <Route path='/zvv' component={ZVV}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/paraworld' component={Paraworld}/>
                    <Route path='/' component={Displayer}/>
                </Switch>
            </div>
        );
    }
}

export default App;
