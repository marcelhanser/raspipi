import React, {Component} from 'react';
import './NavBar.css';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import * as PropTypes from "prop-types";
import MusicNote from "@material-ui/icons/MusicNote";
import Train from "@material-ui/icons/Train";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import Textsms from "@material-ui/icons/Textsms";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import Home from "@material-ui/icons/Home";
import request from "superagent";
import {withRouter} from "react-router-dom";

class NavBar extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor() {
        super();
    }

    componentDidMount() {
        console.log("navbar did mount");
    }

    playRandomSentence = () => {
        const url = '/api/random-sentence';
        request
            .get(url)
            .query(null)
            .set('Accept', 'Accept: application/json')
            .end((error, response) => {
                if (error) {
                    return;
                }
                console.log(response.randomSentence);
                this.playTextSonos(JSON.parse(response.text).randomSentence);
            });
    };

    playTextSonos = (text) => {
        const url = '/api/sonos/wohnzimmer/say/' + encodeURIComponent(text) + '/de';
        request.get(url).end();
    };

    render() {
        const {location} = this.props;
        return (
            < AppBar position="static">
                {/*<div>your are now at {location.pathname}</div>*/}
                <Toolbar>
                    <IconButton color="inherit" onClick={() => window.location = "/"}>
                        <Home/>
                    </IconButton>
                    <div id="Navbar-Right">
                        <IconButton color="inherit" onClick={this.playRandomSentence}>
                            <SentimentVerySatisfied/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => window.location = "/poster"}>
                            <Textsms/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => window.location = "/music"}>
                            <MusicNote/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => window.location = "/zvv"}>
                            <Train/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => window.location = "/paraworld"}>
                            <FlightTakeoff/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(NavBar);
