import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import SearchBar from '../SearchBar/SearchBar';
import DatasetCard from '../DatasetCard/DatasetCard';
import { getListItems, getTablesByDomain } from '../../utils/queryData';
import { innerJoin } from '../../utils/processData';
import { config } from '../../config';

export default function DomainView(props) {
  
  // Set state
  const [tables, setTables] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [metadata, setMetadata] = useState({});

  // Initial load of data
  useEffect( () => {
    // Get datasets and tables
    getListItems(
      config.tableListId,
      'Title,parentDataset/Title',
      '',
      'parentDataset',
      setTables
    );

    getListItems(
      config.datasetListId,
      'Id,Title,useCases,dataDomain',
      `dataDomain eq '${props.dataDomain}'`,
      '',
      setDatasets
    );
  }, [props.dataDomain]);

  // Process metadata
  useEffect(() => {
    if (tables && datasets) {
      const combinedData = [...datasets];
      combinedData.forEach(dataset => {
        const nTables = tables.filter(table => table.parentDataset_Id === dataset.Id);
        dataset['nTables'] = nTables.length;
      });

      setMetadata(combinedData);
    }
  }, [tables, datasets]);
  
  useEffect(() => {
    if (metadata) console.log(metadata);
  }, [metadata]);

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