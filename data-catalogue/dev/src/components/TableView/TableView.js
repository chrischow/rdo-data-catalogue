import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsTable, BsKeyFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { getListItems } from '../../utils/queryData';
import { config } from '../../config';
import './TableView.css';

export default function TableView(props) {
  // Get ID
  const params = useParams();

  // Set state
  const [columns, setColumns] = useState([]);
  const [table, setTable] = useState([]);
  const [terms, setTerms] = useState([]);
  const [dataset, setDataset] = useState({});

  // Function to set dataset - expect an array of length 1
  const extractTable = (arr) => {
    setTable(arr[0]);
  };

  // Initial load of data
  useEffect(() => {
    // Get tables and columns
    getListItems(
      config.columnListId,
      'Id,Title,columnDescription,dataType,businessRules,isPrimaryKey,isForeignKey,codeTable,relatedFactTable,parentTable/Title,businessTerm/Title',
      `parentTable/Id eq ${params.id}`,
      'parentTable,businessTerm',
      setColumns
    );

    getListItems(
      config.tableListId,
      'Id,Title,tableDescription,updateFrequency,site,guid,parentDataset/Title',
      `Id eq ${params.id}`,
      'parentDataset',
      extractTable
    );
  }, []);

  useEffect(() => {
    if (columns) {
      // Function to extract correct terms
      const filterAndSaveTerms = (arr) => {
        const filteredTerms = arr.filter(item => {
          return columns.map(column => column.businessTerm_Id).includes(item.Id)
        });
        setTerms(filteredTerms);
      };

      // Get business terms
      getListItems(
        config.businessTermListId,
        'Id,Title,definition,businessRules,source',
        '',
        '',
        filterAndSaveTerms
      );
    }
  }, [columns])

  return (
    <div>
      {table &&
        <h1 className="datasetview--title d-flex align-items-center">
          <BsTable style={{ color: '#1ebfaf', marginRight: '10px' }} />
          {table.Title}
        </h1>
      }
      <Container className="mt-5">
        <table className="table">
          {table && <tbody>
            <tr>
              <td width="25%" className="table-metadata--header infotable--cell">Description</td>
              <td className="infotable--cell">{table.tableDescription}</td>
            </tr>
            <tr>
              <td className="table-metadata--header infotable--cell">Update Frequency</td>
              <td className="infotable--cell">{table.updateFrequency}</td>
            </tr>
            <tr>
              <td className="table-metadata--header infotable--cell">Site</td>
              <td className="infotable--cell">{table.site}</td>
            </tr>
            <tr>
              <td className="table-metadata--header infotable--cell">ID</td>
              <td className="infotable--cell">{table.guid}</td>
            </tr>
            <tr>
              <td className="table-metadata--header infotable--cell">Dataset</td>
              <td className="infotable--cell">
                <Link className="standard-link" to={`/dataset/${table.parentDataset_Id}`}>
                  {table.parentDataset_Title}
                </Link>
              </td>
            </tr>
          </tbody>}
        </table>
      </Container>

      <Container className="mt-5">
        <h2>Columns</h2>
        <div className="mt-4">
          <Table striped responsive className="table column-table">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Data Type</th>
                <th>Business Rules</th>
                {/* <th>Foreign Key?</th> */}
                <th>Business Term</th>
              </tr>
            </thead>
            <tbody>
              {columns &&
                columns.map(col => {
                  let term = '';
                  if (terms) {
                    term = terms.find(t => t.Title == col.businessTerm_Title);
                  } else {
                    term = {definition: 'Not found.'};
                  }
                  return (
                    <tr key={col.Title}>
                      <td>
                        {col.Title}
                        {col.isPrimaryKey ?
                        <BsKeyFill alt="Primary Key" style={{ color: '#F0C419', marginLeft: '7px' }} /> :
                        ''}
                        {col.isForeignKey ?
                        <BsKeyFill alt="Foreign Key" style={{ color: '#FF5364', marginLeft: '7px' }} /> :
                        ''}
                      </td>
                      <td>{col.columnDescription}</td>
                      <td className="datatype-cell">{col.dataType}</td>
                      <td>{col.businessRules}</td>
                      {/* <td>
                        {col.isForeignKey ? <TiTick /> : ''}
                      </td> */}
                      <td>
                      <OverlayTrigger
                        trigger={['hover', 'focus']}
                        key={`trigger-${col.Id}`}
                        placement="bottom"
                        overlay={
                          <Popover id={`popover-${col.Id}`}>
                            <Popover.Header><span className="tableview--def-header">Definition</span></Popover.Header>
                            <Popover.Body>
                              <span>{term && term.definition}</span>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <span className="tableview--term">{col.businessTerm_Title}</span>
                      </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </Container>
    </div>

  );
}