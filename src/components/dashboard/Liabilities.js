
import React, { Component } from "react";


class Liabilities extends Component {
    render() {
        return(
<table>
        <thead>
          <tr>
              <th>Liability</th>
              <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Mortgage(s)</td>
            <td>{this.props.mortages}</td>
          </tr>
          <tr>
            <td>Consumer Debt</td>
        <td>{this.props.consumer_debt}</td>
          </tr>
          <tr>
              <td>Personal Loans</td>
        <td>{this.props.personal_loans}</td>
          </tr>
          <tr>
              <td>Student Loans</td>
        <td>{this.props.student_loans}</td>
          </tr>
          <tr>
              <td>Vehicle Loans</td>
        <td>{this.props.vehicle_loans}</td>
          </tr>
          <tr>
              <td>Medical Debt</td>
        <td>{this.props.medical_debt}</td>
          </tr>
          <tr>
              <td>Other</td>
              <td>{this.props.other_liabilities}</td>
          </tr>
        </tbody>
      </table>
        )}
}

export default(Liabilities)