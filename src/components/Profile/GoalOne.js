import React from "react"
import Goals from "./Goals"
import Axios from "axios"
import M from "materialize-css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Redirect } from "react-router-dom"


class GoalOne extends React.Component {
    constructor(props) {
        
        super(props)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            goal1: " one:",
            buttonText: "SUBMIT",
            loading: true,
            redirect: false
        }
        
    
    }


    onChangeFile = e => {
        this.setState({file: e.target.files[0]});
    }
    
    handleClick = e => {
        e.preventDefault();
        let { user } = this.props.auth;
        if (e.target.value == "Save and Return to Dashboard") {
            var redirectLink = "/dashboard"
        } else {
            redirectLink = "/edit-profile/goals/two"
        }
        this.setState({
            buttonText: "Please wait...",
            redirectLink: redirectLink
        })

        var formData = new FormData()
        formData.append("goal_title", this.state.goal_title)
        formData.append("goal_desc", this.state.goal_desc)
        formData.append("goal_saved", this.state.goal_saved)
        formData.append("goal_cost", this.state.goal_cost)
        formData.append("uniqueID", user.id)
        formData.append("goal_images", this.state.file)
        Axios.post("/api/goals/update-or-create/one"/*, {
            goal_title: this.state.goal1,
            goal_desc: this.state.goal1_desc,
            goal_cost: this.state.goal_cost,
            goal_saved: this.state.goal_saved,
            uniqueID: user.id,
        }*/
        , formData, {headers: {'Content-type': 'multipart/form-data'}}
            
            )
            .then(res => {
                
                    this.setState({
                        
                        redirect: true
                    })
                }
            )
        }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        /*if (e.target.id == "goal_cost" || e.target.id == "goal_saved") {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }/*/
    }

    componentDidMount() {
        M.Modal.init(this.Modal);

        let { user } = this.props.auth;
        Axios.get(`/api/goals/${user.id}/one`)

             .then(res => {
                 console.log(res.data)
                 if (res.data.message === "record found") {
                     this.setState({
                        goal_title: res.data.doc.goal_title,
                        goal_desc: res.data.doc.goal_desc,
                        goal_saved: res.data.doc.goal_saved,
                        goal_cost: res.data.doc.goal_cost,
                        image_url: res.data.doc.image_url,
                     })
                 }
             })
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectLink} />
          }
        return(
            <div>
            <Goals  onChange={this.handleChange}
                    goals="goal_title"
                    goal_desc="goal_desc"
                    goal_cost="goal_cost"
                    goal_saved="goal_saved"
                    onSubmit={this.handleClick}
                    buttonText={this.state.buttonText}
                    onChangeFile={this.onChangeFile}
                    active1="active waves-effect blue accent-3"
                    url_forward="/edit-profile/goals/two"
                    url_back="/edit-profile/goals/one"
                    goalsValue={this.state.goal_title}
                    goal_descValue={this.state.goal_desc}
                    goal_costValue={this.state.goal_cost}
                    goal_savedValue={this.state.goal_saved}
                    num = "one"
                    goal_title = "One"
                    nextGoal = "two"
                    />
            </div>
        )
    }
}

GoalOne.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(GoalOne);