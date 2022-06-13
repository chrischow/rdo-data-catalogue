import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DomainCard from '../DomainCard/DomainCard';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';

export default function Home(props) {
  // Query data

  return (
    <div>
      <Container>
        <h1 className="home--title text-center">RDO Data Catalogue</h1>
      </Container>

      <Container className="mt-5">
        <SearchBar />
      </Container>

      <Container className="mt-5">
        <Row>
          <Col sm={4}>
            <DomainCard dataDomain="Ops" nDatasets={3} />
          </Col>
          <Col sm={4}>
            <DomainCard dataDomain="Manpower" nDatasets={3} />
          </Col>
          <Col sm={4}>
            <DomainCard dataDomain="Intelligence" nDatasets={3} />
          </Col>
          <Col sm={4}>
            <DomainCard dataDomain="Engineering" nDatasets={3} />
          </Col>
          <Col sm={4}>
            <DomainCard dataDomain="Training" nDatasets={3} />
          </Col>
          <Col sm={4}>
            <DomainCard dataDomain="Safety" nDatasets={3} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}