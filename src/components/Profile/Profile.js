
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";

class Profile extends React.Component {
 constructor(props) {
     super(props)
     this.state = {
        profilePicture: <i className="large material-icons">account_circle</i>
     }
     this.submitProfilePic = this.submitProfilePic.bind(this);

 }

    componentDidMount() {
        const { user } = this.props.auth;
        Axios.get(`/api/users/${user.id}/profile-picture`)
             .then(res => {
                 if (res.data.image_url) {
                     this.setState({
                        profilePicture: <img src={res.data.image_url} className="circle responsive-img" style={{"width": "300px", "height": "300px"}} />
                     })
                 }
             })
    }

    submitProfilePic = e => {
        e.preventDefault()
        const { user } = this.props.auth;
        var file = document.getElementById("file-input").files[0]
        console.log(file)
        var formData = new FormData()
        formData.append('profile-image', file)
        formData.append("uniqueID", user.id)
        Axios.post("/api/users/profile_picture/update", formData, {headers: {'Content-type': 'multipart/form-data'}})
             .then(res => {
                 this.setState({
                     profilePicture: <img src={res.data.image_url} className="circle responsive-img" style={{"width": "200px"}} />
                 })
             })
    
    }




    render() {
        const { user } = this.props.auth;
        return(
            <div>
                <div className="grey lighten-2 section center-align z-depth-3">
                    <div className="row">
                    {this.state.profilePicture}
                <h4>{user.name.split(" ")[0]}'s Profile</h4>
                </div>
                </div>
                <div className="container section">
                    <h4>Edit Profile Picture</h4>
                    <form onSubmit={this.submitProfilePic}>
                        <div class="file-field input-field">
                        <div class="btn">
                            <span>Browse</span>
                            <input type="file" name="profile-pic" id="file-input"/>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                        </div>
                        <input type="submit" className="btn" value="Save"/> 
                        <h5>To see changes across the application, refresh the page</h5>
                        <button className="btn" onClick={() => window.location.reload(false)}><i className="material-icons left" >refresh</i>Refresh</button>
                    </form>
                   
                </div>
                <div className="section grey lighten-4 row">
                    <div className="container">
        <h4>{user.name}'s Networth</h4>
                    <div className="col l6">
                        <Link to="/edit-profile/goals/one" className="black-text">
                        <div>
                            <div className="card large hoverable">
                                <div className="card-image">
                                    
                                    <img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_670,q_60,w_1006/v1/clients/fortcollinsco/Outdoor_Adventures_HIking_credit_Richard_Haro_99ccc557-6b1c-4b41-819c-54481a6ef8f5.jpg" style={{height: "300px"}} alt="a loving couple stands triumphantly atop a mountain peak, watching the rising sun"/>
                                    <span className="card-title col l12 left black">Set your goals</span>
                                    
                                    
                                </div>
                                <div className="card-content">
                                    Your hard work should pay off! Set your goals, and we'll help you track how close you are. The more you save each month, the faster you'll reach your goals!                                
                                    <br></br><br></br>
                                    <p className="btn">Set my goals!</p>
                                </div>
                                
                            </div>

                        </div>
                    </Link>
                    </div>
                    <Link to="/edit-profile/networth/assets" className="black-text">
                        <div className="row col l6">
                            <div className="card large hoverable">
                                <div className="card-image">
                                    <img src="https://www.eharmony.com/dating-advice/wp-content/uploads/2016/02/love-again-550x367.jpg" style={{height: "300px"}} alt="a joyous woman express happiness on a beach by smiling and throwing her arms towards the sky."/>
                                    <span className="card-title black left col l12">Track your net worth</span>
                                </div>
                                <div className="card-content">
                                    As you pay down debt and save and invest more, your networth will grow. We'll be here to track your journey, so you can see improvements after each budget session!
                                    <br></br><br></br>
                                    <p className="btn">
                                    Track my networth!
                                </p>
                                </div>
                            </div>

                        </div>
                    </Link>
                    </div>
                </div>
                </div>

            

                
        )};
};
Profile.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps
  )(Profile);