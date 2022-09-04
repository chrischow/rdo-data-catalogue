import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { BiHash } from 'react-icons/bi';
import { BsTable } from 'react-icons/bs';
import { getListItems } from '../../utils/queryData';
import { config } from '../../config';

import './BusinessTermView.css';

export default function BusinessTermView(props) {
  // Get ID
  const params = useParams();

  // Set state
  const [columns, setColumns] = useState([]);
  const [tables, setTables] = useState([]);
  const [term, setTerm] = useState({});

  // Function to get term
  const extractTerm = (arr) => setTerm(arr.find(t => t.Id == params.id));

  // Function to sort and set columns
  const setSortColumns = (arr) => {
    const sortedArr = arr.sort((a, b) => a.Title > b.Title ? 1 : -1);
    setColumns(sortedArr);
  };

  // Initial load of data
  useEffect(() => {
    // Get business terms
    getListItems(
      config.businessTermListId,
      'Id,Title,definition,businessRules,Source',
      '',
      '',
      extractTerm
    );
    
    // Get columns
    getListItems(
      config.columnListId,
      'Id,Title,columnDescription,businessTerm/Id,businessTerm/Title,parentTable/Id,parentTable/Title',
      `businessTerm/Id eq ${params.id}`,
      'businessTerm,parentTable',
      setSortColumns
    );
  }, [])

  return (
    <div>
      <h1 className="datasetview--title d-flex align-items-center">
        <BiHash style={{ color: '#8497b0', marginRight: '5px' }} />
        {term.Title}
      </h1>
      
      <div className="mt-5">
        <table className="table">
          <tbody>
            <tr>
              <td width="25%" className="businessterm-metadata--header infotable--cell">Definition</td>
              <td className="infotable--cell">{term.definition}</td>
            </tr>
            <tr>
              <td className="businessterm-metadata--header infotable--cell">Business Rules</td>
              <td className="infotable--cell">{term.businessRules}</td>
            </tr>
            <tr>
              <td className="businessterm-metadata--header infotable--cell">Source</td>
              <td className="infotable--cell">{term.source}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h2>Related Columns</h2>
        <div className="mt-4">
          <Table striped responsive className="table column-table">
            <thead className="table-dark">
              <tr>
                <th>Column</th>
                <th>Column Description</th>
                <th>Table</th>
              </tr>
            </thead>
            <tbody>
              {columns &&
                columns.map(col => {
                  return (
                    <tr key={col.Title}>
                      <td>{col.Title}</td>
                      <td>{col.columnDescription}</td>
                      <td>
                        <Link className="standard-link d-flex align-items-center" to={`/table/${col.parentTable_Id}`}>
                          <BsTable style={{ marginRight: '5px' }} />
                          {col.parentTable_Title}
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}