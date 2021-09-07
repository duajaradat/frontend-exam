import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'

class AllDataAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiDataArray: [],
        }
    }

    componentDidMount = async () => {
        const { user, isAuthenticated } = this.props.auth0;
        let apiData = await axios.get(`${process.env.REACT_APP_SERVER}/dataApi`);
        this.setState({
            apiDataArray: apiData.data
        }, () => { console.log(this.state.apiDataArray) });

    }
    addData = async (photoObj) => {
        const { user, isAuthenticated } = this.props.auth0;
        let addingData = await axios.post(`${process.env.REACT_APP_SERVER}/addtomyfav/${user.email}`, photoObj)
        this.setState({
            apiDataArray: addingData.data
        })
    }

    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                {this.state.apiDataArray.map((photoObj, i) => {
                    return (
                        <Card key={i} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={photoObj.image} />
                            <Card.Body>
                                <Card.Title>{photoObj.name}</Card.Title>
                                <Button onClick={() => { this.addData(photoObj) }} variant="primary">Add to MyFav</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
