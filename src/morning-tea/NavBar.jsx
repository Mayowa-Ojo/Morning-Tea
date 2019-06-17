import React, {useState} from 'react';
import { Nav, Navbar, NavItem, NavLink, NavbarBrand, Collapse, NavbarToggler } from 'reactstrap';
import "./styles/Navbar.css";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleNav() {
        setIsOpen((prvSt) => !prvSt)
    }

    return (
        <nav>
            <Navbar color="light" light expand="md">
                <NavbarBrand hred="#">Morning Tea <i className="fas fa-mug-hot"></i></NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Online</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Play</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Leaderboard</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    )
}

export default NavBar;
