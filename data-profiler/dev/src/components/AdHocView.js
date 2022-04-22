// COMPONENT: AdHocView
import FileUploader from "./FileUploader";
import { useEffect, useState } from "react";
import MetadataForm from "./MetadataForm";
import Modal from "./Modal";
import FeatureTable from "./FeatureTable";
import { checkCompleteness, checkInt, checkFloat } from "../utils/utils.js";

export default function AdHocView(props) {
  // State:
  // - data: Columns and array of objects
  // - featureColumns: object with columns as keys
  const [data, setData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [featureColumns, setFeatureColumns] = useState({});
  const [scoresDataset, setScoresDataset] = useState({});
  const [scoresFeatures, setScoresFeatures] = useState({});

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
      
      var feature;
      var featureData;
      var newData = {};
      var fn;

      for (var column of columns) {
        feature = featureColumns[column];
        featureData = feature.data.filter((val) => {
          return val == null || val == "" ? false : true;
        });

        if (feature.metadata.dataType === "float") {
          fn = checkFloat;
        } else {
          fn = checkInt;
        }

        newData = {
          ...newData,
          [column]: {
            completeness:
              feature.data.reduce((a, b) => {
                return a + checkCompleteness(b);
              }, 0) / feature.data.length,
            consistency:
              featureData.reduce((a, b) => {
                return a + fn(b);
              }, 0) / featureData.length,
          },
        };
      }

      setScoresFeatures((prevData) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    }

    // Compute data quality for dataset

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
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#adHocModal"
          >
          Upload Data
        </button>
        <Modal
          modalId="adHocModal"
          modalTitle="Upload Data"
          renderModalContent={() => {
            return renderUploader("adHocModal");
          }}
          />
      </div>
      <div className="section-table mt-4">
        {Object.keys(scoresFeatures).length > 0 && (
          <FeatureTable scoresFeatures={scoresFeatures} metadata={metadata} />
          )}
      </div>
    </div>
  );
}
