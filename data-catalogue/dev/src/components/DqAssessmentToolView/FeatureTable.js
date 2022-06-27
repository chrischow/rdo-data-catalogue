export default function FeatureTable(props) {
  return (
    <div>
      <h3 className="mt-5 mb-3">Data Quality - Column Level</h3>
      <table className="table table-striped table-hover column-table">
        <thead className="table-dark">
          <tr>
            <th>Column</th>
            <th className="text-center">Data Type</th>
            <th>Description</th>
            <th className="text-center">
              <span data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                Completeness
              </span>
            </th>
            <th className="text-center">Consistency</th>
            <th className="text-center">Uniqueness</th>
          </tr>
        </thead>
        <tbody>
          {props.metadata.map((row, idx) => {
            const column = row.name;
            const scoreCompleteness =
              props.scoresFeatures[column].completeness * 100;
            const scoreConsistency =
              props.scoresFeatures[column].consistency * 100;
            const scoreUniqueness =
              props.scoresFeatures[column].uniqueness * 100;
            return (
              <tr key={idx}>
                <td>{column}</td>
                <td className="text-center">{row.dataType}</td>
                <td>{row.description}</td>
                <td className="text-center">
                  {scoreCompleteness.toFixed(1) + "%"}
                </td>
                <td className="text-center">
                  {scoreConsistency.toFixed(1) + "%"}
                </td>
                <td className="text-center">
                  {scoreUniqueness.toFixed(1) + "%"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
