
import React from "react";


class Assets extends React.Component {
    render() {
        return(
<table>
        <thead>
          <tr>
              <th>Asset</th>
              <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Real Estate</td>
            <td>{this.props.Real_Estate}</td>
          </tr>
          <tr>
            <td>Checking Account</td>
        <td>{this.props.checking}</td>
          </tr>
          <tr>
              <td>Savings Account</td>
        <td>{this.props.savings}</td>
          </tr>
          <tr>
              <td>Retirement Accounts</td>
        <td>{this.props.retirement}</td>
          </tr>
          <tr>
              <td>Investments</td>
        <td>{this.props.investments}</td>
          </tr>
          <tr>
              <td>Vehicles</td>
        <td>{this.props.vehicles}</td>
          </tr>
          <tr>
              <td>Other</td>
              <td>{this.props.other_assets}</td>
          </tr>
        </tbody>
      </table>
        )}
}

export default(Assets)