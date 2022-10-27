import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter,Link} from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import list from '../assets/list.css';
import Nav from './Nav';
import menu from '../assets/menu.png';
class Rejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectedlist: [],
      profileId:props.match.params.profileIdParam
     
    }
  }
  componentDidMount() {
      const {profileId}=this.state;
      console.log(profileId)
    this.getData().then(response => {
      this.setState({ rejectedlist: response.data });
      console.log(this.state.rejectedlist)
    });
  }
  getData = () => {
    const {profileId}=this.state;
    return new Promise((resolve, reject) => {
      axios.get(`http://10.117.189.210:9090/app/getRejectedProfile/${profileId}`).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  list=()=>{
    const{profileId}=this.state;
    this.props.history.push('/listof/' + profileId);
  }
  intrestedlist=()=>{
    const{profileId}=this.state;
    this.props.history.push('/intrested/' + profileId);
  }
  acceptedlist=()=>{
    const{profileId}=this.state;
    this.props.history.push('/accepted/' + profileId);
  }
  rejectedlist=()=>{
    const{profileId}=this.state;
    this.props.history.push('/rejected/' + profileId);
  }
   render() {
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
  <img src={menu} width="40px" height="40px"/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
          <b><i><button onClick={this.list} className="btn btn-link" to="/list">Profiles List</button></i></b>
      </li>
      <li className="nav-item">
      <b><i><button onClick={this.intrestedlist} className="btn btn-link" to="/list">Intrested profiles</button></i></b>
      </li>
      <li className="nav-item">
      <b><i><button onClick={this.acceptedlist} className="btn btn-link" to="/list">Accepted profiles</button></i></b>
      </li>
     <li className="nav-item">
     <b><i><button onClick={this.rejectedlist} className="btn btn-link" >Rejected profiles</button></i></b>
      </li>
      <button className="btn btn-link"><Link to="/dashboard">Logout</Link></button>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
          <table className="table list">
            <thead>
              <tr><td>rejectedProfileId</td><td>rejectedProfileName</td></tr>
            </thead>
      <tbody>
          {
          this.state.rejectedlist.map((item, i) => {
                                return (
                                    <tr key={i}>
                                      <td>{item.rejectedProfileId}</td>
                                        <td>{item.rejectedProfileName}</td>
                                    </tr>
                                    
                                )
                            })
                        }
         </tbody>
         </table>                                  
                  </div>
    )
  }
}
export default Rejected;

