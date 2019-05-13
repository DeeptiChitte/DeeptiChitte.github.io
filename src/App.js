import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ".ReactFireTeamLogo.svg";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("blogs");
    this.unsubscribe = null;
    this.state = {
      blogs: []
    };
  }

  onCollectionUpdate = snapshot => {
    const blogs = [];
    snapshot.forEach(doc => {
      const { title, body } = doc.data();
      blogs.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        body
      });
    });
    this.setState({
      blogs
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <body data-spy="scroll" data-target="#navbarResponsive">
          <div id="home">
          
         <nav class="navbar navbar-expand-md  fixed-top ">
           <div class="navbar-brand">
              <h2><strong>Some Blog</strong></h2>
              </div>
              <div>
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">Home</li>
                  <li class="nav-item">Spotlight</li>
                  <li class="nav-item">Something Else</li>
                  <li class="nav-item"><Link to="/create" class="text-white">Add Blog</Link>
                  </li>
                </ul>
              </div>
           
            </nav>
            </div>
            {/* <div class="carousel-inner">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
            data-interval="3000"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
          

          {/* <div class="carousel-inner"> */
         
      /* <div
              className="carousel-item active"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/1202849/pexels-photo-1202849.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') "} }>
              <div class="carousel-caption text-center">
                <h1>Welcome to the world of Inner Peace</h1>
                <h3>Let's Uncode!!!</h3>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"}}
            >  <div class="carousel-caption text-center">
            <h1>Welcome to the world of Inner Peace</h1>
            <h3>Let's Uncode!!!</h3>
          </div></div>
            <div
              className="carousel-item"
              style={ {backgroundImage: "url('https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"}}
              >  <div class="carousel-caption text-center">
              <h1>Welcome to the world of Inner Peace</h1>
              <h3>Let's Uncode!!!</h3>
            </div>
                </div>
            </div>
          </div>
           <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"> 
            <span class="carousel-control-prev-icon" aria-hidden="true"></span></a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span></a>  */
          
            <div class="card-columns">
              {this.state.blogs.map(blog => (
                <div class="card-body card border-success">
                  <h5 class="card-title">
                    <Link to={`/show/${blog.key}`}>{blog.title}</Link>
                  </h5>
                  <p class="card-text">{blog.body}</p>
                </div>
              ))}
          </div>
                       /* <div id="contact"> 
             
</div> */}
        </body>
      </div>
    );
  }
}

export default App;
