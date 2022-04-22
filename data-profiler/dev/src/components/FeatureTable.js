
export default function FeatureTable(props) {

  return (
    <div>
      <h3 className="mb-3">Data Quality Scores - Columns</h3>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Column Name</th>
            <th className="text-center">Data Type</th>
            <th>Description</th>
            <th className="text-center">Completeness</th>
            <th className="text-center">Consistency</th>
          </tr>
        </thead>
        <tbody>
          {props.metadata.map( (row, idx) => {
            const column = row.name;
            const scoreCompleteness = props.scoresFeatures[column].completeness * 100;
            const scoreConsistency = props.scoresFeatures[column].consistency * 100;
            return (
              <tr key={idx}>
                <td>{column}</td>
                <td className="text-center">{row.dataType}</td>
                <td>{row.description}</td>
                <td className="text-center">{scoreCompleteness.toFixed(1) + '%'}</td>
                <td className="text-center">{scoreConsistency.toFixed(1) + '%'}</td>
              </tr>
            );
          } )}
        </tbody>
      </table>
    </div>
  );
}