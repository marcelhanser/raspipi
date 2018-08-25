import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Poster from "./Poster";
import Displayer from "./Displayer";
import ZVV from "./ZVV";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/poster' component={Poster}/>
                    <Route path='/zvv' component={ZVV}/>
                    <Route path='/' component={Displayer}/>
                </Switch>
            </div>
        );
    }
}

export default App;
