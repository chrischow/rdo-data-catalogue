// COMPONENT: Metadata Form
import { useState } from "react";
import $ from "jquery";
import 'bootstrap/dist/js/bootstrap';

export default function MetadataForm(props) {
  // State: for controlled form
  const [formData, setFormData] = useState(
    props.columns.map((item) => {
      const currentMetadata = props.metadata.find((elem) => elem.name === item);
      return {
        name: item,
        dataType: currentMetadata ? currentMetadata.dataType : "integer",
        required: currentMetadata ? currentMetadata.required : true,
        description: currentMetadata ? currentMetadata.description : "",
      };
    }),
  );

  // Function to submit data
  const submitData = () => {
    props.setMetadata(formData);
    props.handleCloseModal();
  };

  // Function to handle changes to form
  const handleChange = (event) => {
    let [name, idx] = event.target.name.split("-");
    idx = Number(idx);
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData((prevData) => {
      let newData = [...prevData];
      newData[idx][name] = value;
      return newData;
    });
  };

  return (
    <div className="mt-4">
      <h4>Step 2: Input Metadata</h4>
      <div className="row align-items-center">
        <div className="col-3">Column Name</div>
        <div className="col-2 text-center">Data Type</div>
        <div className="col-2 text-center">Required</div>
        <div className="col-5">Description</div>
      </div>
      <form className="mb-3">
        {formData.map((item, idx) => {
          return (
            <div className="row mb-1" key={idx}>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  name={`name-${idx}`}
                  value={formData[idx].name}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-2">
                <select
                  className="form-control"
                  name={`dataType-${idx}`}
                  value={formData[idx].dataType}
                  onChange={handleChange}
                >
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                  <option value="datetime">Datetime</option>
                  <option value="float">Float</option>
                  <option value="integer">Integer</option>
                  <option value="string">String</option>
                </select>
              </div>
              <div className="col-2 text-center">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={`required-${idx}`}
                    onChange={handleChange}
                    checked={formData[idx].required}
                  />
                </div>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control"
                  name={`description-${idx}`}
                  value={formData[idx].description}
                  onChange={handleChange}
                />
              </div>
            </div>
          );
        })}
      </form>
      {/* <button className="btn btn-info mr-3" onClick={addColumn}>
        Add Column
      </button> */}
      {/* <button className="btn btn-danger mr-3" onClick={deleteColumn}>
        Delete Column
      </button> */}
      <button className="btn btn-green" onClick={submitData}>
        Analyse Dataset
      </button>
    </div>
  );
}
