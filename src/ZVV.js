import React, {Component} from 'react';
import './ZVV.css';
import request from "superagent";
import {FormattedRelative, FormattedTime} from "react-intl";
import logo from './logo.svg';

class ZVV extends Component {

    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        this.activatePolling();
    }

    activatePolling = () => {
        this.callTimetableSuperService();
        setTimeout(() => {
            this.activatePolling();
        }, 10000);
    };

    callTimetableSuperService = () => {
        const url = 'http://transport.opendata.ch/v1/connections?from=Zürich+Manegg&to=Z%C3%BCrich+HB&limit=4&datetime=';
        request
            .get(url)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(response);
                if (error) {
                    return;
                }
                this.setState(response.body);
            });
    };

    handleSubmit = () => {
        this.callTimetableSuperService();
    };

    renderConnection = (connection) => {
        let departure = new Date(connection.from.departure);
        const isDelayed = !!connection.from.delay;
        return <div className={'connection'} key={connection.from.departureTimestamp}>
            Abfahrt &nbsp;
            <FormattedRelative
                value={departure}/> <span
            style={{color: 'red'}}>{isDelayed ? ` mitera Verspetig va ${connection.from.delay} Minüüte` : ''}</span> um <FormattedTime
            value={departure}/>
        </div>;
    };

    render() {
        const {connections} = this.state;
        const currentDate = new Date();
        const stationNames = connections ? connections.filter(c => new Date(c.from.departure) > currentDate).map(this.renderConnection) : [];

        return (
            <div className="Poster-Wrapper">
                {stationNames}
                <div id="zvvSubmit" onClick={this.handleSubmit}>Aktualisier doch endlich</div>
                <img src={logo} className="App-logo" alt="logo" onClick={() => window.location = "/"}/>
            </div>
        );
    }
}

export default ZVV;

