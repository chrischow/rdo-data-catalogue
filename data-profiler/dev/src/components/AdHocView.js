// COMPONENT: AdHocView
import FileUploader from "./FileUploader";
import { useEffect, useState } from "react";
import MetadataForm from "./MetadataForm";
import Modal from "./Modal";
import DatasetPanel from "./DatasetPanel";
import FeatureTable from "./FeatureTable";
import CustomRulesSection from "./CustomRulesSection";
import {
  checkCompleteness,
  checkInt,
  checkFloat,
  checkDate,
  checkBool,
  checkString
} from "../utils/utils.js";

export default function AdHocView(props) {
  // State:
  // - data: Columns and array of objects
  // - featureColumns: object with columns as keys
  const [data, setData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [featureColumns, setFeatureColumns] = useState({});
  const [scoresDataset, setScoresDataset] = useState({});
  const [scoresFeatures, setScoresFeatures] = useState({});
  const [rules, setRules] = useState([]);

  // Create feature columns upon update of CSV file and metadata
  useEffect(() => {
    if (Object.keys(data).length > 0 && Object.keys(metadata).length > 0) {
      var newData = {};
      for (var column of data.columns) {
        newData = {
          ...newData,
          [column]: {
            data: data.data.map((row) => row[column]),
            metadata: metadata.filter((item) => item.name === column)[0],
          },
        };
      }

      setFeatureColumns((prevData) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    }
  }, [data, metadata]);

  // Calculate data quality metrics
  useEffect(() => {
    // Compute data quality for individual features
    if (Object.keys(featureColumns).length > 0) {
      const columns = Object.keys(featureColumns);

      // Variables for loop
      var feature;
      var featureData;
      var newData = {};
      var fn;

      var completeness, consistency, uniqueness;

      var overallCompleteness = 0;
      var overallConsistency = 0;
      var overallUniqueness = 0;
      var overallNonNull = 0;

      for (var column of columns) {
        feature = featureColumns[column];
        featureData = feature.data.filter((val) => {
          return val == null || val == "" ? false : true;
        });

        if (feature.metadata.dataType === "float") {
          fn = checkFloat;
        } else if (feature.metadata.dataType === "date") {
          fn = checkDate;
        } else if (feature.metadata.dataType === 'integer') {
          fn = checkInt;
        } else if (feature.metadata.dataType === 'boolean') {
          fn = checkBool;
        } else {
          fn = checkString;
        }

        // Compute metrics
        completeness = feature.data.reduce(
          (a, b) => a + checkCompleteness(b),
          0
        );
        consistency = featureData.reduce((a, b) => a + fn(b), 0);
        uniqueness = new Set(featureData).size;

        // Append metrics
        overallCompleteness += completeness;
        overallConsistency += consistency;
        overallUniqueness += uniqueness;
        overallNonNull += featureData.length;

        // Prepare column data quality scores
        newData = {
          ...newData,
          [column]: {
            completeness: completeness / feature.data.length,
            consistency: consistency / featureData.length,
            uniqueness: uniqueness / featureData.length,
          },
        };
      }

      setScoresFeatures((prevData) => {
        return {
          ...prevData,
          ...newData,
        };
      });

      // Compute data quality for dataset
      const nColumns = data.columns.length;
      const nRows = data.data.length;
      const totalCells = data.columns.length * data.data.length;
      const totalValidCells = overallNonNull;

      setScoresDataset({
        nColumns,
        nRows,
        totalCells,
        totalValidCells,
        overallCompleteness,
        overallConsistency,
        overallUniqueness,
      });
    }
  }, [featureColumns]);

  // Function to render file uploader and metadata form
  const renderUploader = (modalId) => {
    return (
      <div>
        <FileUploader setData={setData} />
        {data.columns && (
          <MetadataForm
            columns={data.columns}
            setMetadata={setMetadata}
            modalId={modalId}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="section-upload">
        <button
          type="button"
          className="btn btn-green"
          data-toggle="modal"
          data-target="#adHocModal"
        >
          {`${data.columns ? "Edit" : "Upload"} Data`}
        </button>
        <Modal
          modalId="adHocModal"
          modalTitle="Upload Data"
          renderModalContent={() => {
            return renderUploader("adHocModal");
          }}
        />
      </div>
      <div className="section-overview mt-4">
        {Object.keys(scoresFeatures).length > 0 && (
          <DatasetPanel scoresDataset={scoresDataset} />
        )}
      </div>
      <div className="section-table mt-4">
        {Object.keys(scoresFeatures).length > 0 && (
          <FeatureTable scoresFeatures={scoresFeatures} metadata={metadata} />
        )}
      </div>
      <div className="mt-4">
        {Object.keys(scoresFeatures).length > 0 && (
          <CustomRulesSection
            featureColumns={featureColumns}
            metadata={metadata}
            rules={rules}
            setRules={setRules}
          />
        )}
      </div>
    </div>
  );
}
