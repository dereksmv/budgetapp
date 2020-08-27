
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Profile extends React.Component {
   
    render() {
        const { user } = this.props.auth;
        return(
            <div>
                <div className="grey lighten-2 section center-align z-depth-3">
                    <h4>{user.name.split(" ")[0]}'s Profile</h4>
                </div>
                <div className="section grey lighten-4 row">
                    <div className="container">
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