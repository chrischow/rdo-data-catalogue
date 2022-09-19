import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import { SearchBar } from '../SearchBar/SearchBar';
import { DatasetCard } from '../DatasetCard/DatasetCard';
import { DomainIcon } from '../DomainIcon/DomainIcon';
import { useTables } from '../../shared/hooks/useTables';
import { useDatasetByDomain } from '../../shared/hooks/useDatasets';
import { DatasetSchema, TableSchema, filterDatasets } from '../../shared/utils';

interface DomainViewProps {
  dataDomain: string;
}

export const DomainView: React.FC<DomainViewProps> = (props) => {
  const [keywords, setKeywords] = useState<string>('');
  // const [combinedData, setCombinedData] = useState<DatasetSchema[]>([]);

  // Query data
  // const allDatasets = useDatasets();
  const allTables = useTables();
  const { datasets, datasetsIsSuccess } = useDatasetByDomain(props.dataDomain);

  // Combine data
  const combineData = (datasetArr: DatasetSchema[], tableArr: TableSchema[]): DatasetSchema[] => {
    let newData: DatasetSchema[] = JSON.parse(JSON.stringify(datasetArr));
    newData.forEach((dataset: DatasetSchema) => {
      const nTables = tableArr.filter((table: TableSchema) => table.parentDataset_Id === dataset.Id);
      dataset['nTables'] = nTables.length;
    });
    return newData;
  }

  const combinedData: DatasetSchema[] = (datasetsIsSuccess && allTables.isSuccess) ? combineData(datasets, allTables.data) : [];

  // Filter datasets
  const filteredDatasets = combinedData ? filterDatasets(combinedData, keywords) : [];

  return (
    <div>
      <h1 className="home--title text-center d-flex align-items-center justify-content-center">
        <DomainIcon dataDomain={props.dataDomain} styleParams={{ color: '#FF5364', marginRight: '10px' }} />
        {props.dataDomain} Domain
      </h1>

      <div className="mt-5">
        <SearchBar placeholder="Search for datasets..." updateSearch={setKeywords} />
      </div>

      <Container className="mt-5">
        {combinedData.length > 0 && filteredDatasets.length > 0 && filteredDatasets.map((dataset: DatasetSchema) => {
          return (
            <DatasetCard key={dataset.Title} {...dataset} />
          );
        })}
        {combinedData.length > 0 && filteredDatasets.length === 0 &&
          <div className="text-center">
            <h4 style={{ fontWeight: 'normal' }}>
              No results match your search criteria "<em>{keywords}</em>".
            </h4>
          </div>
        }
        {combinedData.length === 0 &&
          <div className="text-center">
            <h3>No datasets available.</h3>
          </div>
        }
      </Container>
    </div>
  );
}