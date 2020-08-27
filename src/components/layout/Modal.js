import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: this.props.onOpenStart,
      onOpenEnd: this.props.onOpenEnd,
      onCloseStart: this.props.onCloseStart,
      onCloseEnd: this.props.onCloseEnd,
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <>
      <div className="row">
                                    <a className="blue btn  accent-3 modal-trigger col l4 s12" href="#add-item-modal">Add Budget Category</a>
                                </div>
         <div id="add-item-modal" className="modal">

         <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="add-item-modal"
          className="modal"
        />
                    <div class="modal-content">
                        <h4>Add New Category</h4>
                        <p>Enter the name of this Budget Category:</p>
                        <input type="text"  id="current-category" onChange={this.props.createNewCategoryTitle} className="active"></input>
                        <label>Enter budget items that will appear below this category</label>
                        <p>Type in a budget item and press save to add it to your custom budget template.</p>
                    </div>
                    <form className="container" onSubmit={this.props.addFormElement}>
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
      </>
    );
  }
}

export default Modal;