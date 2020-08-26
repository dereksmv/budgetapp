import React from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../../actions/authActions";

import Axios from "axios";
import accounting from "accounting-js"
import M from "materialize-css";
import Loading from "../layout/Loading"

class ViewBudgets extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
          loading: true
        }
      }

      

      componentDidMount() {
       
        let { user } = this.props.auth;
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        var d = new Date();
        var month = monthNames[d.getMonth()]
        var index = monthNames.indexOf(month)
        var spliced = monthNames.splice(index, 12 - index)
        var ordered = spliced.concat(monthNames)
        console.log(ordered)
        Axios.get(`/api/budgets/retrieve-all/${user.id}`)

              .then(res => {
                console.log(res.data)
              if(res.data.length > 0) {

                for (var i = 0; i < res.data.length; i++){
                  console.log(res.data[i].date)   
                  if (ordered.includes(res.data[i].date) && document.getElementById(res.data[i].date) == null)  {
                    console.log(true)
                    var containerDiv = document.createElement("div")
                    var monthHeader = document.createElement("h4")
                    monthHeader.id = res.data[i].date
                    monthHeader.textContent = res.data[i].date
                    containerDiv.appendChild(monthHeader)
                    document.getElementById("budget-list").appendChild(containerDiv)
                  }
                    if (ordered.includes(res.data[i].date)) {
                    var unOrderedList = document.createElement("ul")
                    var listItem = document.createElement("li")
                    
                    var budgetLink = document.createElement("a")
                    budgetLink.href = `/budgets/view/${user.id}/${res.data[i]._id}`
                    budgetLink.textContent = res.data[i].budgetName
                    listItem.appendChild(budgetLink)
                    unOrderedList.appendChild(listItem)
                    containerDiv.appendChild(unOrderedList)
                }
                
              }
            } else {
              var messageContainer = document.getElementById("budget-list")
              var header = document.createElement("h5");
              header.textContent = "It looks like you haven't created any budgets yet."
              var pText = document.createElement("p")
              var link = document.createElement("a")
              link.href = "/budgets/new"
              link.textContent = "here"
              pText.textContent = "You can can build a new budget "
              pText.appendChild(link)
              messageContainer.appendChild(header)
              messageContainer.appendChild(pText)
            }

            
      })
      this.setState({
        loading: false
      })

      
    }



    render() {
      
        return (
            <div>
              <div className="container">
                <h2>Your Saved Budgets</h2>
                <div id="budget-list">
                  
              </div> 
                </div>
            </div>
        )
    }
}

ViewBudgets.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(ViewBudgets);