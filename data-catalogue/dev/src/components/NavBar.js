import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function NavBar(props) {
    const navLinks = props.pages.map(function (item) {
        return (
            <NavLink key={item.slug} className="nav-link" to={"/" + item.slug}>{item.pageName}</NavLink>
        );
    });

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#/">RDO Data Catalogue</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse  className="justify-content-end ml-auto"id="basic-navbar-nav">
                    <Nav>
                        {navLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}