import React from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Redirect } from "react-router-dom"

import Axios from "axios";
import M from "materialize-css";

class createFromTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.addFormElement = this.addFormElement.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.removeFormElement = this.removeFormElement.bind(this)
        this.newCategoryObject = this.newCategoryObject.bind(this);
        this.createNewCategoryTitle = this.createNewCategoryTitle.bind(this);
        this.postToServer = this.postToServer.bind(this);
        this.handleName = this.handleName.bind(this);
        this.createBudget = this.createBudget.bind(this);
        this.postStandardToServer = this.postStandardToServer.bind(this)
        this.state ={
            budget: [],
            counter: 0,
            budgetItems: [],
            savedBudgetCategories: [],
            Income: 0,
            Donations: 0,
            Savings: 0,
            Housing: 0,
            Child_Care: 0,
            Utilities: 0,
            Food: 0,
            Transportation: 0,
            Healthcare: 0,
            Personal_Money: 0
        }
    }

    postStandardToServer(e) {
        e.preventDefault();
        let { user } = this.props.auth;
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    var d = new Date();
    var month = monthNames[d.getMonth()]
    var year = d.getFullYear()
        const userID = user.id;
        Axios.post(`/api/budgets/${userID}/new/`, {budget: {category: "Standard Budget", budgetItems: this.state.budget}, name: "Standard Budget" + " " + month + " " + year})
             .then(res => {
                 this.setState({
                     redirectLink: res.data.redirectLink,
                     redirect: true
                 })
             })
    }


    createBudget(e) {
        var arr = [...this.state.budget]
        arr.push({ budgetItem: e.target.id, value: e.target.value })
        this.setState({
            budget: arr,
            [e.target.id]: parseInt((parseFloat((e.target.value)))),
        })
        var values = document.getElementsByTagName("input")
        var sum = 0
        for (var i = 0; i < values.length; i++) {
            if (values[i].name === "standardBudget") {
                sum = parseInt(sum) + parseInt(parseFloat(values[i].value).toFixed(2))
                console.log(values[i])
            }

            console.log(arr)
            }

               var leftOver = (this.state.Income * 2) - sum
               if (e.target.id !== "Income") {
                   if (leftOver > 0) {
               M.toast({ html: `You have $${leftOver} left to allocate` })
                   } else {
                       M.toast({ html: `You are $${leftOver} over budget` })
                   }
               }
        }

    handleName(e) {
        this.setState({
            templateName: e.target.value
        })
    }

    removeFormElement(e) {
        var newArr = this.state.budgetItems;
        const index = newArr.indexOf(e.target.id)
        newArr.splice(index, 1);
        console.log(newArr)
        console.log(this.state.savedBudgetCategories)
        M.toast({html: `We removed ${e.target.id} from your budget`})
    }

    addFormElement() {
        function setRandomColor() {
            let tagColor= Math.floor(Math.random() * 10);
            if (tagColor == 1) {
                return "green";
            } if (tagColor == 2) {
                return "red";
            } if (tagColor == 3) {
                return "blue";
            } if (tagColor == 4) {
                return "yellow";
            } if (tagColor == 5) {
                return "pink"
            } if (tagColor == 6) {
                return "orange"
            } if (tagColor == 7) {
                return "light-blue"
            } if (tagColor == 8) {
                return "amber"
            }
            else {
                return "purple";
            }
        }
        this.setState({
            budgetItems: [...this.state.budgetItems, this.state.modal_text]
          }, () => {
            console.log(this.state)
            M.toast({html: `We added ${this.state.budgetItems[this.state.budgetItems.length - 1]} to your budget!`, classes: "blue accent-3 flow-text"})
            var listItem = document.createElement("li");
            var icon = document.createElement("i")
            icon.classList.add("material-icons")
            icon.classList.add("close")
            icon.innerHTML = "close"
            icon.onclick = (e) => this.removeFormElement(e);
            listItem.classList.add("chip")
            listItem.classList.add(setRandomColor())
            listItem.classList.add("white-text")
            icon.id = this.state.modal_text
            listItem.textContent = this.state.budgetItems[this.state.budgetItems.length - 1];
            listItem.appendChild(icon);
            document.getElementById("custom-list-items").appendChild(listItem);
          });
        document.getElementById("add_item").value = ""    }

    handleChange(e) {
        this.setState({
            modal_text: e.target.value
        })
    }

    createNewCategoryTitle(e) {
        this.setState({
            categoryName: e.target.value
        })
    }

    postToServer(e) {
        e.preventDefault();
        let { user } = this.props.auth;
        Axios.post(`/api/new-template/${user.id}`, this.state)
            .then(res => {
                if (res.data.success !== true) {
                M.toast({html: res.data.message})
            } else {
                this.setState({
                    redirectLink: res.data.message,
                    redirect: true
                })
            }})
    }

    newCategoryObject() {
        console.log("modal closed")
        var arr = [...this.state.budgetItems]
        console.log(arr)
        var newArr = [...this.state.savedBudgetCategories, {category: this.state.categoryName, categoryBudgetItems: arr}]
        if (document.contains(document.getElementById(`${this.state.categoryName}_list`)) != true && this.state.categoryName != undefined) {
            console.log()
        this.setState({
            savedBudgetCategories: newArr
        }, () => {

         console.log(this.state.savedBudgetCategories)
         var categoryHeader = document.createElement("h6")
                categoryHeader.innerHTML = this.state.savedBudgetCategories[this.state.savedBudgetCategories.length - 1].category
                var listNode = document.createElement("ul")
                listNode.appendChild(categoryHeader)
                listNode.id = `${this.state.categoryName}_list`
                listNode.classList.add("collection")
                listNode.classList.add("col")
                listNode.classList.add("s6")
                listNode.classList.add("row")
                document.getElementById("template-preview").appendChild(listNode)
                console.log(this.state.savedBudgetCategories[this.state.savedBudgetCategories.length - 1].categoryBudgetItems.length)
                for (var j = 0; j < this.state.savedBudgetCategories[this.state.savedBudgetCategories.length - 1].categoryBudgetItems.length; j++) {
                        console.log(this.state.savedBudgetCategories[this.state.savedBudgetCategories.length - 1].categoryBudgetItems[j])
                        var li = document.createElement("li")
                        li.innerHTML = this.state.savedBudgetCategories[this.state.savedBudgetCategories.length - 1].categoryBudgetItems[j];
                        li.classList.add("collection-item")
                        listNode.appendChild(li)
                    
                        
                    }
                    this.setState({
                        budgetItems: []
                    })
                    var budgetCategoryInput = document.getElementById("current-category")
                var fieldWhereTagsGo = document.getElementById("custom-list-items")
                budgetCategoryInput.value = ""
                fieldWhereTagsGo.textContent = ""
        })
    }
   }



    componentDidMount() {
        M.Tabs.init(this.Tabs)
        
        document.getElementById("standard").classList.remove("active")
        document.getElementById("NewTemp").classList.remove("active")

        M.AutoInit()
        M.updateTextFields()

        var standIn = () => this.newCategoryObject()
        var clearModal = () => {
            this.setState({
                budgetItems: []
            })
            
                var budgetCategoryInput = document.getElementById("current-category")
                var fieldWhereTagsGo = document.getElementById("custom-list-items")
                budgetCategoryInput.value = ""
                console.log(this.state.budgetItems || "not found")
                fieldWhereTagsGo.textContent = ""
                
        }

        document.addEventListener('DOMContentLoaded', function() {
            var options = {
                onCloseEnd: standIn,
                onOpenStart: clearModal
              }
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, options);
          })

        let {user} = this.props.auth;
        
        function loadTemplates() {
            const userID = user.id;
            Axios.get(`/api/new-template/retrieve_all/${user.id}`)
                 .then(res => {
                     var list = document.createElement("ul");
                     var idToSearch ="saved-template-list";
                     var appendingListTo = document.getElementById(idToSearch);
                     appendingListTo.appendChild(list)
                     for (var i = 0; i < res.data.message.length; i++) {
                         console.log(res.data.message[i].template_name);
                         var anchor = document.createElement("a")
                         anchor.id = res.data.message[i]._id;
                         var listItem = document.createElement("li");
                         listItem.innerHTML = res.data.message[i].template_name;
                         listItem.id = res.data.message[i]._id
                         anchor.href = `/create/${anchor.id}/${userID}`;
                         anchor.appendChild(listItem)
                         list.appendChild(anchor)
                     }
                 })
        }

        loadTemplates()

}
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectLink} />
          }

          console.log(this.props.match.params.active)
        
        
        return (
            <div className="container section">
                
                <div className="row">
                        <div>
                            <div>
                            <ul className="tabs grey lighten-2 col s12" ref={Tabs => {this.Tabs = Tabs;}}>
                                <li className="tab col s4" ><a href="#standard" id="build-from-standard">Build a Budget</a></li>
                                <li className="tab col s4"><a href="#premade" className="active" id="build-from-template">Build From Template</a></li>
                                <li className="tab col s4"><a href="#NewTemp" id="new-template">New Template</a></li>
                            </ul>
                            </div>
                       </div>
            
                       <div id="standard" className="col s12 grey lighten-2">
                           <div>
                               <div className="section">
                                    <h4>Create From Standard Template</h4>
                            
                               </div>
                               <hr></hr>
                               <form onSubmit={ (e) => {this.postStandardToServer(e)} }>
                                   
                                   <div className="col s12 l6">
                                        <h6>Income:</h6>
                                        <div class="input-field col s12">
                                           <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter your income" id="Income" type="number" className="active"></input>
                                            <label for="income_1">Income 1:</label>
                                        </div>
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Donations:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Donations" type="number" className="active"></input>
                                        <label for="donations">How much you plan on donating:</label>
                                    </div>
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Savings:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Savings" type="number" className="active"></input>
                                        <label for="savings">How much you plan on saving:</label>
                                    </div>
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Housing:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Housing" type="number" className="active"></input>
                                        <label for="housing">Your rent or mortgage costs:</label>
                                    </div>
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Child Care:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Child_Care" type="number" className="active"></input>
                                        <label for="child_care">Daycare or after-school care:</label>
                                    </div>
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Utilties:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Utilities" type="number" className="active"></input>
                                        <label for="utilities">Water, Electric, Internet, Etc.:</label>
                                    </div>   
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Food:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Food" type="number" className="active"></input>
                                        <label for="food">Groceries and restaurants:</label>
                                    </div>   
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Transportation:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Transportation" type="number" className="active"></input>
                                        <label for="transportation">Gas, subway fares, etc.:</label>
                                    </div>   
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Medical and Insurance:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} name="standardBudget" defaultValue="0" placeholder="Enter a number" id="Healthcare" type="number" className="active"></input>
                                        <label for="healthcare">Co-pays, check ups, and insurance premiums:</label>
                                    </div>   
                                    </div>
                                    <div className="col s12 l6">
                                    <h6>Personal Expenses:</h6>
                                    <div class="input-field col s12">
                                        <input onBlur = {this.createBudget} placeholder="Enter a number" defaultValue="0" name="standardBudget" id="Personal_Money" type="number" className="active"></input>
                                        <label for="personal">Money that you want to have fun with:</label>
                                    </div>   
                                    </div>   
                                    <input type="submit" style={{"margin-bottom": "1.5em"}} className="btn blue accent-3 col l2 s12" value="save"></input>
                                                          
                              </form>
                           </div>
                        </div>
                       <div id="premade" className="col z-depth-2 s12 grey lighten-2">
                            <div className="container">
                                <div>
                                    <h4>Your Saved Templates</h4>
                                </div>
                                <div id="saved-template-list">

                                </div>
                            </div>
                       </div>
                       <div id="NewTemp" className="col z-depth-2 s12 grey lighten-2">
                            <div>
                                <div className="section">
                                    <h4>Create a New Template</h4>
                                </div>
                            </div>
                            <form className="container">
                            <h6>Template Name:</h6>
                                <div className="input-field">
                                    
                                        <input type="text" id="template_name" className="active" onChange={this.handleName}></input>
                                        <label for="template_name">Name:</label>
                                </div>
                                
                                <div className="row">
                                    <button className="blue btn  accent-3 modal-trigger col l4 s12" href="#add-item-modal">Add Budget Category</button>
                                </div>
                                <div className="row">
                              <div id="template-preview">
                                
                            </div>
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn blue accent-3 col l4 s12 modal-trigger" href="#confirm-before-save">Save</button>
                                </div>
                            </form>
                            

                       </div>
                </div>   
                <div id="add-item-modal" className="modal">
                    <div class="modal-content">
                        <h4>Add New Category</h4>
                        <p>Enter the name of this Budget Category:</p>
                        <input type="text"  id="current-category" onChange={this.createNewCategoryTitle} className="active"></input>
                        <label>Enter budget items that will appear below this category</label>
                        <p>Type in a budget item and press save to add it to your custom budget template.</p>
                    </div>
                    <form className="container" onSubmit={e => {e.preventDefault(); this.addFormElement()}}>
                        <h6>New Budget Item:</h6>
                            <div className="input-field">                        
                                <input type="text" id="add_item" className="active" onChange={this.handleChange}></input>
                                <label for="template_name">New budget item:</label>
                            </div>
                            <ul id="custom-list-items" className="collection section">                               
                            </ul>
                            <input type="submit" className="btn blue accent-3 col l12 s4"  value="Add item to Category"></input>
                            <div className="divider"></div>
                   </form>
                   <div class="modal-footer">
      <a href="#!" class="modal-close btn blue accent-3" onClick={this.newCategoryObject}>Save Category to Budget</a>
    </div>
                                            
                </div>   
                <div id="confirm-before-save"  className="modal">
                    <div className="modal-content">
                    <form onSubmit={this.postToServer}>
                        <h5>Are You Ready To Save?</h5>  
                        <p>Clicking save will save this template, and you'll be redirected a new page where you can start building your budget from this template.</p>
                        <div className="modal-footer">
                        <a href="#!" className="modal-close btn blue accent-3 col s2  pull-s8 row">Cancel</a> 
                        <input type="submit" className="btn blue accent-3 col s2 row" value="Save and start budgeting"></input> 
                        </div> 
                    </form> 
                    </div>   
                </div>           
            </div>
             
        )
    }
}

createFromTemplate.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(createFromTemplate);