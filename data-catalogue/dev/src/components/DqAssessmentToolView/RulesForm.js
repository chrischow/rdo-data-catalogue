// COMPONENT: Metadata Form
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import $ from "jquery";

export default function RulesForm(props) {
  // State: for controlled form
  const [formData, setFormData] = useState([
    ...props.rules,
  ]);

  // Function to add rule
  const addRule = () => {
    setFormData(prevData => {
      return [
        ...prevData,
        {
          column: props.metadata[0].name,
          rule: "greaterThanOrEqualTo",
          value1: 0,
          value2: 0
        }
      ];
    });
  };

  // Function to delete rule
  const deleteRule = () => {
    setFormData(prevData => {
      return prevData.slice(0, -1);
    });
  };

  // Function to submit data
  const submitData = () => {
    props.setRules(formData);
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
    <div className="mt-3">
      {/* <p>
        To compare columns (numeric rules only), wrap the <strong>exact </strong>
        column name in square brackets e.g. <code>[id]</code>
      </p> */}
      <div className="row align-items-center">
        <div className="col-3 text-center">Column</div>
        <div className="col-5 text-center">Rule</div>
        <div className="col-4 text-center">Value(s)</div>
      </div>
      <form className="rules-form mt-2 mb-3">
        {formData.map((item, idx) => {
          return (
            <div className="row mb-1" key={idx}>
              <div className="col-3">
                <select
                  className="form-control"
                  name={`column-${idx}`}
                  value={formData[idx].column}
                  onChange={handleChange}
                >
                  {props.metadata.map((row, idx2) => {
                    return <option value={row.name} key={`option-${idx}-${idx2}`}>{row.name}</option>;
                  })}
                </select>
              </div>
              <div className="col-5">
                <select
                  className="form-control"
                  name={`rule-${idx}`}
                  value={formData[idx].rule}
                  onChange={handleChange}
                >
                  <optgroup label='Numeric'>
                    <option value="greaterThanOrEqualTo">
                      Greater Than or Equal To
                    </option>
                    <option value="lessThanOrEqualTo">
                      Less Than or Equal To
                    </option>
                    <option value="between">Between Values</option>
                  </optgroup>

                  <optgroup label='String/Categorical'>
                    <option value="contains">Contains (separated by semicolon)</option>
                    <option value="doesNotContain">Does Not Contain (separated by semicolon)</option>
                  </optgroup>

                  <optgroup label='Any Data Type'>
                    <option value="equalTo">Equal To</option>
                    <option value="notEqualTo">Not Equal To</option>
                  </optgroup>
                </select>
              </div>
              <div className={formData[idx].rule === 'between' ? "col-2": "col-4"}>
                <input
                  className="form-control"
                  name={`value1-${idx}`}
                  value={formData[idx].value1}
                  onChange={handleChange}
                />
              </div>
              {formData[idx].rule === 'between' && <div className="col-2">
                <input
                  className="form-control"
                  name={`value2-${idx}`}
                  value={formData[idx].value2}
                  onChange={handleChange}
                />
              </div>}
            </div>
          );
        })}
      </form>
      <Button className="btn btn-purple" style={{marginRight: '15px'}} onClick={addRule}>
        Add Rule
      </Button>
      <Button className="btn btn-red" style={{marginRight: '15px'}} onClick={deleteRule}>
        Delete Rule
      </Button>
      <Button className="btn btn-green" style={{float: 'right'}} onClick={submitData}>
        Save Rules
      </Button>
    </div>
  );
}
