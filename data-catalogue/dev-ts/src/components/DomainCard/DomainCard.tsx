import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DomainIcon } from '../DomainIcon/DomainIcon';
import './DomainCard.css';

interface DomainCardProps {
  dataDomain: string;
  nDatasets: number;
}

export const DomainCard: React.FC<DomainCardProps> = (props) => {
  // Function to navigate to domain page
  let navigate = useNavigate()
  const goToDomain = () => {
    navigate(`/${props.dataDomain.toLowerCase()}`);
  }

  return (
    <div className="domain-card mt-2 mb-2 text-center" onClick={goToDomain}>
      <h3 className="domain-card--title">
        <DomainIcon dataDomain={props.dataDomain} styleParams={{ color: '#FF5364', marginRight: '10px' }} />
        {props.dataDomain}
      </h3>
      <span className="domain-card--subtitle">{props.nDatasets + ' Dataset' + (props.nDatasets === 1 ? '' : 's')}</span>
    </div>
  );
}