import { useNavigate } from 'react-router-dom';
import { BsTable } from 'react-icons/bs';
import './TableCard.css';

export default function TableCard(props) {
  // Function to link to page
  let navigate = useNavigate()
  const goToTable = () => {
    navigate(`/table/${props.Id}`);
  }

  return (
    <div className="datasetcard--card mt-3 mb-3" onClick={goToTable}>
      <h5 className="datasetcard--title d-flex align-items-center">
        <BsTable style={{color: '#1ebfaf', marginRight: '10px'}} />
        {props.Title}
      <span className="tablecard--tag">{props.updateFrequency}</span>
      </h5>
      <p className="mt-2 mb-0">
        {props.tableDescription}
      </p>
    </div>
  )
}