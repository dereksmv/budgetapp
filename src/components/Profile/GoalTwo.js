import React from "react"
import Goals from "./Goals"
import Axios from "axios"
import M from "materialize-css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class GoalTwo extends React.Component {
    constructor(props) {
        
        super(props)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            buttonText: "SUBMIT",
            loading: true
        }
        
    
    }

    onChangeFile = e => {
        this.setState({file: e.target.files[0]});
    }

    handleClick = e => {
        e.preventDefault();
        let { user } = this.props.auth;
        this.setState({
            buttonText: "Please wait..."
        })

        var formData = new FormData()
        formData.append("goal_title", this.state.goal_title)
        formData.append("goal_desc", this.state.goal_desc)
        formData.append("goal_saved", this.state.goal_saved)
        formData.append("goal_cost", this.state.goal_cost)
        formData.append("uniqueID", user.id)
        formData.append("goal_images", this.state.file)
        Axios.post("/api/goals/two"/*, {
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
                    buttonText: "SUBMIT"
                })
                M.toast({ html: res.data.message })
            })
        
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
        let { user } = this.props.auth;
        Axios.get(`/api/goals/${user.id}/two`)

             .then(res => {
                 if (res.data.message === "record found") {
                     this.setState({
                        goal_title: res.data.doc.goal_title,
                        goal_desc: res.data.doc.goal_desc,
                        goal_saved: res.data.doc.goal_saved,
                        goal_cost: res.data.doc.goal_cost,
                        image_url: res.data.doc.image_url
                     })
                 }

             })
    }

  

    render() {

        return(
            <div>
            <Goals  onChange={this.handleChange}
                    goals="goal_title"
                    goal_desc="goal_desc"
                    goal_cost="goal_cost"
                    goal_saved="goal_saved"
                    goal_num={this.state.goal2}
                    onSubmit={this.handleClick}
                    buttonText={this.state.buttonText}
                    onChangeFile={this.onChangeFile}
                    active2="active waves-effect blue accent-3"
                    url_forward="/edit-profile/goals/three"
                    url_back="/edit-profile/goals/one"
                    goalsValue={this.state.goal_title}
                    goal_descValue={this.state.goal_desc}
                    goal_costValue={this.state.goal_cost}
                    goal_savedValue={this.state.goal_saved}
                    />
                    </div>
        )
    }
}

GoalTwo.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(GoalTwo);