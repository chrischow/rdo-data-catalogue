export default function DatasetPanel(props) {
  const data = props.scoresDataset;

  return (
    <div className="mt-5">
      <h3>Data Quality - Dataset Level</h3>
      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">{data.nRows.toLocaleString()}</h4>
            <span className="metric-card--title">No. of Observations</span>
          </div>
        </div>
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">{data.nColumns.toLocaleString()}</h4>
            <span className="metric-card--title">No. of Columns</span>
          </div>
        </div>
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">{data.totalCells.toLocaleString()}</h4>
            <span className="metric-card--title">Total Cells</span>
          </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">
              {(data.overallCompleteness / data.totalCells * 100).toFixed(1) + '%'}
            </h4>
            <span className="metric-card--title">Cell Completeness</span>
          </div>
        </div>
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">
              {(data.overallConsistency / data.totalValidCells * 100).toFixed(1) + '%'}
            </h4>
            <span className="metric-card--title">Cell Consistency</span>
          </div>
        </div>
        <div className="col-4 metric-card--outer">
          <div className="metric-card--inner text-center">
            <h4 className="monospace">{data.totalValidCells.toLocaleString()}</h4>
            <span className="metric-card--title">Total Valid Cells</span>
          </div>
        </div>
      </div>
    </div>
  );
}