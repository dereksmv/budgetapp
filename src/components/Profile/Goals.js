import React, { Component } from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../../actions/authActions";

class Goals extends Component {


render() {

    return (
            <div className="row center-align grey lighten-3">
                <div className="black-text col l10 offset-l1">
                    {/*The form title container, the blue header with white text*/}
                    <div className="container section">
                        <div className="blue darken-3 white-text col l12 left-align z-depth-2">
                            <h4><b>Financial Goals</b> Tracker</h4>
                                <h6>Goal: {this.props.goal_title}</h6>
                         </div>
                    </div>
                    {/*the form fields*/}
                    <div className="grey container lighten-2 z-depth-4">
                                  <form className="left-align section" style={{marginTop: "5em"}} onSubmit={this.props.onSubmit} encType="multipart/form-data" action={`/api/goals/update-or-create/${this.props.num}`} method="POST">
                                    <div className="section container">
                                        <div>
                                            <label htmlFor={this.props.goals}>Goal:</label>
                                            <input id={this.props.goals} value={this.props.goalsValue} name={this.props.goals} placeholder="Enter a goal" type="text" className="validate row" onChange={this.props.onChange} required/>
                                            
                                            <label htmlFor={this.props.goal_desc}>Tell us about this goal:</label>
                                            <input id={this.props.goal_desc} value={this.props.goal_descValue} name={this.props.goal_desc} placeholder="Enter a description" type="text" datalength="120" className="validate row" required onChange={this.props.onChange}/>

                                            <label htmlFor={this.props.goal_cost}>How much will this goal cost you?:</label>                                    
                                            <input id={this.props.goal_cost} value={this.props.goal_costValue} name={this.props.goal_cost} placeholder="Enter a number" type="text" pattern="[0-9]+" className="validate row" required onChange={this.props.onChange}/>
                                        

                                        
                                            <label htmlFor={this.props.goal_saved}>How much do you have saved for this goal?:</label>
                                            <input id={this.props.goal_saved} value={this.props.goal_savedValue} name={this.props.goal_saved} placeholder="Enter a number" type="text" className="validate row" pattern="[0-9]+" required onChange={this.props.onChange}/>
                                            
                                        </div>
                                        <div className="row">
                                            <br/>

                                            <label id={this.props.goal_img} htmlFor={this.props.goal_img}>Upload an image for this goal:</label>
                                            <div className="file-field input-field">
                                            <div className="btn blue accent-3">
                                                <span>File</span>
                                                <input type="file" onChange={this.props.onChangeFile} name="goal_images"/>
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text"/>
                                            </div>
                                        </div>      
                                        <div className="section">
                                            <h6>You must press "submit" to save your goals on each page.</h6>
                                            <button className="btn hoverable blue accent-3" type="submit" name="goal_images">{this.props.buttonText}
                                                <i className="material-icons right">send</i>
                                            </button>
                                        
                                        </div>
                                        </div>
                                    </div>
                                    <ul className="pagination center-align">
                                        <li className="waves-effect"><Link to={this.props.url_back}><i className="material-icons">chevron_left</i></Link></li>
                                        <li className={this.props.active1}><Link to="/edit-profile/goals/one">1</Link></li>
                                        <li className={this.props.active2}><Link to="/edit-profile/goals/two">2</Link></li>
                                        <li className={this.props.active3}><Link to="/edit-profile/goals/three">3</Link></li>
                                        <li className="waves-effect"><Link to={this.props.url_forward}><i className="material-icons">chevron_right</i></Link></li>
                                    </ul>
            
                                </form>
                                </div>
                </div>
            </div>
        )
    }
}

Goals.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Goals);