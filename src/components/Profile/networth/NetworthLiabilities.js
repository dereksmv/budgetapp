import React from "react"
import TwoColumnForm from "./TwoColumnForm"
import Axios from "axios"
import M from "materialize-css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

class NetworthLiabilities extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            type: "liabilities"
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let { user } = this.props.auth;
        this.setState({
            uniqueID: user.id
        })
    }

    handleClick = e => {
        e.preventDefault()
        const { user } = this.props.auth;
        console.log(user.id)
        console.log(this.state.type)
        this.setState({
            uniqueID: user.id, 
            type: "liabilities"
        })
        console.log(this.state)
        
        Axios.post("/api/networth/update", this.state)

             .then(res => {

                 M.toast({html: res.data.message})
             })
    }

    
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }



    
    render() {
        return (
            <div>
                <TwoColumnForm
                    onChange={this.handleChange}
                    onSubmit={this.handleClick}
                    boldText="Networth"
                    titleText="Calculator"
                    titleOfEntry="liabilities"
                    label1="Mortgage(s)"
                    input1="mortgages"
                    label2="Consumer Debt"
                    input2="consumer_debt"
                    label3="Personal Loans"
                    input3="personal_loans"
                    label4="Student Loans"
                    input4="student_loans"
                    label5="Medical Debt"
                    input5="medical_debt"
                    label6="Vehicle loans"
                    input6="vehicle_loans"
                    label7="Other"
                    input7="other_liabilities"
                    url_back="/edit-profile/networth/assets"
                    active2="active blue accent-3"
                />
            </div>
        )
    }
}

NetworthLiabilities.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(NetworthLiabilities);