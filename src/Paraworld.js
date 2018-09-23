import React, {Component} from 'react';
import './App.css';
import request from 'superagent';
import Grid from "@material-ui/core/Grid/Grid";

class Paraworld extends Component {

    constructor() {
        super();
        this.state = {
            paraInfo: ''
        }
    }

    componentDidMount() {
        console.log("parawoooorld");
        this.fetchParaInfos();
    }

    fetchParaInfos() {
        const url = '/api/paraworld';
        request
            .get(url)
            .query(null)
            .set('Accept', 'Accept: application/json')
            .end((error, response) => {
                if (error) {
                    return;
                }
                this.setState(JSON.parse(response.text));
                //paraInfo
                // his.playTextSonos(JSON.parse(response.text).randomSentence);
            });
    }

    render() {
        const {paraInfo} = this.state;
        const paraArr = paraInfo.split("\n").map(s => <div key={Math.random()}>{s}</div>);
        return (
            <Grid className="Grid-Root" container direction="column" alignItems="center">
                <Grid item xs={12}>
                    {paraArr}
                </Grid>
            </Grid>
        );
    }
}

export default Paraworld;