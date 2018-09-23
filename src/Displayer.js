import React, {Component} from 'react';
import request from 'superagent';
import './App.css';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";

class Displayer extends Component {

    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
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

    render() {
        const {text, giphy} = this.state;
        return (
            <div id="body">
                <Paper>
                    <Typography variant="headline">{text}</Typography>
                    <div>
                        <iframe src={giphy} height={200}/>
                        <div className="notClickable"/>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Displayer;
