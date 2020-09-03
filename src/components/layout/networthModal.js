import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class NetworthModal extends Component {
  componentDidMount() {
    
    M.Modal.init(this.Modal);
    // If you want to work on instance of the Modal then you can use the below code snippet 
    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <>
        <a class="waves-effect blue accent-3 btn modal-trigger" href="#modal1">Save
            <i className="material-icons right">send</i>
        </a>
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
                    <div class="modal-content">
                        <h4>Ready to Save {this.props.networthType}?</h4>
                        <p>You can choose to return to your dashboard, or edit your {this.props.otherType}</p>
                    </div> 
                    <div className="container">
                        <div className="row">
                            <input type="submit"  className="btn blue accent-3 col s12 l6 push-l2" onClick={this.props.onSubmit} name="dashboard" value="Save and Return to Dashboard"></input>
                        </div>
                        <div className="row">
                            <input type="submit" className="btn blue accent-3 col s12 l6 push-l2" onClick={this.props.onSubmit} name="nextGoal" value={`Save and edit ${this.props.otherType}`}></input>
                        </div>
                    </div>
                                                    
                  </div>
      </>
    );
  }
}

export default NetworthModal;