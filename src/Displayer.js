import React, {Component} from 'react';
import request from 'superagent';
import logo from './images/logo.svg';
import train from './images/train.svg';
import playButton from './images/play-button.svg';
import pauseButton from './images/pause-button.svg';
import './App.css';
import Sentences from "./Sentences";
import SonosVoiceManagement from './SpeechInput';

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
                    if (error) {
                        return;
                    }
                    this.setState(JSON.parse(response.text));
                });
            this.pull();
        }, 1000);
    };

    sonosPlay = () => {
        const url = '/api/sonos/wohnzimmer/play';
        request.get(url).end();
    };

    sonosPause = () => {
        const url = '/api/sonos/wohnzimmer/pause';
        request.get(url).end();
    };

    render() {
        const {background, fontcolor, text, giphy} = this.state;
        return (
            <div>
                <header className="App-header" style={{background, color: fontcolor}}>
                    <img src={logo} className="App-logo" alt="logo" onClick={() => window.location = "/poster"}/>
                    <img src={train} className="turningIcon" alt="train" onClick={() => window.location = "/zvv"}/>
                    <img src={playButton} className="turningIcon" onClick={this.sonosPlay}/>
                    <img src={pauseButton} className="turningIcon" onClick={this.sonosPause}/>
                </header>
                <div id="body" style={{background}}>
                    <h1>{text}</h1>
                    <div>
                        <iframe src={giphy} height={200}/>
                        <div className="notClickable"/>
                    </div>
                    <SonosVoiceManagement/>
                    <Sentences/>
                </div>
            </div>

        );
    }
}

export default Displayer;
