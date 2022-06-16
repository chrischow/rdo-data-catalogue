import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BiHash } from 'react-icons/bi';
import './TermPopover.css';

export default function TermPopover(props) {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="left"
      overlay={
        <Popover id={`popover-${props.colId}`}>
          <Popover.Header><span className="tableview--def-header">Definition</span></Popover.Header>
          <Popover.Body>
            <span>{props.definition}</span>
          </Popover.Body>
        </Popover>
      }
    >
      <Link className="term-link" to={`/term/${props.Id}`} style={{display: 'inline-block'}}>
        <div className="d-flex align-items-center">
          <BiHash style={{ marginRight: '1px' }} />
          <span className="termpopover--keyword">{props.Title}</span>
        </div>
      </Link>
    </OverlayTrigger>
  );
}