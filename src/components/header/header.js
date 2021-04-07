import React, {useContext} from "react";
import {Button, Form, Nav, Navbar} from "react-bootstrap";
import {UserContext} from "../contexts";
import "./headerStyle.css";
import logo from "../../resources/images/logo.png";
import {withRouter} from "react-router-dom";

function Header({history}) {

    const {user, logout} = useContext(UserContext);

    const handleLogin = () => {
        history.push({pathname: "/login", state: history.location.pathname});
    };

    const handleLogout = () => {
        logout();
    }


    return (
        <Navbar variant="dark">
            <Navbar.Brand href="/"><img className={"logo"} src={logo} alt="logo"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Suchen</Nav.Link>
                <Nav.Link href="/sell">Verkaufen</Nav.Link>
            </Nav>
            {user ? <Form inline>
                    <Button onClick={handleLogout} variant="outline-light">Abmelden</Button>
                </Form> :
                <Button onClick={handleLogin} variant="outline-light">Anmelden / Registrieren</Button>
            }
        </Navbar>
    );
}

export default withRouter(Header);
