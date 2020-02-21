import React from 'react';
import PropTypes from 'prop-types';


export default function InfoModal(props) {
  return (
    <React.Fragment>
      <button type="button" className="info-button" data-toggle="modal" data-target="#infoModal">
        i
      </button>
      <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="infoModalLabel">{props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{__html: props.body}}>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}
