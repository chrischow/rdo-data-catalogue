import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DomainCard from '../DomainCard/DomainCard';
import SearchBar from '../SearchBar/SearchBar';
import { getDatasets } from '../../utils/queryData';
import { config } from '../../config';
import './Home.css';

export default function Home(props) {
  // Set state
  const [datasets, setDatasets] = useState([]);

  // Initial load of data
  useEffect(() => {
    getDatasets(config.datasetListId, '', setDatasets)
  }, []);// Query data

  return (
    <div>
      <Container>
        <h1 className="home--title text-center">RDO Data Catalogue</h1>
      </Container>

      <Container className="mt-5">
        <SearchBar placeholder="Search for data resources..." />
      </Container>

      <Container className="mt-5">
        <Row>
          {datasets &&
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
        </Row>
      </Container>
    </div>
  );
}