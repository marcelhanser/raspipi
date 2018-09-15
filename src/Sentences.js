import React, {Component} from 'react';
import './App.css';
import request from 'superagent';
import randomSentence from './images/random-sentence.svg';


class Sentences extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    playRandomSentence = () => {
        const url = '/api/getSentence';
        request
            .get(url)
            .query(null)
            .set('Accept', 'Accept: application/json')
            .end((error, response) => {
                console.log(response);
                if (error) {
                    return;
                }
                console.log(response.randomSentence);
                this.playTextSonos(JSON.parse(response.text).randomSentence);
            });
    }

    playTextSonos = (text) =>{
        const url = 'http://localhost:5005/wohnzimmer/say/'+encodeURIComponent(text);
        request.get(url).end();
    }

    render() {
        const {text} = this.state;
        return (
            <div id="musicButtons">
                <img src={randomSentence} className="turningIcon" onClick={this.playRandomSentence}/>
                <p>{text}</p>

            </div>

        );
    }
}

export default Sentences;
