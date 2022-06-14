import { useNavigate } from 'react-router-dom';
import { FaDatabase } from 'react-icons/fa';
import './DatasetCard.css';

export default function DatasetCard(props) {
  // Function to link to page
  let navigate = useNavigate()
  const goToDataset = () => {
    navigate(`/dataset/${props.Id}`);
  }

  return (
    <div className="datasetcard--card mt-3 mb-3" onClick={goToDataset}>
      <h5 className="datasetcard--title d-flex align-items-center">
        <FaDatabase style={{color: '#7B73F0', marginRight: '10px'}} />
        {props.Title}
      <span className="datasetcard--tag">{`${props.nTables} Table${props.nTables != 1 ? 's' : ''}`}</span>
      </h5>
      <p className="mt-2 mb-0">
        {props.useCases}
      </p>
    </div>
  );
}