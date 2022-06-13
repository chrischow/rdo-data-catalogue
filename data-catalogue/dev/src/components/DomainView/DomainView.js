import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import SearchBar from '../SearchBar/SearchBar';
import DatasetCard from '../DatasetCard/DatasetCard';
import { getTablesByDomain } from '../../utils/queryData';
import { processMetadata } from '../../utils/processData';
import { config } from '../../config';

export default function DomainView(props) {
  
  // Set state
  const [metadata, setMetadata] = useState({});

  // Initial load of data
  useEffect( () => {
    // getDatasets(config.datasetListId, props.dataDomain, setDatasets);
    getTablesByDomain(config.tableListId, props.dataDomain, (tables) => processMetadata(tables, setMetadata));
  }, [props.dataDomain]);
  
  return (
    <div>
        <h1 className="home--title text-center">{props.dataDomain} Domain</h1>

      <Container className="mt-5">
        <SearchBar placeholder="Search for datasets..." />
      </Container>

      <Container className="mt-5">
        {metadata &&
        Object.keys(metadata).map((datasetTitle) => {
          return (
            <DatasetCard key={datasetTitle} {...metadata[datasetTitle]} />
          );
        })
        }
      </Container>
    </div>
  );
}