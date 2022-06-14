import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FaDatabase } from 'react-icons/fa';
import TableCard from '../TableCard/TableCard';
import { getListItems } from '../../utils/queryData';
import { config } from '../../config';
import './DatasetView.css';

export default function DatasetView(props) {
  // Get ID
  const params = useParams();

  // Set state
  const [tables, setTables] = useState([]);
  const [dataset, setDataset] = useState([]);

  // Function to set dataset - expect an array of length 1
  const extractDataset = (arr) => {
    setDataset(arr[0]);
  };

  // Initial load of data
  useEffect(() => {
    // Get datasets and tables
    getListItems(
      config.tableListId,
      'Id,Title,tableDescription,updateFrequency,parentDataset/Title',
      `parentDataset/Id eq ${params.id}`,
      'parentDataset',
      setTables
    );

    getListItems(
      config.datasetListId,
      'Id,Title,useCases,dataDomain,owner,pointOfContact',
      `Id eq '${params.id}'`,
      '',
      extractDataset
    );
  }, []);

  return (
    <div>
      {dataset &&
        <h1 className="datasetview--title d-flex align-items-center">
          <FaDatabase style={{ color: '#7B73F0', marginRight: '10px' }} />
          {dataset.Title}
        </h1>
      }
      <Container className="mt-5">
        <table className="table">
          <tbody>
            <tr>
              <td width="25%" className="dataset-metadata--header infotable--cell">Use Cases</td>
              <td className="infotable--cell">{dataset.useCases}</td>
            </tr>
            <tr>
              <td className="dataset-metadata--header infotable--cell">Domain</td>
              <td className="infotable--cell">
                <Link className="standard-link" to={`/${dataset.dataDomain}`}>
                  {dataset.dataDomain}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="dataset-metadata--header infotable--cell">Owner</td>
              <td className="infotable--cell">{dataset.owner}</td>
            </tr>
            <tr>
              <td className="dataset-metadata--header infotable--cell">Point of Contact</td>
              <td className="infotable--cell">{dataset.pointOfContact}</td>
            </tr>
          </tbody>
        </table>
      </Container>

      <Container className="mt-5">
        <h2>Tables</h2>
        <div className="mt-4">
          {tables &&
            tables.map(table => {
              return <TableCard key={table.Title} {...table} />
            })
          }
        </div>
      </Container>
    </div>

  );
}