import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { BsKeyFill } from 'react-icons/bs';
import { FiColumns } from 'react-icons/fi';
import TermPopover from '../TermPopover/TermPopover';
import DqScoreColumn from '../DqScoreColumn/DqScoreColumn';
import './ColumnCard.css';

export default function ColumnCard(props){
  const randomMetrics = () => {
    return [
      {metric: 'accuracy', score: Math.random()},
      {metric: 'completeness', score: Math.random()},
      {metric: 'consistency', score: Math.random()},
    ];
  }

  return (
    <div className="columncard mt-3 mb-3">
      <div className="columncard--title-section">
        <h5 className="columncard--title d-flex align-items-center">
          <FiColumns style={{ color: '#E6BA0F', marginRight: '10px' }} />
          {props.Title}
          {props.isPrimaryKey ?
            <BsKeyFill alt="Primary Key" style={{ color: '#F0C419', marginLeft: '10px' }} /> :
          ''}
          {props.isForeignKey ?
            <BsKeyFill alt="Foreign Key" style={{ color: '#FF5364', marginLeft: '10px' }} /> :
          ''}
          <span className="columncard--tag">{props.dataType}</span>
        </h5>
      </div>
      <div className="columncard--body-section">
        <Row className="mt-3">
          <Col xs={9}>
            <div>
              <h5 className="columncard--section-header">Definition</h5>
              <p>{props.columnDescription}</p>
            </div>
            <div className="mt-4">
              <h5 className="columncard--section-header">Business Rules</h5>
              <p>{props.businessRules}</p>
            </div>
          </Col>
          <Col xs={3}>
            <h5 className="columncard--section-header">Business Terms</h5>
            {props.termList.length > 0 && props.termList.map(term => {
              return (
                <span className="mr-5">
                  <TermPopover key={`popover-${props.Id}-${term.Id}`} {...term} />
                  <span> </span>
                </span>
              );
            })}
          </Col>
        </Row>
        <Accordion flush className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h5 className="columncard--dq-header">Data Quality Scores</h5>
            </Accordion.Header>
            <Accordion.Body>
              <Row className="mt-3">
                {randomMetrics().map(elem => {
                  return <DqScoreColumn {...elem} />
                })}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}