import React, {Component} from 'react';
import request from 'superagent';
import logo from './logo.svg';
import train from './train.svg';
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
                    if(error ){
                        return;
                    }
                    this.setState(JSON.parse(response.text));
                });
            this.pull();
        }, 1000);
    };

    render() {
        const {background, fontcolor, text, giphy} = this.state;
        return (
            <div className="App">

                <header className="App-header" style={{background, color: fontcolor}}>
                    <img src={logo} className="App-logo" alt="logo" onClick={() => window.location="/poster"}/>
                    <img src={train} id="train" alt="train" onClick={() => window.location = "/zvv"}/>
                    <h1>{text}</h1>
                    <iframe src={giphy} height={200} />
                </header>
            </div>

        );
    }
}

export default Displayer;
