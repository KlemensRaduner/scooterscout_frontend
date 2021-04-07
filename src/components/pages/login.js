import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {UserContext} from "../contexts";
import {withRouter} from "react-router-dom";

const LoginPage = ({history}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {login} = React.useContext(UserContext);

    const handleLogin = () => {
        console.log(history)
        login(email, password)
        if (history.length > 1) {
            history.goBack();
        } else {
            history.push("/");
        }
    }

    return (
        <Row style={{paddingTop: 16}}>
            <Col md={{span: 10, offset: 1}}>
                <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                    Anmelden / Registrieren
                </div>
                <div style={{paddingBottom: 16}}>
                    Für die Seite, welche Sie aufrufen möchten, benötigen Sie ein Benutzerkonto.
                    <br/>
                    Registrieren Sie sich jetzt neu oder melden Sie sich mit Ihren Zugangsdaten an.l
                </div>
                <div style={{backgroundColor: '#eee', padding: 16}}>
                    <Row>
                        <Col md={{span: 6}} style={{borderRight: '1px solid #aaa'}}>
                            <div style={{fontWeight: 'bold'}}>
                                Anmelden
                            </div>
                            <div style={{paddingBottom: 16}}>
                                Ich habe bereits ein Benutzerkonto
                            </div>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}/>

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>

                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="warning" onClick={handleLogin}>
                                        Anmelden
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                        <Col>
                            <div style={{fontWeight: 'bold'}}>
                                Neu registrieren
                            </div>
                            <div style={{paddingBottom: 16}}>
                                Ich bin neu bei AutoScout24.
                            </div>
                            <div style={{fontWeight: 'bold'}}>
                                Schnell und einfach registrieren
                            </div>
                            <div style={{paddingBottom: 16}}>
                                <ul>
                                    <li>Ihr Fahrzeug bei der Nr. 1 auf dem Schweizer Automarkt einfach inserieren</li>
                                    <li> Suchaufträge speichern</li>
                                    <li> Merkliste immer verfügbar</li>
                                </ul>
                            </div>
                            <Button variant={'light'}>Zur Registrierung</Button>
                        </Col>
                    </Row>
                </div>
            </Col>

        </Row>
    )
}

export default withRouter(LoginPage);