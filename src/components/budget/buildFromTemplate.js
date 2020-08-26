import React from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../../actions/authActions";
import { Redirect } from "react-router-dom"

import Axios from "axios";
import accounting from "accounting-js"
import M from "materialize-css";


class buildFromTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.generateMonth = this.generateMonth.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.postToServer = this.postToServer.bind(this);
        this.state ={
            budget: [],
            check: [],
            income: 0,
            budgetCost: 0
        }
    }

    handleChange(e) {

        //since the number of inputs can vary, this variable will contain   
        var lengthOfInputs = document.getElementsByTagName("input").length;
        var sumOfInputs = 0
        console.log(lengthOfInputs)
        var newArr = []
        
        //we use this loop to create an object that will go into state.budget
        for(var j = 0; j < lengthOfInputs; j++) {
            // create an empty arr that will contain 
            
            //the input ids all match the budget category, and so this logic dictates that the obj.budget items should contain all values
            //for every input with an id matching the one that we are working on at the moment
            if (document.getElementsByTagName("input")[j].id == e.target.id) {
                newArr.push({ budgetItem: document.getElementsByTagName("input")[j].name, value: document.getElementsByTagName("input")[j].value })
                //we build this object that will be stored within state.budget, so each budget category will have an object
                //within the categories are the budget items
    
                var obj = {
                    category: e.target.id,
                    budgetItems: newArr  
                }
                }  
        }

        
        // we create an array that contains the entirety of state.budget
        var arr = [...this.state.budget]
        //if the budget already has items added to it
       
            //iterate through the array in order to find the category that we're editing right now
            
                // if the category exists in the array, we need to remove it before updating the array
              
                   
        for(var i = 0; i < lengthOfInputs; i++) {
            if (document.getElementsByTagName("input")[i].value !== "Save") {
            sumOfInputs += parseFloat(document.getElementsByTagName("input")[i].value);
            
            this.setState({
                budgetCost: sumOfInputs,

            }, this.setState({
                leftover: this.state.income - parseInt(this.state.budgetCost)
            })
        
        )
        
        if (arr.find(o => o.category === e.target.id)) {
                  
            var index = arr.indexOf(arr.find(o => o.category === e.target.id)) 
            //remove the category from the array
            arr.splice(index, 1);
            //replace the category with obj
            arr[index] = obj
            //we mutated the arr variable to remove the old value, and replace it with our new one
         this.setState({
                budget: arr
            })
         }
            //Now we write logic for what happens when we don't find the category in the array
          else {
             arr.push(obj)
             this.setState({
                budget: arr
            })
        
            }
          
        }
    } 
    M.toast({html: `You have $${this.state.leftover} left to allocate`})
  
    }

    postToServer(e) {
        e.preventDefault();
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    var d = new Date();
    var month = monthNames[d.getMonth()]
    var year = d.getFullYear()
        const userID = this.props.match.params.user_id;
        Axios.post(`/api/budgets/${userID}/new/`, {budget: this.state.budget, name: document.getElementById("templateName").textContent + " " + month + " " + year})
             .then(res => {
                 this.setState({
                     redirectLink: res.data.redirectLink,
                     redirect: true
                 })
             })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirectLink} />
        }
      }

    generateMonth() {
        var month = new Date().getMonth() + 1;
        if (month == 1) {
            return "January"
        } if (month == 2) {
            return "February"
        } if (month == 3) {
            return "March"
        } if (month == 4) {
            return "April"
        } if (month == 5) {
            return "May"
        } if (month == 6) {
            return "June"
        } if (month == 7) {
            return "July"
        } if (month == 8) {
            return "August"
        } if (month == 9) {
            return "September"
        } if (month == 10) {
            return "October"
        } if (month == 11) {
            return "November"
        } else {
            return "December"
        }
    }



    


    componentDidMount() {

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems);
          });
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
          });
        const userID = this.props.match.params.user_id;
        const budgetID = this.props.match.params._id  
        
        Axios.get(`/api/networth/dashboard-display/${userID}`)
             .then(res => {
                 if (res.data.income) {
                     var incomeVar = accounting.unformat(res.data.income)
                     this.setState({
                         income: incomeVar
                     })
                     console.log(this.state.income)
                     
                 } else {
                    function warningModal() {
                    const elem = document.getElementById('warningModal');
                    M.Modal.init(elem).open();
                    
                    }

                    warningModal()
                 }
            } 
             
             )

        Axios.get(`/api/new-template/retrieve_one/${userID}/${budgetID}`)
             .then(res => {
                 this.setState({
                     data: res.data
                 })
                 document.getElementById("templateName").textContent = res.data.template_name
                for (var i = 0; i < res.data.categories.length; i++) {
                    var form = document.createElement("form")
                    form.classList.add("container")
                    var wrapper = document.createElement("div")
                    wrapper.classList.add("container")
                    wrapper.classList.add("col")
                    wrapper.classList.add("s12")
                    wrapper.classList.add("l6")
                    
                    var container = document.createElement("div")
                    container.classList.add("lighten-2")
                    container.classList.add("card-panel")
                    container.classList.add("grey")
                    container.classList.add("z-depth-3")
                    wrapper.appendChild(container)
                    var header = document.createElement("h5")
                    header.textContent = res.data.categories[i].category;
                    header.classList.add("section")
                    form.appendChild(header)
                    container.appendChild(form)
                    document.getElementById("budget-items").appendChild(wrapper)
                    for (var j = 0; j < res.data.categories[i].categoryBudgetItems.length; j++) {
                    
                    var field = document.createElement("div")
                    field.classList.add("input-field")
                    var inputField = document.createElement("input")
                    inputField.type = "TEXT"
                    inputField.classList.add("active")
                    inputField.placeholder = res.data.categories[i].categoryBudgetItems[j]
                    var replaceWithDashes = res.data.categories[i].categoryBudgetItems[j].split(" ").join("-")
                    inputField.name = replaceWithDashes
                    var replaceCategoryWithDashes = res.data.categories[i];
                    inputField.id = replaceCategoryWithDashes.category
                    inputField.value = 0
                    inputField.onchange = this.handleChange

                    var label = document.createElement("label")
                    label.innerHTML = res.data.categories[i].categoryBudgetItems[j]
                    label.htmlFor = replaceWithDashes
                    field.appendChild(label)
                    field.appendChild(inputField)
                    form.appendChild(field)
                    
                                        }
                }   
                M.updateTextFields()
             })
    }

    componentDidUpdate() {
        if (document.getElementById("progress-bar")) {
            document.getElementById("progress-bar").remove();
            var determinate = document.createElement("div")
            determinate.classList.add("determinate")
            determinate.style.width = `${(this.state.budgetCost/this.state.income) * 100}%`
            var determinateContainer = document.getElementById("progress-bar-location")
            determinateContainer.appendChild(determinate)
        } else {
            var determinate = document.createElement("div")
            determinate.classList.add("determinate")
            determinate.style.width = `${(this.state.budgetCost/this.state.income) * 100}%`
            var determinateContainer = document.getElementById("progress-bar-location")
            determinateContainer.appendChild(determinate)
        }
    }



    render() {
       
        return(
            <div className="container">
                <div>
                    
            <h4 id="templateName"></h4>
        <p>{new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}</p>


        <div className="progress" id="progress-bar-location">
     
     </div>
     </div>
        <form>
            <div id="budget-items" className="row">
                
                
            </div>
            <div class="fixed-action-btn">
            <div>
                <button className="btn blue accent-3 large col s12 l2" onClick={e => this.postToServer(e)} >Save</button>
            </div>
</div>
            </form>
            <div id="warningModal" class="modal">
                    <div class="modal-content">
                        <h4>Set Up Your Income</h4>
                        <p>We recomment that you edit your profile to set up a monthly income, so that we can track your budget progress</p>
                    </div>
                <div class="modal-footer">
                <a href="/dashboard#income" class="modal-close waves-effect waves-green btn-flat">Set up my Income</a>
            </div>
            </div>
            {this.renderRedirect()}
            
</div>

        )
    }

}

buildFromTemplate.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(buildFromTemplate);