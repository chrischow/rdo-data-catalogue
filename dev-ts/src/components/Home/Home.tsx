import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDatasets } from '../../shared/hooks/useDatasets';
import { useTables } from '../../shared/hooks/useTables';
import { useColumns } from '../../shared/hooks/useColumns';
import { useTerms } from '../../shared/hooks/useTerms';
import { DomainCard } from '../DomainCard/DomainCard';
import { filterDatasets, filterTables, filterColumns, filterTerms, DatasetSchema, TableSchema, ColumnSchema, BusinessTermSchema } from '../../shared/utils';
import { SearchBar } from '../SearchBar/SearchBar';
import { HomeTabPaneCards, HomeTabPaneTable } from '../HomeTabPane/HomeTabPane';
import './Home.css';

interface HomeProps {
  dataDomains: string[];
}

export const Home: React.FC<HomeProps> = (props) => {
  // Set state
  const [keywords, setKeywords] = useState('');

  // Query data
  const allDatasets = useDatasets();
  const allTables = useTables();
  const allColumns = useColumns();
  const allTerms = useTerms();

  const datasets: DatasetSchema[] = allDatasets.isSuccess ? allDatasets.data : [];
  const tables: TableSchema[] = allTables.isSuccess ? allTables.data : [];
  const columns: ColumnSchema[] = allColumns.isSuccess ? allColumns.data : [];
  const terms: BusinessTermSchema[] = allTerms.isSuccess ? allTerms.data : [];

  // Combine data
  const combineData = (datasetArr: DatasetSchema[], tableArr: TableSchema[]): DatasetSchema[] => {
    let newData: DatasetSchema[] = JSON.parse(JSON.stringify(datasetArr));
    newData.forEach((dataset: DatasetSchema) => {
      const nTables = tableArr.filter((table: TableSchema) => table.parentDataset_Id === dataset.Id);
      dataset['nTables'] = nTables.length;
    });
    return newData;
  }

  const combinedData: DatasetSchema[] = (allDatasets.isSuccess && allTables.isSuccess) ? combineData(datasets, allTables.data) : [];

  // Filter data
  const filteredDatasets: DatasetSchema[] = filterDatasets(combinedData, keywords);
  const filteredTables: TableSchema[] = filterTables(tables, keywords);
  const filteredColumns: ColumnSchema[] = filterColumns(columns, keywords);
  const filteredTerms: BusinessTermSchema[] = filterTerms(terms, keywords);

  return (
    <Container>
      <div>
        <h1 className="home--title text-center">RDO Data Catalogue</h1>
      </div>

      <div className="mt-5">
        <SearchBar placeholder="Search for data resources..." updateSearch={setKeywords} />
      </div>

      <div className="mt-5">
        <Row>
          {datasets.length > 0 && keywords === '' &&
            props.dataDomains.map((dataDomain: string) => {
              const datasetsUnderDomain = datasets.filter((element: DatasetSchema) => {
                return element.dataDomain === dataDomain;
              });
              return (
                <Col key={dataDomain} sm={4}>
                  <DomainCard dataDomain={dataDomain} nDatasets={datasetsUnderDomain.length} />
                </Col>
              );
            })
          }
          {combinedData.length > 0 && keywords !== '' &&
            <>
              <Tab.Container id="search-results-tabs" defaultActiveKey="datasets">
                <Nav className="justify-content-center" defaultActiveKey="datasets">
                  <Nav.Item>
                    <Nav.Link eventKey="datasets" className="search-results--tab">Datasets</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tables" className="search-results--tab">Tables</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="columns" className="search-results--tab">Columns</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="terms" className="search-results--tab">Business Terms</Nav.Link>
                  </Nav.Item>
                </Nav>
                <div className="mt-4">
                  <Tab.Content>
                    <HomeTabPaneCards
                      entityType="datasets"
                      mainData={combinedData}
                      filteredData={filteredDatasets}
                      keywords={keywords}
                    />
                    <HomeTabPaneCards
                      entityType="tables"
                      mainData={tables}
                      filteredData={filteredTables}
                      keywords={keywords}
                    />
                    <HomeTabPaneTable
                      entityType="columns"
                      mainData={columns}
                      filteredData={filteredColumns}
                      keywords={keywords}
                    />
                    <HomeTabPaneTable
                      entityType="terms"
                      mainData={terms}
                      filteredData={filteredTerms}
                      keywords={keywords}
                    />
                  </Tab.Content>
                </div>
              </Tab.Container>
            </>

          }
        </Row>
      </div>
    </Container>
  );
}