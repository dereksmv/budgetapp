import React from "react"
import TwoColumnForm from "./TwoColumnForm"
import Axios from "axios"
import M from "materialize-css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Redirect } from "react-router-dom"

class NetworthAssets extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            type: "networth"
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let { user } = this.props.auth;
        this.setState({uniqueID: user.id})

        Axios.get(`/api/networth/${user.id}/assets`)
             .then(res => {
                 if (res.data._id) {
                     this.setState(
                         res.data,
                     )
                 }
             })

    }

    handleClick = e => {
        e.preventDefault()
        if (e.target.value == "Save and Return to Dashboard") {
            var redirectLink = "/dashboard"
        } else {
            redirectLink = "/edit-profile/networth/liabilities"
        }
        this.setState({
            type: "networth",
            redirectLink: redirectLink
        })
        console.log(this.state)
        
        Axios.post("/api/networth/update", this.state)

             .then(res => {

                 this.setState({
                     redirect: true
                 })
             })
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectLink} />
          }

        return (
            <div>
                <TwoColumnForm
                    onSubmit={this.handleClick}
                    onChange={this.onChange}
                    boldText="Networth"
                    titleText="Calculator"
                    titleOfEntry="assets"
                    label1="Real Estate"
                    input1="Real_Estate"
                    label2="Checking Account"
                    input2="checking"
                    label3="Savings Account"    
                    input3="asset_savings"
                    label4="Retirement Account"
                    input4="retirement"
                    label5="Investments"
                    input5="investments"
                    label6="Vehicles"
                    input6="vehicles"
                    label7="Other"
                    input7="other_assets"
                    initialVal1 = {this.state.Real_Estate}
                    initialVal2 = {this.state.checking}
                    initialVal3 = {this.state.asset_savings}
                    initialVal4 = {this.state.retirement}
                    initialVal5 = {this.state.investments}
                    initialVal6 ={this.state.vehicles}
                    initialVal7 = {this.state.other_assets}

                    active1="active blue accent-3"
                    url_forward="/edit-profile/networth/liabilities"
                    form_message="Please save your assets before moving onto the next page!"
                    networthType = "Assets"
                    otherType = "liabilities"
                    onSubmit = {this.handleClick}
                />
            </div>
        )
    }
}

NetworthAssets.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(NetworthAssets);