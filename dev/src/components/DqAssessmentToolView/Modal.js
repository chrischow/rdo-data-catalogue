
export default function Modal(props) {
  return (
    <div className="modal fade" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby={`${props.modalId}Title`} aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${props.modalId}LongTitle`}>{props.modalTitle}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.renderModalContent()}
          </div>
          <div className="modal-footer mt-2">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}