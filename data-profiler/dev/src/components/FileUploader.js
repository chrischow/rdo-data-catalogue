// COMPONENT: FileUploader
import $ from 'jquery';

$.csv = require('jquery-csv');

export default function FileUploader(props) {
  const submitFile = () => {
    var reader = new FileReader();
    reader.readAsText(document.getElementById('csv-uploader').files[0]);
    reader.onload = function(event) {
      var csv = event.target.result;
      var csvData = $.csv.toObjects(csv);
      if (csvData.length > 0) {
        props.setData({
          columns: Object.keys(csvData[0]),
          data: csvData
        })
      } else {
        console.log('No data loaded.');
      }
    }
  };

  return (
    <div className="file-uploader mt-2">
      <h4>Step 1: Upload a File</h4>
      <input className="mt-3" type="file" id="csv-uploader" accept=".csv"></input>
      <button className="btn btn-primary" onClick={submitFile}>Upload</button>
    </div>
  );
}