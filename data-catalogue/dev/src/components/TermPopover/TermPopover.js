import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BiHash } from 'react-icons/bi';

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
      <Link className="term-link d-flex align-items-center" to={`/term/${props.Id}`}>
        <BiHash style={{ marginRight: '1px' }} />
        {props.Title}
      </Link>
    </OverlayTrigger>
  );
}