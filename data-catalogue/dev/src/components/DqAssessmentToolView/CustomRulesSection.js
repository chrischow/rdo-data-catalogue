import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Modal from "./Modal";
import RulesForm from "./RulesForm";
import { dqRules } from '../../utils/dqAssessment';

export default function CustomRulesSection(props) {
  // State
  const [showModal, setShowModal] = useState(false);

  // Handle modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Content for modal to manage rules
  const renderUploader = (modalId) => {
    return (
      <div>
        <RulesForm
          metadata={props.metadata}
          setRules={props.setRules}
          rules={props.rules}
          modalId={modalId}
        />
      </div>
    );
  };

  return (
    <div>
      <h3 className="mt-5">Data Quality - Custom Rules</h3>
      <Button variant="primary" className="btn-purple mt-3" onClick={handleShowModal}>
        {`Manage Rules (${props.rules.length})`}
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} size="xl" id="rulesModal">
        <Modal.Header closeButton>
          <Modal.Title>Custom Business Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RulesForm
            metadata={props.metadata}
            setRules={props.setRules}
            rules={props.rules}
            modalId='rulesModal'
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
      {/* <Modal
        modalId="manageRulesModal"
        modalTitle="Custom Business Rules"
        renderModalContent={() => {
          return renderUploader("manageRulesModal");
        }}
      /> */}
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
    <table className="table table-striped table-hover column-table mt-4">
      <thead className="table-dark">
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
