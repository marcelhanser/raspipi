import React, {Component} from 'react';
import request from 'superagent';
import playButton from './images/play-button.svg';
import pauseButton from './images/pause-button.svg';
import './App.css';

class Music extends Component {

    constructor() {
        super();
    }

    sonosPlay = () => {
        const url = '/api/sonos/wohnzimmer/play';
        request.get(url).end();
    };

    sonosPause = () => {
        const url = '/api/sonos/wohnzimmer/pause';
        request.get(url).end();
    };

    render() {
        return (
            <div>
                <img src={playButton} className="turningIcon" onClick={this.sonosPlay}/>
                <img src={pauseButton} className="turningIcon" onClick={this.sonosPause}/>
            </div>
        );
    }
}

export default Music;
