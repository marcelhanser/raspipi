import React, {Component} from 'react';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';

class Displayer extends Component {

    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.pull();
    }

    pull = () => {
        const url = '/api/post';
        setTimeout(() => {
            request
                .get(url)
                .query(null)
                .set('Accept', 'application/json')
                .end((error, response) => {
                    console.log(response);
                    const title = JSON.parse(response.text).text;
                    const background = JSON.parse(response.text).background;
                    console.log("Response " + JSON.stringify(title));
                    console.log("Response " + JSON.stringify(background));

                    this.setState({
                        name: title
                    })
                });
            this.pull();
        }, 2000);
    };

    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>{this.state.name}</h1>
                </header>
            </div>

        );
    }
}

export default Displayer;
