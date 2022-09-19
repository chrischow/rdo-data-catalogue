import React from 'react';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BiHash } from 'react-icons/bi';
import { BusinessTermSchema } from '../../shared/utils';
import './styles.css';

interface TermPopoverProps extends BusinessTermSchema {
  colId?: number;
}

export const TermPopover: React.FC<TermPopoverProps> = (props) => {
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