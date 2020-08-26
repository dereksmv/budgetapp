import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../../actions/authActions";
import Assets from "./Assets"
import Liabilities from "./Liabilities"
import Axios from "axios";
import accounting from "accounting-js"
import M from "materialize-css";
import Loading from "../layout/Loading"


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    
    this.handleChange = this.handleChange.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
    this.convertToCurrency = this.convertToCurrency.bind(this);
    this.checkForNumber = this.checkForNumber.bind(this)

    this.state = {
      profile_img: <i className="large material-icons">account_circle</i>,
      goal1: "Enter a goal in your profile!",
      goal1_desc: "Add a short description of your goal! We'll tell you how close you are to reaching your goal!",
      goal1_img: "https://www.komando.com/wp-content/uploads/2019/05/beach-vacation.jpg",
      goal2: "Enter a goal in your profile!",
      goal2_desc: "Add a short description of your goal! We'll tell you how close you are to reaching your goal!",
      goal2_img: "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale",
      goal3: "Enter a goal in your profile!",
      goal3_desc: "Add a short description of your goal! We'll tell you how close you are to reaching your goal!",
      goal3_img: "https://robbreportedit.files.wordpress.com/2016/04/01-ford-gt-front-three-quarter1.jpg",
      income: "Enter your income",
      debt: "Enter your debts",
      savings: "Enter your savings",
      loading: true
    }
  }

  checkForNumber() {
    if (this.state.assetTotal - this.state.liabilityTotal) {
      return "Your networth is: " + accounting.formatMoney(this.state.assetTotal - this.state.liabilityTotal)
    } else {
      return "Looks like you haven't set up your networth in your profile yet."
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  convertToCurrency(num) {
    if (isNaN(num)) {
      return num = ""
    } else {
      return accounting.formatMoney(num)
    }
  }

  convertTo100(num) {
    if (num > 100) {
      return (num = 100)
    } else {
      return num
    }
  }

 
 

  handleChange = e => {
     this.setState({
       [e.target.id]: accounting.formatMoney(e.target.value),
     })
     if ((e.target.value) === "") {
      this.setState({
        dollarSign: "",
        [e.target.id]: `Enter your ${e.target.id}`
      })
     }
  }

  saveInfo = (url, entryItem) => {
    let { user } = this.props.auth;
    if (entryItem === "income") {
      M.toast({html: 'We updated your monthly income!', classes: "blue accent-3 flow-text"})
      return Axios.post(url, {uniqueID: user.id, income: this.state.income});
      
    }
    if (entryItem === "debt") {
      M.toast({html: 'We updated your household debts!', classes: "blue accent-3 flow-text"})
      return Axios.post(url, {uniqueID: user.id, debt: this.state.debt})
    }
    else {
      M.toast({html: 'We updated your household savings!', classes: "blue accent-3 flow-text"})
      return Axios.post(url, {uniqueID: user.id, savings: this.state.savings})
    }
  }

componentDidMount() {
  let { user } = this.props.auth;

  Axios.get(`/api/networth/dashboard-display/${user.id}`)
       .then(res => {
         if (res.data.message === "record found") {
          this.setState({
            savings: res.data.savings,
            income: res.data.income,
            debt: res.data.debt
          })
         }
        })
        .catch(err => {
          throw (err)
        })
  
  Axios.get(`/api/goals/${user.id}`)
       .then(res => {
         console.log(res.data.doc)
        function handleNumbers(number) {
          const num = parseInt(number)
          if(isNaN(num) === false|| num !== Infinity) {
            return num
          } if (isNaN(num)) {
            return "0"
          } if (num === Infinity) {
            return 100
          }
        }
        function handleCurrency(x, y) {
          return `Progress: ${accounting.formatMoney(x)}/${accounting.formatMoney(y)}`
        }
         //goal one saved first
         if (typeof res.data.doc[0] !== "undefined" && res.data.doc[0].goal_number === "one") {
         this.setState({
           goal1: res.data.doc[0].goal_title,
           goal1_desc: res.data.doc[0].goal_desc +  " "  + handleCurrency(res.data.doc[0].goal_saved, res.data.doc[0].goal_cost),
           goal1_img: res.data.doc[0].image_url,
           goal1_progress: handleNumbers(((res.data.doc[0].goal_saved)/(res.data.doc[0].goal_cost)) * 100)
         })
        }
        //goal 2 saved first
        if (typeof res.data.doc[0] !== "undefined" && res.data.doc[0].goal_number === "two") {
          this.setState({
            goal2: res.data.doc[0].goal_title,
            goal2_desc: res.data.doc[0].goal_desc +  " "  + handleCurrency(res.data.doc[0].goal_saved, res.data.doc[0].goal_cost),
            goal2_img: res.data.doc[0].image_url,
            goal2_progress: handleNumbers(((res.data.doc[0].goal_saved)/(res.data.doc[0].goal_cost)) * 100)
          })
         }
         //goal 3 saved first
         if (typeof res.data.doc[0] !== "undefined" && res.data.doc[0].goal_number === "three") {
          this.setState({
            goal3: res.data.doc[0].goal_title,
            goal3_desc: res.data.doc[0].goal_desc +  " "  + handleCurrency(res.data.doc[0].goal_saved, res.data.doc[0].goal_cost),
            goal3_img: res.data.doc[0].image_url,
            goal3_progress: handleNumbers(((res.data.doc[0].goal_saved)/(res.data.doc[0].goal_cost)) * 100)
          })
         }
         //goal one saved second
        if (typeof res.data.doc[1] !== "undefined" && res.data.doc[1].goal_number === "one") {
          this.setState({
            goal1: res.data.doc[1].goal_title,
            goal1_desc: res.data.doc[1].goal_desc +  " "  + handleCurrency(res.data.doc[1].goal_saved, res.data.doc[1].goal_cost),
            goal1_img: res.data.doc[1].image_url,
            goal1_progress: handleNumbers(((res.data.doc[1].goal_saved)/(res.data.doc[1].goal_cost)) * 100)
          })
         }
         //goal two saved second
         if (typeof res.data.doc[1] !== "undefined" && res.data.doc[1].goal_number === "two") {
          this.setState({
            goal2: res.data.doc[1].goal_title,
            goal2_desc: res.data.doc[1].goal_desc +  " "  + handleCurrency(res.data.doc[1].goal_saved, res.data.doc[1].goal_cost),
            goal2_img: res.data.doc[1].image_url,
            goal2_progress: handleNumbers(((res.data.doc[1].goal_saved)/(res.data.doc[1].goal_cost)) * 100)
          })
         }
         ///goal three saved second
         if (typeof res.data.doc[1] !== "undefined" && res.data.doc[1].goal_number === "three") {
          this.setState({
            goal3: res.data.doc[1].goal_title,
            goal3_desc: res.data.doc[1].goal_desc +  " "  + handleCurrency(res.data.doc[1].goal_saved, res.data.doc[1].goal_cost),
            goal3_img: res.data.doc[1].image_url,
            goal3_progress: handleNumbers(((res.data.doc[1].goal_saved)/(res.data.doc[1].goal_cost)) * 100)
          })
         }
         //goal one saved third
         if (typeof res.data.doc[2] !== "undefined" && res.data.doc[2].goal_number === "one") {
          this.setState({
            goal1: res.data.doc[2].goal_title,
            goal1_desc: res.data.doc[2].goal_desc +  " "  + handleCurrency(res.data.doc[2].goal_saved, res.data.doc[2].goal_cost),
            goal1_img: res.data.doc[2].image_url,
            goal1_progress: handleNumbers(((res.data.doc[2].goal_saved)/(res.data.doc[2].goal_cost)) * 100)
          })
         }
        //goal two saved third
         if (typeof res.data.doc[2] !== "undefined" && res.data.doc[2].goal_number === "two") {
          this.setState({
            goal2: res.data.doc[2].goal_title,
            goal2_desc: res.data.doc[2].goal_desc +  " "  + handleCurrency(res.data.doc[2].goal_saved, res.data.doc[2].goal_cost),
            goal2_img: res.data.doc[2].image_url,
            goal2_progress: handleNumbers(((res.data.doc[2].goal_saved)/(res.data.doc[2].goal_cost)) * 100)
          })
         }
         //goal three saved third
         if (typeof res.data.doc[2] !== "undefined" && res.data.doc[2].goal_number === "three") {
          this.setState({
            goal3: res.data.doc[2].goal_title,
            goal3_desc: res.data.doc[2].goal_desc +  " "  + handleCurrency(res.data.doc[2].goal_saved, res.data.doc[2].goal_cost),
            goal3_img: res.data.doc[2].image_url,
            goal3_progress: handleNumbers(((res.data.doc[2].goal_saved)/(res.data.doc[2].goal_cost)) * 100)
          })
         }
         this.setState({
           loading: false
         })
      })

        /*
           goal2: res.data.doc[1].goal_title,
           goal2_desc: res.data.doc[1].goal_desc,
           goal2_img: res.data.doc[1].image_url,
           goal3: res.data.doc[2].goal_title,
           goal3_desc: res.data.doc[2].goal_desc,
           goal3_img: res.data.doc[2].image_url,

         })
       })*/

  M.AutoInit();

  Axios.get(`/api/networth/${user.id}/assets`)
       .then(res => {
         this.setState(res.data)
       })
       .catch(err => {
         console.log(err)
       })

  Axios.get(`/api/networth/${user.id}/liabilities`)
       .then(res => {
         this.setState(res.data)
       })

  Axios.get(`/api/networth/asset/total/${user.id}/`)
       .then(res => {
         console.log(res)
         if (isNaN(res.data.assetTotal)) {
           return
         } else {
           console.log("is a number")
           this.setState(res.data)
         }
       })

  Axios.get(`/api/networth/liabilities/total/${user.id}`)
       .then(res => {
         console.log(res)
         if (isNaN(res.data.liabilityTotal)) {
           console.log("is not a number")
           return
         } else {
           console.log("is a number")
           this.setState(res.data)
         }
       })

    }

render() {
  const { user } = this.props.auth
    if (this.state.loading) {
      return (
        <Loading/>
      )
    }

    return (
    <div>
      
          <div className="row">
        <div className="col l2 m12 blue accent-3 hide-on-med-and-down z-depth-5" style={{height: "100%", position: "fixed"}}>
          <div className="container center-align">
          <div className="section center-align">{this.state.profile_img}</div>
          <p className="white-text center-align flow-text">{user.name}</p>
          <div className="divider"></div>
          </div>
            <div className="white-text container col l12 left-align">
                
                <Link to="/edit-profile" className="white-text"><p className="btn col l12"><i className="tiny material-icons white-text">account_box</i> Profile</p></Link>
                <Link to="/budgets/new" className="white-text"><p className="btn col l12"><i className="tiny material-icons">create</i> Create a Budget</p></Link>
                <Link to="/budgets"><p className="btn col l12"><i className="tiny material-icons">assessment</i> View Budgets</p></Link>
                <p className="btn col l12" onClick={this.onLogoutClick}><i className="tiny material-icons">exit_to_app</i> Logout</p>
            </div>
        </div>

        <div className="col l10 push-l2">
        <div className="row">
          <div className="container section center-align">
        <b>Hey there, {user.name.split(" ")[0]}.</b><p>This is your profile. No one can see this but you.</p>
        </div>
        <div className="divider"/>
        </div>
        <div className="row">
          <div className="container center-align">
                <span className="flow-text">{user.name.split(" ")[0]}'s goals</span>
          </div>
        </div>
        <div className="row">
        <Link to="/edit-profile/goals/one" className="black-text">
          <div className="col l4">
            
            <div className="card medium hoverable grey lighten-2">
              <div className="card-image">
                  <img src={this.state.goal1_img} alt="Represents your first goal"/>
                    <span className="card-title">
                      {this.state.goal1} 
                    </span>
                </div>
                  <p className="card-content">{this.state.goal1_desc} 
                    <span className="progress section col l10 push-l1 tooltipped white" style={{height: "10px"}} data-position="bottom" data-tooltip={`You are ${this.state.goal1_progress}% to your goal!`}>
                    <span className="determinate blue accent-3"  style={{width: `${this.convertTo100(this.state.goal1_progress)}%`}}>
                    </span>
                    </span>
                  </p>

              </div>
            
            </div>
            </Link>
            <Link to="/edit-profile/goals/two" className="black-text">
              <div className="col l4">
              <div className="card medium hoverable grey lighten-2">
              <div className="card-image">
                <img src={this.state.goal2_img} alt="Represents your second goal"/>
                  <span className="card-title">{this.state.goal2}</span>
                    </div>
                <p className="card-content">{this.state.goal2_desc}
                    <span className="progress section col l10 push-l1 tooltipped white" style={{height: "10px"}}data-position="bottom" data-tooltip={`You are ${this.state.goal2_progress}% to your goal!`}>
                      <span className="determinate blue accent-3"  style={{width: `${this.convertTo100(this.state.goal2_progress)}%`}}/>
                    </span>
                </p>
                
                </div>
              </div>
              </Link>
              <Link to="/edit-profile/goals/three" className="black-text">
              <div className="col l4">
            <div className="card medium hoverable small grey lighten-2">
              <div className="card-image">
                <img src={this.state.goal3_img} alt="Represents your third goal"/>
                  <span className="card-title">{this.state.goal3}</span>
                    </div>
                <p className="card-content">{this.state.goal3_desc}
                  <span className="progress section col l10 push-l1 tooltipped white" style={{height: "10px"}} data-position="bottom" data-tooltip={`You are ${this.state.goal3_progress}% to your goal!`}>  
                    <span className="determinate blue accent-3"  style={{width: `${this.convertTo100(this.state.goal3_progress)}%`}}/>
                  </span>
              </p>
                </div>
            </div>  
            <div className="divider"/> 
            </Link>
            </div>
            
            
          </div>
    <div className="row col l10 push-l2" >
      <div className="row">
        <div className="container center-align">
          <span id="income" className="flow-text">{user.name.split(" ")[0]}'s debts and income</span>
        </div>
      </div>
      <div className="col l4">
        <div className="card-panel grey lighten-2">
          <h6>Household Monthly Income:</h6> 
          <p className="flow-text">{this.state.dollarSign}{this.state.income}</p>
          <form onSubmit={e => {e.preventDefault(); this.saveInfo("/api/networth/dashboard/income", "income")}}>
            <input placeholder="Update your income" id="income" type="number" className="validate" onChange={this.handleChange}/>
            <button className="btn waves-effect waves-light" type="submit" name="action">Save
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
      <div className="col l4">
        <div className="card-panel grey lighten-2">
          <h6>Household Debts:</h6> 
          <p className="flow-text">{this.state.dollarSign}{this.state.debt}</p>
          <form onSubmit={e => {e.preventDefault(); this.saveInfo("/api/networth/dashboard/debt", "debt")}}>
          <input placeholder="Update your debts" id="debt" type="number" className="validate" onChange={this.handleChange}/>
          <button className="btn waves-effect waves-light" type="submit" name="action">Save
            <i className="material-icons right">send</i>
          </button>
          </form>
        </div>
      </div>
      <div className="col l4">
        <div className="card-panel grey lighten-2">
          <h6>Household Savings:</h6> 
          <p className="flow-text">{this.state.dollarSign}{this.state.savings}</p>
          <form onSubmit={e => {e.preventDefault(); this.saveInfo("/api/networth/dashboard/savings", "savings")}}>
          <input placeholder="Update your savings" id="savings" type="number" className="validate" onChange={this.handleChange}/>
          <button className="btn waves-effect waves-light" type="submit" name="action">Save
            <i className="material-icons right">send</i>
          </button>
          </form>
        </div>
      </div>
      <div className="divider"/>
    </div>
    <div className="row">
      <div className="col l5 push-l2 s12">
        <div className="card-panel grey lighten-2">
          <h4>Assets</h4>
          <Assets
          Real_Estate={this.convertToCurrency(this.state.Real_Estate)}
          checking={this.convertToCurrency(this.state.checking)}
          savings={this.convertToCurrency(this.state.asset_savings)}
          retirement={this.convertToCurrency(this.state.retirement)}
          investments={this.convertToCurrency(this.state.investments)}
          vehicles={this.convertToCurrency(this.state.vehicles)}
          other_assets={this.convertToCurrency(this.state.other_assets)}
          />
        </div>
      </div>
      <div className="col l5 push-l2 s12">
        <div className="card-panel grey lighten-2">
          <h4>Liabilities</h4>
          <Liabilities
          mortages={this.convertToCurrency(this.state.mortgages)}
          consumer_debt={this.convertToCurrency(this.state.consumer_debt)}
          personal_loans={this.convertToCurrency(this.state.personal_loans)}
          student_loans={this.convertToCurrency(this.state.student_loans)}
          vehicle_loans={this.convertToCurrency(this.state.vehicle_loans)}
          medical_debt={this.convertToCurrency(this.state.medical_debt)}
          other_liabilities={this.convertToCurrency(this.state.other_liabilities)}
          />
        </div>
      </div>
    <div className="row">
      
      <div className="container col l10 push-l2">
                <h4>{this.checkForNumber()}</h4>
      </div>
     
    </div>
    <div className="container hide-on-large-only">
    <p className='btn blue accent-3' onClick={this.onLogoutClick}><i className="tiny material-icons">exit_to_app</i> Logout</p>
    </div>
  </div>
  
    {/*last div*/}
    </div>
    </div>
    
        );
      }
    }
    Dashboard.propTypes = {
      logoutUser: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired
    };
    const mapStateToProps = state => ({
      auth: state.auth
    });
    export default connect(
      mapStateToProps,
      { logoutUser }
    )(Dashboard);