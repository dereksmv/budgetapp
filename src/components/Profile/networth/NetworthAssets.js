import React from "react"
import TwoColumnForm from "./TwoColumnForm"
import Axios from "axios"
import M from "materialize-css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

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
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({
            type: "networth"
        })
        console.log(this.state)
        
        Axios.post("/api/networth/update", this.state)

             .then(res => {

                 M.toast({html: res.data.message})
             })
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {

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
                    active1="active blue accent-3"
                    url_forward="/edit-profile/networth/liabilities"
                    form_message="Please save your assets before moving onto the next page!"
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