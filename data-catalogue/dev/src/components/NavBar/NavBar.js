import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

export default function NavBar(props) {
    const navLinks = props.pages.map(function (item) {
        return (
            <NavLink key={item.slug} className="nav-link" to={"/" + item.slug}>{item.pageName}</NavLink>
        );
    });

    const dropdownLinks = props.dataDomains.map( (item) => {
        return (
            <NavDropdown.Item key={item} href={`#/${item.toLowerCase()}`} >{item}</NavDropdown.Item>
        );
    } );

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <Navbar.Brand>RDO Data Catalogue</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end ml-auto" id="basic-navbar-nav">
                    <Nav>
                        {navLinks}
                        <NavDropdown title="Domains" id="domain-dropdown">
                            {dropdownLinks}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}