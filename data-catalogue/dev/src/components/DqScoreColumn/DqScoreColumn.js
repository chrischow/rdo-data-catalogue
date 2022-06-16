import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function DqScoreColumn(props) {
  const score = Math.floor(props.score * 100);

  const getColour = (score) => {
    if (score >= 80) {
      return 'var(--green-d2)';
    } else if (score >= 50) {
      return 'var(--yellow)';
    } else {
      return 'var(--red)';
    }
  };

  return (
    <Col xs={4}>
      <h5 className="columncard--section-header">
        {props.metric} - {score}%
      </h5>
      <ProgressBar style={{height: '10px'}}>
        <ProgressBar now={score} style={{backgroundColor: getColour(score), height: '10px'}} />
      </ProgressBar>
    </Col>
  );
}