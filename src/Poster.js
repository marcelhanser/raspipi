import React, {Component} from 'react';
import request from "superagent";
import './Poster.css';
import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";

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
            <Grid className="Grid-Root" container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        id="standard-name"
                        label="Diine Text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Grid>
                        <GiphySelect onEntrySelect={this.onEntrySelect}/>
                    </Grid>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Poster;
