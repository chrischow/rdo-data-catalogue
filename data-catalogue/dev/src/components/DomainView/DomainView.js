import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import SearchBar from '../SearchBar/SearchBar';
import DatasetCard from '../DatasetCard/DatasetCard';
import DomainIcon from '../DomainIcon/DomainIcon';
import { getListItems } from '../../utils/queryData';
import { filterDatasets } from '../../utils/processData';
import { config } from '../../config';

export default function DomainView(props) {

  // Set state
  const [tables, setTables] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [keywords, setKeywords] = useState('');

  // Initial load of data
  useEffect(() => {
    // Get datasets and tables
    getListItems(
      config.tableListId,
      'Title,parentDataset/Id,parentDataset/Title',
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

  // Extract datasets
  const extractDatasets = (obj) => setMetadata(obj.values());

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

  return (
    <div>
      <h1 className="home--title text-center d-flex align-items-center justify-content-center">
        <DomainIcon dataDomain={props.dataDomain} styleParams={{ color: '#FF5364', marginRight: '10px' }} />
        {props.dataDomain} Domain
      </h1>

      <Container className="mt-5">
        <SearchBar placeholder="Search for datasets..." updateSearch={setKeywords} />
      </Container>

      <Container className="mt-5">
        {metadata && filterDatasets(metadata, keywords).map((dataset) => {
            return (
              <DatasetCard key={dataset.Title} {...dataset} />
            );
          })
        }
        {metadata.length > 0 && filterDatasets(metadata, keywords).length === 0 &&
          <div className="text-center">
            <h4 style={{ fontWeight: 'normal' }}>No results match your search criteria "<em>{keywords}</em>".</h4>
          </div>
        }

        {metadata.length === 0 &&
          <div className="text-center">
            <h3>No datasets available.</h3>
          </div>
        }
      </Container>
    </div>
  );
}