import React, {Component} from 'react';
import request from "superagent";
import './Poster.css';
import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';

class Poster extends Component {

    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    handleSubmit = () => {
        const url = '/api/post';
        request
            .post(url)
            .send(this.state)
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (error) {
                    console.log("Error", error);
                }
                else {
                    console.log("Response " + JSON.stringify(response.body));
                    window.location = "/";
                }
            })

    };

    handleChange = (event) => {
        this.setState({text: event.target.value});
    };

    onEntrySelect = (entry) => {
        this.setState({giphy: entry.embed_url});
    };

    render() {
        return (
            <div className="Poster-Wrapper">
                <div>
                    <label>
                        Name:
                        <input type="text" value={this.state.text} onChange={this.handleChange}/>
                    </label>
                </div>

                <div>
                    <input type="color" id="color" name="color" onChange={(event) => {
                        this.setState({background: event.target.value})
                    }}
                           value={this.state.background}/>
                    <label htmlFor="color">Background Color</label>
                </div>

                <div>
                    <input type="color" id="fontcolor" name="fontcolor" onChange={(event) => {
                        this.setState({fontcolor: event.target.value})
                    }}
                           value={this.state.fontcolor}/>
                    <label htmlFor="fontcolor">Font Color</label>
                </div>

                <div>
                    <GiphySelect onEntrySelect={this.onEntrySelect}/>
                </div>

                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default Poster;
