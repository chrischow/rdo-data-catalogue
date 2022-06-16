import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TermPopover from '../TermPopover/TermPopover';
import { BsTable, BsKeyFill } from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import ColumnCard from '../ColumnCard/ColumnCard';
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
      'Id,Title,columnDescription,dataType,businessRules,isPrimaryKey,isForeignKey,codeTable,relatedFactTable,parentTable/Id,parentTable/Title,businessTerm/Id,businessTerm/Title',
      `parentTable/Id eq ${params.id}`,
      'parentTable,businessTerm',
      setColumns
    );

    getListItems(
      config.tableListId,
      'Id,Title,tableDescription,updateFrequency,site,guid0,parentDataset/Id,parentDataset/Title',
      `Id eq ${params.id}`,
      'parentDataset',
      extractTable
    );
  }, []);

  useEffect(() => {
    if (columns) {
      
      // Function to extract correct terms
      // const filterAndSaveTerms = (arr) => {
      //   const filteredTerms = arr.filter(item => {
      //     return columns.map(column => column.businessTerm_Id).includes(item.Id)
      //   });
      //   setTerms(filteredTerms);
      // };

      // Get business terms
      getListItems(
        config.businessTermListId,
        'Id,Title,definition,businessRules,source',
        '',
        '',
        setTerms
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
      <div className="mt-5">
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
              <td className="infotable--cell">{table.guid0}</td>
            </tr>
            <tr>
              <td className="table-metadata--header infotable--cell">Dataset</td>
              <td className="infotable--cell">
                <Link className="dataset-link d-flex align-items-center" to={`/dataset/${table.parentDataset_Id}`}>
                  <FaDatabase className="inline" style={{ marginRight: '5px' }} />
                  {table.parentDataset_Title}
                </Link>
              </td>
            </tr>
          </tbody>}
        </table>
      </div>

      <div className="mt-5">
        <Row className="justify-content-between">
          <Col xs={8}>
            <h2>Columns</h2>
          </Col>
          <Col xs={3}>
            <div className="text-right">
              <table style={{display: 'inline-block', float: 'right'}}>
                <tbody>
                  <tr>
                    <td width="40px"><BsKeyFill alt="Primary Key" style={{ color: '#F0C419', marginLeft: '7px' }} /></td>
                    <td><small>Primary Key</small></td>
                  </tr>
                  <tr>
                    <td width="40px"><BsKeyFill alt="Primary Key" style={{ color: '#FF5364', marginLeft: '7px' }} /></td>
                    <td><small>Foreign Key</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
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
              {columns && (terms.length > 0) &&
                columns.map(col => {
                  const termList = col.businessTerm;
                  for (let i=0; i < termList.length; i++) {
                    // console.log(termList[i]);
                    termList[i]['definition'] = terms.find(t => t.Id === termList[i].Id).definition;
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
                      <td>
                        {termList.length > 0 && termList.map(term => {
                          return <TermPopover key={`popover-${col.Id}-${term.Id}`} {...term} />
                        })}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
        <div className="mt-5">
          {columns &&
            columns.map(col => {
              const termList = col.businessTerm;
              for (let i=0; i < termList.length; i++) {
                // console.log(termList[i]);
                termList[i]['definition'] = terms.find(t => t.Id === termList[i].Id).definition;
              }
              return <ColumnCard key={`card-${col.Id}`} {...col} termList={termList} />
            })
          }
        </div>
      </div>
    </div>

  );
}