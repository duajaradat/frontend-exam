import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import UpdateModal from './UpdateModal.js';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFavorites: [],
      show: false,
      selectedObj: {}
    }
  }
  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    console.log('yyyyyyyyyyyyyyyyy')
    // http://localhost:3003/myfav/:email
    if (isAuthenticated) {
      let myfavData = await axios.get(`${process.env.REACT_APP_SERVER}/myfav/${user.email}`);
      this.setState({
        myFavorites: myfavData.data
      }, () => { console.log(this.state.myFavorites) })

    }

  }

  // /deletefrommyfav/:photoId
  deleteFromMyFav = async (photoId) => {
    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      let deletemyfavData = await axios.delete(`${process.env.REACT_APP_SERVER}/deletefrommyfav/${photoId}?email=${user.email}`);
      let myFavorites = deletemyfavData.data;
      this.setState({
        myFavorites: myFavorites
      })
    }
  }
  updateModal = async (Obj) => {
    this.setState({
      show: true,
      selectedObj: Obj
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { user, isAuthenticated } = this.props.auth0;
    const _id = this.state.selectedObj._id;
    const data = {
      name: e.target.name.value,
      image: e.target.image.value
    }
    ///updatemyfav/:photoId
    let updatedData = axios.put(`${process.env.REACT_APP_SERVER}/updatemyfav/${_id}?email=${user.email}`, data);
    let dataAfterUpdate = updatedData.data;
    this.setState({
      myFavorites: dataAfterUpdate,
      show: false
    });

  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.myFavorites.map((Obj, i) => {
          return (
            <>
              <Card key={i} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Obj.image} />
                <Card.Body>
                  <Card.Title>{Obj.name}</Card.Title>
                  <Button onClick={() => { this.deleteFromMyFav(Obj._id) }} variant="primary">Delete</Button>
                  <Button onClick={() => { this.updateModal(Obj) }} variant="primary">Update</Button>
                </Card.Body>
              </Card>
              {this.state.show && < UpdateModal show={this.state.show} selectedObj={this.state.selectedObj} handleSubmit={this.handleSubmit} />}
            </>
          )
        })}
      </>
    )
  }
}

export default withAuth0(MyFavorites);

