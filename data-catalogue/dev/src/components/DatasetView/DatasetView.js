import { useState, useEffect, createFactory } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { getTablesByDataset } from '../../utils/queryData';
import { processMetadata } from '../../utils/processData';
import { config } from '../../config';

export default function DatasetView(props) {
  // Get ID
  const params = useParams();

  // Set state
  const [tables, setTables] = useState([]);
  const [metadata, setMetadata] = useState({});

  // Initial load of data
  useEffect( () => {
    getTablesByDataset(config.tableListId, params.id, (tables) => processMetadata(tables, setMetadata, setTables));
  }, [props.dataDomain]);

  useEffect(() => {
    console.log(tables);
  }, [tables,])
  return (
    <div>
      {metadata && 
      <h1>Table: {Object.keys(metadata)[0]}</h1>
      }
      <Container className="mt-5">
        Info table
      </Container>

      <Container className="mt-5">
        Dataset cards
      </Container>
    </div>

  );
}