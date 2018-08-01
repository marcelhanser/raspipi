import React, {Component} from 'react';
import request from "superagent";

// import './Poster.css';

class Poster extends Component {

    constructor() {
        super();
        this.state = {
            textToPost: ""
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
                }
            })

    };

    handleChange = (event) => {
        this.setState({textToPost: event.target.value});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.textToPost} onChange={this.handleChange}/>
                </label>

                <input type="color" id="head" name="color" onChange={(event) => {
                    this.setState({background: event.target.value})
                }}
                       value={this.state.background}/>
                <label htmlFor="head">Background Color</label>

                <input type="submit" value="Submit"/>

            </form>
        );
    }
}

export default Poster;
