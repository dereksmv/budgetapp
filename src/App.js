import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/Profile/Profile"
import GoalOne from "./components/Profile/GoalOne"
import GoalTwo from "./components/Profile/GoalTwo"
import GoalThree from "./components/Profile/GoalThree"
import NetworthAssets from "./components/Profile/networth/NetworthAssets"
import NetworthLiabilities from "./components/Profile/networth/NetworthLiabilities"
import Loading from "./components/layout/Loading"
import createFromStandard from "./components/budget/createFromStandard"
import buildFromTemplate from "../src/components/budget/buildFromTemplate"
import ViewBudgets from "../src/components/budget/viewBudget"
import BudgetViewer from "../src/components/budget/budgetViewer"
import MobileNav from "../src/components/layout/MobileNav"
import M from "materialize-css";
import createFromTemplate from "../src/components/budget/createFromTemplate"
import newTemplate from "../src/components/budget/newTemplate"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  componentDidMount() {
    M.AutoInit();
    M.Modal.init(this.Modal);
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <MobileNav/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/loading" component={Loading} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/edit-profile" component={Profile}/>
              <PrivateRoute exact path="/edit-profile/goals/one" component={GoalOne}/>
              <PrivateRoute exact path="/edit-profile/goals/two" component={GoalTwo}/>
              <PrivateRoute exact path="/edit-profile/goals/three" component={GoalThree}/>
              <PrivateRoute exact path="/edit-profile/networth/assets" component={NetworthAssets}/>
              <PrivateRoute exact path="/edit-profile/networth/liabilities" component={NetworthLiabilities}/>
              <PrivateRoute exact path="/budgets/new/create-from-standard" component={createFromStandard}/>
              <PrivateRoute exact path="/budgets/new/create-from-template" component={createFromTemplate}/>
              <PrivateRoute exact path="/budgets/new/new-template" component={newTemplate}/>
              <PrivateRoute path="/create/:_id/:user_id" component ={buildFromTemplate}/>
              <PrivateRoute exact path="/budgets/" component={ViewBudgets}/>
              <PrivateRoute path ="/budgets/view/:user_id/:budget_id" component={BudgetViewer}/>
            </Switch>
            
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;