import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import '../App.css';
import './Show.css';
class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('blogs').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          blog: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such blog!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('blogs').doc(id).delete().then(() => {
      console.log("Blog successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing blog: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
        <nav class="navbar navbar-expand-md  fixed-top">
          <div class="panel-heading">
              <h4><Link to="/">Blog List</Link></h4>
              </div>
              </nav>
        </div>
        <div class="panel-body">
            <h3 class="panel-title">
              {this.state.blog.title}
            </h3>
          
            
          {/* <div class="panel-body"> */}
            <dl>
              <dt>Body:</dt>
              <dd>{this.state.blog.body}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      // </div>
    );
  }
}

export default Show;