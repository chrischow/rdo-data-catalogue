import './DomainCard.css';

export default function DomainCard(props) {
  return (
    <div className="domain-card mt-2 mb-2 text-center">
      <h3 className="domain-card--title">{props.dataDomain}</h3>
      <span className="domain-card--subtitle">{props.nDatasets + ' Dataset' + (props.nDatasets == 0 ? '' : 's')}</span>
    </div>
  );
}