import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"


class Navbar extends Component {
  render() {
    return (
<div>

  <div className="navbar-fixed hide-on-med-and-down">
    <nav>
      <div className="nav-wrapper  z-depth-4 black">
        <Link to="/dashboard" className="brand-logo" style={{marginLeft: "2vw"}}>
          <i className="material-icons large">apps</i>
        </Link>
        <ul className="right">
          <li>
            <Link to="/edit-profile" className="btn blue accent-3">
            <i className="tiny material-icons white-text left ">account_box</i>Profile
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
  <ul id="dropdown1" className="dropdown-content">
  <li> <Link to="/dashboard">
          <i className="material-icons left">apps</i>Dashboard
        </Link></li>
        <li class="divider"></li>
  <li><Link to="/edit-profile">
          <i className="material-icons left">account_box</i>Profile
        </Link></li>
        <li class="divider"></li>
        <li>
          <Link to="/budgets/new">
            <i className=" material-icons left ">create</i>New Budget
          </Link>
        </li>
        <li class="divider"></li>
        <li>
          <Link to="/budgets">
            <i className=" material-icons left ">assessment</i>View Budgets
          </Link>
        </li>
  
 
</ul>
  <div className="navbar-fixed hide-on-large-only">
  <nav>
   
    <div class="nav-wrapper black">
    <a href="#" className="brand-logo left dropdown-trigger" data-target="dropdown1"><i className="large material-icons">menu</i></a>
      
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