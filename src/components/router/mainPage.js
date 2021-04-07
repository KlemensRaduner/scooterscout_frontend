import React from "react";
import {withRouter} from "react-router-dom";
import {Container, Row, Col, Nav} from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";


const MainPage = ({history, location, component: Component}) => {

    return (
        <>
            <Header/>
            <Container fluid style={{padding: 0, minHeight: '80vh', overflow: 'hidden'}}>
                <Component/>
            </Container>
            <Footer/>
        </>
    );
}

export default withRouter(MainPage);
