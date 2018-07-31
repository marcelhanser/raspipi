import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Poster from "./Poster";
import Displayer from "./Displayer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/poster' component={Poster}/>
                    <Route path='/blabla' component={Displayer}/>
                </Switch>
            </div>
        );
    }
}

export default App;
