import React from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../../actions/authActions";

import Axios from "axios";
import accounting from "accounting-js"
import M from "materialize-css";
import Loading from "../layout/Loading"

class BudgetViewer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
          
        }
      }

      

    componentDidMount() {
        const userID = this.props.match.params.user_id;
        const budgetID = this.props.match.params.budget_id;
        Axios.get(`/api/budgets/retrieve-one/${userID}/${budgetID}`)
             .then(res => {
                 console.log(res)
                 this.setState({
                     budgetName: res.data.budgetName
                 })
                 console.log(res.data.budget.length)
                 for (var i = 0; i < res.data.budget.length; i++) {
                    var wrapper = document.createElement("div");
                    var container = document.createElement("div")
                    wrapper.classList.add("container")
                    wrapper.classList.add("s12")
                    wrapper.classList.add("col")
                    wrapper.classList.add("l6")
                    container.classList.add("card-panel")
                    container.classList.add("grey")
                    container.classList.add("lighten-2")
                    var categoryHeader = document.createElement("h5")
                    categoryHeader.textContent = res.data.budget[i].category
                    container.appendChild(categoryHeader)
                    var tableContainer = document.createElement("div")
                    var table = document.createElement("table")
                    var tableHead = document.createElement("thead")
                    var tableHeadRow = document.createElement("tr")
                    var tableCategory = document.createElement("th")
                    tableCategory.textContent = "Category"
                    var tablePrice = document.createElement("th")
                    tablePrice.textContent = "Price"
                    var tableBody = document.createElement("tbody")
                    tableHeadRow.appendChild(tableCategory)
                    tableHeadRow.appendChild(tablePrice)
                    tableHead.appendChild(tableHeadRow)
                    table.appendChild(tableHead)
                    table.appendChild(tableBody)
                    tableContainer.appendChild(table)
                    container.appendChild(tableContainer)
                    wrapper.appendChild(container)
                    document.getElementById("budget-entries").appendChild(wrapper)
                    for (var j = 0; j < res.data.budget[i].budgetItems.length; j++) {
                        
                        var tableRow = document.createElement("tr")
                        var categoryData = document.createElement("td")
                        categoryData.textContent = res.data.budget[i].budgetItems[j].budgetItem
                        tableRow.appendChild(categoryData)
                        var priceData = document.createElement("td")
                        priceData.textContent = accounting.formatMoney(res.data.budget[i].budgetItems[j].value)
                        tableRow.appendChild(priceData)
                        tableBody.appendChild(tableRow)
                       
                }
                 }
             })
        
      
    }



    render() {
      
        return (
            <div>
              <div className="container">
        <h2>{this.state.budgetName}</h2>
                <div id="budget-entries" className="row">

                </div>
                  
              </div> 
                </div>
           
        )
    }
}

BudgetViewer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(BudgetViewer);