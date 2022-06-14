import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { BiHash } from 'react-icons/bi';
import DomainCard from '../DomainCard/DomainCard';
import DatasetCard from '../DatasetCard/DatasetCard';
import TableCard from '../TableCard/TableCard';
import SearchBar from '../SearchBar/SearchBar';
import { getListItems } from '../../utils/queryData';
import { config } from '../../config';
import './Home.css';

export default function Home(props) {
  // Set state
  const [datasets, setDatasets] = useState([]);
  const [datasetsPlus, setDatasetsPlus] = useState([]);
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [terms, setTerms] = useState([]);
  const [keywords, setKeywords] = useState('');

  // Initial load of data
  useEffect(() => {
    // Get datasets
    getListItems(
      config.datasetListId,
      'Id,Title,dataDomain,useCases',
      '',
      '',
      setDatasets
    );

    // Get tables
    getListItems(
      config.tableListId,
      'Id,Title,tableDescription,updateFrequency,parentDataset/Title',
      '',
      'parentDataset',
      setTables
    );

    // Get columns
    getListItems(
      config.columnListId,
      'Id,Title,columnDescription,dataType,businessRules',
      '',
      '',
      setColumns
    );

    // Get terms
    getListItems(
      config.businessTermListId,
      'Id,Title,definition,businessRules,source',
      '',
      '',
      setTerms
    );
  }, []);

  // Augment dataset with no. of tables
  useEffect(() => {
    if (tables && datasets) {
      const combinedData = [...datasets];
      combinedData.forEach(dataset => {
        const nTables = tables.filter(table => table.parentDataset_Id === dataset.Id);
        dataset['nTables'] = nTables.length;
      });

      setDatasetsPlus(combinedData);
    }
  }, [tables, datasets]);

  // Filter functions
  const filterDatasets = (datasetArray) => {
    return datasetArray.filter(dataset => {
      return dataset.Title.includes(keywords) || 
        dataset.useCases.includes(keywords)
    });
  };

  const filterTables = (tablesArray) => {
    return tablesArray.filter(table => {
      return table.Title.includes(keywords) ||
        table.tableDescription.includes(keywords) ||
        table.updateFrequency.includes(keywords)
    });
  };

  const filterColumns = (columnsArray) => {
    return columnsArray.filter(column => {
      return column.Title.includes(keywords) ||
        column.columnDescription.includes(keywords) ||
        column.dataType.includes(keywords) ||
        column.businessRules.includes(keywords)
    });
  };

  const filterTerms = (termsArray) => {
    return termsArray.filter(term => {
      return term.Title.includes(keywords) ||
        term.definition.includes(keywords) ||
        term.businessRules.includes(keywords) ||
        term.source.includes(keywords)
    });
  };

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
          {datasets && keywords === '' &&
            props.dataDomains.map((dataDomain) => {
              const datasetsUnderDomain = datasets.filter((element) => {
                return element.dataDomain === dataDomain;
              });
              return (
                <Col key={dataDomain} sm={4}>
                  <DomainCard dataDomain={dataDomain} nDatasets={datasetsUnderDomain.length} />
                </Col>
              );
            })
          }
          {datasetsPlus && keywords != '' &&
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
                    <Tab.Pane eventKey="datasets">
                      {datasetsPlus && filterDatasets(datasetsPlus).length > 0 &&
                        filterDatasets(datasetsPlus).map(dataset => {
                          return <DatasetCard key={dataset.Title} {...dataset} />
                        })
                      }
                    </Tab.Pane>
                    <Tab.Pane eventKey="tables">
                      {tables && filterTables(tables).length > 0 &&
                        filterTables(tables).map(table => {
                          return <TableCard key={table.Title} {...table} />
                        })
                      }
                    </Tab.Pane>
                    <Tab.Pane eventKey="columns">
                      {columns && filterColumns(columns).length > 0 &&
                        <Table striped responsive className="table column-table">
                          <thead className="strong">
                            <tr>
                              <td>Title</td>
                              <td>Description</td>
                              <td>Data Type</td>
                              <td>Business Rules</td>
                            </tr>
                          </thead>
                          <tbody>
                            {filterColumns(columns).map(column => {
                              return (
                                <tr key={column.Id}>
                                  <td>{column.Title}</td>
                                  <td>{column.columnDescription}</td>
                                  <td className="datatype-cell">{column.dataType}</td>
                                  <td>{column.businessRules}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      }
                    </Tab.Pane>
                    <Tab.Pane eventKey="terms">
                      {terms && filterTerms(terms).length > 0 &&
                        <Table striped responsive className="table column-table">
                          <thead className="strong">
                            <tr>
                              <td>Term</td>
                              <td>Definition</td>
                              <td>Business Rules</td>
                              <td>Source</td>
                            </tr>
                          </thead>
                          <tbody>
                            {filterTerms(terms).map(term => {
                              return (
                                <tr key={term.Id}>
                                  <td>
                                  <Link className="term-link" to={`/term/${term.Id}`}>
                                    <BiHash style={{ marginRight: '1px' }} />
                                    {term.Title}
                                  </Link>
                                  </td>
                                  <td>{term.definition}</td>
                                  <td>{term.businessRules}</td>
                                  <td>{term.source}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      }
                    </Tab.Pane>
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