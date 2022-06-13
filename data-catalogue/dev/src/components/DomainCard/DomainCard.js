import { useNavigate } from 'react-router-dom';
import './DomainCard.css';

export default function DomainCard(props) {
  
  // Function to navigate to domain page
  let navigate = useNavigate()
  const goToDomain = () => {
    navigate(`/${props.dataDomain.toLowerCase()}`);
  }

  return (
    <div className="domain-card mt-2 mb-2 text-center" onClick={goToDomain}>
      <h3 className="domain-card--title">{props.dataDomain}</h3>
      <span className="domain-card--subtitle">{props.nDatasets + ' Dataset' + (props.nDatasets == 0 ? '' : 's')}</span>
    </div>
  );
}