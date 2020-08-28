import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import M from "materialize-css"


class Navbar extends Component {
  
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  }
  
  render() {
    return (
<div>

  <div className="navbar-fixed hide-on-med-and-down">
    <nav>
      <div className="nav-wrapper  z-depth-4 black">
        <Link to="/dashboard" className="brand-logo" style={{marginLeft: "2vw"}}>
          <i className="material-icons large">home</i>Dashboard
        </Link>
        <ul className="right">
          <li>
            <Link to="/edit-profile" className="btn blue accent-3">
            <i className="tiny material-icons white-text left ">account_box</i>Edit Profile
            </Link>
          </li>
          <li>
            <Link to="/budgets/new" className="btn blue accent-3">
            <i className="tiny material-icons white-text left ">create</i>New Budget
            </Link>
          </li>
          <li>
            <Link to="/budgets" className="btn blue accent-3">
            <i className="tiny material-icons white-text left ">assessment</i>View Budgets
            </Link> 
          </li>
      {/*<li style={{marginRight: "2vw"}}><i className="tiny material-icons white-text left ">account_circle</i>{user.name.split(" ")[0]}   </li>*/}
        </ul>
      </div>
      </nav>
  </div>


  <ul id="slide-out" className="sidenav">
    <li>
      <Link to="/dashboard" className="sidenav-close">
        <i className="material-icons left">apps</i>Dashboard
      </Link>
    </li>
    <li class="divider"></li>
    <li>
      <Link to="/edit-profile" className="sidenav-close">
        <i className="material-icons left">account_box</i>Edit Profile
      </Link></li>
    <li class="divider"></li>
    <li>
      <Link to="/budgets/new" className="sidenav-close">
        <i className=" material-icons left ">create</i>New Budget
      </Link>
    </li>
    <li class="divider"></li>
    <li>
      <Link to="/budgets" className="sidenav-close">
        <i className=" material-icons left ">assessment</i>View Budgets
      </Link>
    </li>
  </ul>

  <div className="navbar-fixed hide-on-large-only">
  <nav>
   
    <div class="nav-wrapper black">
    <a href="#" className="brand-logo left sidenav-trigger" data-target="slide-out"><i className="large material-icons">menu</i></a>
      
    </div>
  </nav>
  </div>
 </div>
 
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Navbar);