import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import M from "materialize-css"
import Axios from "axios"


class MobileNav extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        profile_img: <i className="large material-icons">account_circle</i>
    }
  }

  
  
  componentDidMount() {
    let { user } = this.props.auth;
    Axios.get(`/api/users/${user.id}/profile-picture`)
    .then(res => {
        if (res.data.image_url) {
            this.setState({
               profile_img: <img src={res.data.image_url} className="circle responsive-img" style={{"width": "150px", "height": "150px"}} />
            })
        }
    })
    

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
      });
    
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      // eslint-disable-next-line no-unused-vars
      var instances = M.Sidenav.init(elems);
    });

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
      });

  }
  
  render() {
    let { user } = this.props.auth;
    return (
<div className="hide-on-large-only">
    
  <ul id="slide-out" className="sidenav collapsible">
    <Link to="/edit-profile" className="black-text sidenav-close"><div className="section center-align row">{this.state.profile_img}</div></Link>
    <h5 className="center-align row">{user.name}</h5>
    <li>
      <Link to="/dashboard" className="sidenav-close">
        <i className="material-icons left">apps</i>Dashboard
      </Link>
    </li>
    <li class="divider"></li>
    <li className="text-grey" style={{"padding-left": "16px"}}>
      <div class="collapsible-header"><i className="material-icons left">account_box</i><span style={{"padding-left": "16px"}} >Edit Profile</span></div>
        <div class="collapsible-body">
            <div class='dropdown-trigger'data-target='dropdown1'>
			    Edit Goals
            </div>
                    <ul id='dropdown1' className='container dropdown-content'>
                    <Link to="/edit-profile/goals/one" className="sidenav-close"><li>Edit Goal One</li></Link>
                    <li class="divider" tabindex="-1"></li>
                    <Link to="/edit-profile/goals/two" className="sidenav-close"><li>Edit Goal Two</li></Link>
                    <li class="divider" tabindex="-1"></li>
                    <Link to="/edit-profile/goals/three" className="sidenav-close"><li>Edit Goal Three</li></Link>
                    <li class="divider" tabindex="-1"></li>
            </ul>
		</div>
        <div class="collapsible-body">
            <div class='dropdown-trigger'data-target='dropdown2'>
			    Edit Networth
            </div>
                    <ul id='dropdown2' class='dropdown-content'>
                    <Link to="/edit-profile/networth/assets" className="sidenav-close"><li>Edit Assets</li></Link>
                    <li class="divider" tabindex="-1"></li>
                    <Link to="/edit-profile/networth/liabilities" className="sidenav-close"><li>Edit Liabilities</li></Link>
            </ul>
		</div>
			
        
      </li>
    <li class="divider"></li>
    <li className="text-grey" style={{"padding-left": "16px"}}>
      <div class="collapsible-header"><i className="material-icons left">create</i><span style={{"padding-left": "16px"}} >New Budget</span></div>
      <div class="collapsible-body">
        <div className="text-grey">
      <Link to="/budgets/new/create-from-standard" className="sidenav-close black-text">
        <i className=" material-icons left ">note</i>New Standard Budget
      </Link>
      </div>
      </div>
      <div class="collapsible-body">
        <div className="text-grey">
      <Link to="/budgets/new/create-from-template" className="sidenav-close black-text">
        <i className=" material-icons left ">note_add</i>Build From Template
      </Link>
      </div>
      </div>
      <div class="collapsible-body">
        <div className="text-grey">
      <Link to="/budgets/new/new-template" className="sidenav-close black-text">
        <i className=" material-icons left ">library_books</i>Create New Template
      </Link>
      </div>
      </div>
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

MobileNav.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(MobileNav);