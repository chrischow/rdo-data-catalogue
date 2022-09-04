import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

interface NavBarProps {
  dataDomains: string[];
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const dropdownLinks = props.dataDomains.map((item: string) => {
    return (
      <NavDropdown.Item key={item} href={`#/${item.toLowerCase()}`} >{item}</NavDropdown.Item>
    );
  });

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link style={{ textDecoration: 'none' }} to="/">
          <Navbar.Brand>RDO Data Catalogue</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end ml-auto" id="basic-navbar-nav">
          <Nav>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavDropdown title="Domains" id="domain-dropdown">
              {dropdownLinks}
            </NavDropdown>
            <NavLink className="nav-link" to="/business-glossary">Business Glossary</NavLink>
            <NavLink className="nav-link" to="/data-quality-assessment">Data Quality Assessment</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}