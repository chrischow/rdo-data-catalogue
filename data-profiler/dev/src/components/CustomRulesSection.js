import { useEffect } from "react";
import Modal from "./Modal";
import RulesForm from "./RulesForm";
import { greaterThanOrEqualTo, lessThanOrEqualTo, dqRules } from '../utils/utils';

export default function CustomRulesSection(props) {
  // State
  // Content for modal to manage rules
  const renderUploader = (modalId) => {
    return (
      <div>
        <RulesForm
          metadata={props.metadata}
          setRules={props.setRules}
          modalId={modalId}
        />
      </div>
    );
  };

  return (
    <div>
      <h3 className="mt-5">Data Quality - Custom Rules</h3>
      <button
        type="button"
        className="btn btn-purple mt-3"
        data-toggle="modal"
        data-target="#manageRulesModal"
      >
        {`Manage Rules (${props.rules.length})`}
      </button>
      <Modal
        modalId="manageRulesModal"
        modalTitle="Custom Business Rules"
        renderModalContent={() => {
          return renderUploader("manageRulesModal");
        }}
      />
      {props.rules.length > 0 && (
        <CustomRulesTable
          rules={props.rules}
          data={props.data}
          featureColumns={props.featureColumns}
          metadata={props.metadata}
        />
      )}
    </div>
  );
}

function CustomRulesTable(props) {
  const rules = props.rules.map((rule, idx) => {
    const feature = props.featureColumns[rule.column];
    const dataType = props.metadata.filter(item => {
      return item.name === rule.column
    })[0].dataType;
    const featureData = feature.data.filter((val) => {
      return val == null || val == "" ? false : true;
    });
    
    // If it is a date, must convert both sides to the correct format1
    const score = dqRules[rule.rule](featureData, rule.value1, rule.value2);

    return (
      <tr key={`rules-table-row-${idx}`}>
        <td>{rule.column}</td>
        <td>
          {`${rule.rule} ${rule.value1} ${
            rule.rule === "between" ? " and " + rule.value2 : ""
          }`}
        </td>
        <td>{score.toFixed(1) + '%'}</td>
      </tr>
    );
  });
  return (
    <table className="table table-striped table-hover mt-4">
      <thead className="thead-dark">
        <tr>
          <th>Column</th>
          <th>Rule</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>{rules}</tbody>
    </table>
  );
}
