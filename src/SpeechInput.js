import React from 'react';
import {pauseInRoom, playInRoom} from "./SonosRepository";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.recognitionStarted = false;
        this.recognitionError = false;
    }

    componentDidMount() {
        // this.startRecognationIfNeccasarry();
    }

    executeCommand = (command) => {
        let offCommand = /Sonos (wohnzimmer|schlafzimmer) (aus|stop|ruhe)/i.exec(command);
        let onCommand = /Sonos (wohnzimmer|schlafzimmer) (play|start|laufen)/i.exec(command);

        if (onCommand && onCommand.length >= 3) {
            playInRoom(onCommand[1]);
        } else if (offCommand && offCommand.length >= 3) {
            pauseInRoom(offCommand[1]);
        } else {
            this.setState({inputValue: 'unknown command'});
        }
    };

    startRecognationIfNeccasarry = () => {
        if (!this.recognitionStarted && !this.recognitionError) {
            this.extracted();
        }
    };

    extracted = () => {
        const WebkitSpeechRecognition = window.webkitSpeechRecognition;
        this.recognition = new WebkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = 'de';
        this.recognition.onend = (res) => {
            console.log("eeeeeeend", res)

            this.recognitionStarted = false;
            this.startRecognationIfNeccasarry()
        };
        this.recognition.onerror = (err) => {
            this.recognitionStarted = false;
            this.recognitionError = true;
            console.log("err", err)
            if (!err.error.includes("not-allowed")) {
                this.startRecognationIfNeccasarry()
            }
        };
        this.recognition.onresult = (event) => {
            console.log(event)
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                    this.setState({
                        inputValue: finalTranscript
                    });
                    this.executeCommand(finalTranscript);
                } else {
                    interimTranscript += event.results[i][0].transcript;
                    this.setState({
                        inputValue: interimTranscript,
                    });
                    if (this.props.onChange) this.props.onChange(interimTranscript);
                }
            }
        };
        this.recognitionStarted = true;
        this.recognition.start();
    };

    render() {
        this.startRecognationIfNeccasarry();
        return (
            <div>
                <div onClick={this.extracted}>
                    Alalsdcsdcsd
                </div>
                {this.state.inputValue}

            </div>
        );
    }
}
