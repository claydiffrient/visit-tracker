import React, { Component } from 'react';
import ReactModal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';

export default class AddVisitModal extends Component {
  constructor () {
    super();

    this.handleSaveClicked = this.handleSaveClicked.bind(this);
  }

  handleSaveClicked () {
    console.log(this.props);
    this.props.handleAddVisit({
      personId: this.props.modal.get('userId'),
      date: this.refs.visitDate.value,
      notes: this.refs.notes.value
    });
  }

  render () {
    return (
      <ReactModal
        isOpen={this.props.modal.get('showing')}
        onRequestClose={this.props.closeAddVisitModal}
        closeTimeoutMS={100}
        style={{}}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.props.closeAddVisitModal}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h2 className="modal-title">Add Visit</h2>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="visit_date">Visit Date</label>
                <input type="date" className="form-control" id="visit_date" ref="visitDate" placeholder="Date" />
              </div>
              <div className="form-group">
                <label htmlFor="visit_notes">Notes</label>
                <textarea className="form-control" id="visit_notes" ref="notes" placeholder="Notes" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.props.closeAddVisitModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Save changes</button>
          </div>
        </div>
      </ReactModal>
    );
  }
};
