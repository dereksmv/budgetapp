import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NetworthModal from "../../layout/networthModal";


class TwoColumnForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return(
            <div className="container row">
                <form className="col l8 s12 push-l2" style={{marginBottom: "4em"}} onSubmit={this.props.onSubmit}>
                    <div className="white-text blue z-depth-4 darken-3" style={{marginTop: "2em"}}>
                        <div style={{padding: "4px"}}>
        <h3 className="left-align"><b>{this.props.boldText}</b> {this.props.titleText}</h3>
        Enter a number for each field
                             
                        </div>
                    </div>
                    <div className="container grey lighten-2 col l12 s12 z-depth-4">
                    <p className="flow-text">Enter your <b>{this.props.titleOfEntry}:</b></p>
                        <div className="col l6">
                            <input className="validate" id={this.props.input1} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal1}></input>
                            <label htmlFor={this.props.for1}>{this.props.label1}</label>

                            <input className="validate" id={this.props.input2} onChange={this.props.onChange}  type="number" step="0.01" min="0" value={this.props.initialVal2}></input>
                            <label htmlFor={this.props.for2}>{this.props.label2}</label>

                            <input className="validate" id={this.props.input3} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal3}></input>
                            <label htmlFor={this.props.for3}>{this.props.label3}</label>
  
                            <input className="validate" id={this.props.input4} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal4}></input>
                            <label htmlFor={this.props.for4}>{this.props.label4}</label>
                        </div>
                        <div className="col l6">
                            

                            <input className="validate" id={this.props.input5} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal5}></input>
                            <label htmlFor={this.props.for5}>{this.props.label5}</label>

                            
                            <input className="validate" id={this.props.input6} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal6}></input>
                            <label htmlFor={this.props.for6}>{this.props.label6}</label>

                            <input className="validate" id={this.props.input7} onChange={this.props.onChange} type="number" step="0.01" min="0" value={this.props.initialVal7}></input>
                            <label htmlFor={this.props.for7}>{this.props.label7}</label>
                            <br></br>
                            <br></br>
                            <br></br>
                            <NetworthModal
                            networthType = {this.props.networthType}
                            otherType = {this.props.otherType}
                            onSubmit = {this.props.onSubmit}
                            />
                        </div>
                        <p>{this.props.form_message}</p>
                        
                        <ul className="pagination center-align">
                            <li className="waves-effect"><Link to={this.props.url_back}><i class="material-icons">chevron_left</i></Link></li>
                            <li className={this.props.active1}><Link to="/edit-profile/networth/assets">1</Link></li>
                            <li className={this.props.active2}><Link to="/edit-profile/networth/liabilities">2</Link></li>
                            <li className="waves-effect"><Link to={this.props.url_forward}><i class="material-icons">chevron_right</i></Link></li>
                        </ul>
                    </div>
                    
                </form>
                </div>
            
            
        )
    }
}

TwoColumnForm.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps
  )(TwoColumnForm);