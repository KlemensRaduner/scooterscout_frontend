import React, {useContext, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {UserContext} from "../contexts";
import {withRouter} from "react-router-dom";
import api from "../../config/api";

const LoginPage = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fistName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alias, setAlias] = useState("");
    const [phone, setPhone] = useState("");

    const {login} = useContext(UserContext);

    const [error, setError] = useState("");
    const [register, setRegister] = useState(false);

    const handleLogin = () => {
        login(email, password).then(response => {
            if (history.length > 1) {
                history.goBack();
            } else {
                history.push("/");
            }
        }).catch(e => setError(true))
    }

    const registerUser = () => {
        api.post("/users", {email, password, fistName, lastName}).then(response => console.log)
    }

    return (
        <Row style={{paddingTop: 16, paddingBottom: 16}}>
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
                                {register ?
                                    <Button variant={'light'} onClick={() => setRegister(false)}>
                                        Anmelden
                                    </Button> :
                                    <>
                                        {error &&
                                        <Alert variant={"danger"}>
                                            Die eingegebene E-Mail-Adresse / Member-ID oder das Passwort ist falsch.
                                        </Alert>}

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                                            <Form.Control required type="email"
                                                          onChange={(e) => setEmail(e.target.value)}/>
                                            <Form.Control.Feedback type="invalid">
                                                Email darf nicht leer sein.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
                                            <Form.Control required type="password"
                                                          onChange={(e) => setPassword(e.target.value)}/>
                                            <Form.Control.Feedback type="invalid">
                                                Passwort darf nicht leer sein.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button variant="warning" onClick={handleLogin} type="submit">
                                                Anmelden
                                            </Button>
                                        </div>
                                    </>
                                }
                            </Form>
                        </Col>
                        <Col>
                            <div style={{fontWeight: 'bold'}}>
                                Neu registrieren
                            </div>
                            <div style={{paddingBottom: 16}}>
                                Ich bin neu bei AutoScout24.
                            </div>
                            {register ?
                                <Form>

                                    <Form.Group controlId="firstName">
                                        <Form.Label style={{fontWeight: 'bold'}}>Vorname</Form.Label>
                                        <Form.Control type="text"
                                                      onChange={(e) => setFirstName(e.target.value)}/>

                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label style={{fontWeight: 'bold'}}>Nachname</Form.Label>
                                        <Form.Control type="text"
                                                      onChange={(e) => setLastName(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="alias">
                                        <Form.Label style={{fontWeight: 'bold'}}>Firmenname</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setAlias(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label style={{fontWeight: 'bold'}}>Telefonnummer</Form.Label>
                                        <Form.Control type="phone" onChange={(e) => setPhone(e.target.value)}/>
                                    </Form.Group>

                                    <hr/>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                                        <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            Email darf nicht leer sein.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
                                        <Form.Control required type="password"
                                                      onChange={(e) => setPassword(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            Passwort darf nicht leer sein.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Check type={'checkbox'}
                                                label={"Ich anerkenne die Datenschutbestimmungen von Scooterscout25 Schweiz AG"}/>

                                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                        <Button variant="warning" onClick={registerUser} type="submit">
                                            Neu Registrieren
                                        </Button>
                                    </div>
                                </Form> :
                                <>
                                    <div style={{fontWeight: 'bold'}}>
                                        Schnell und einfach registrieren
                                    </div>
                                    <div style={{paddingBottom: 16}}>
                                        <ul>
                                            <li>Ihr Fahrzeug bei der Nr. 1 auf dem Schweizer Automarkt einfach
                                                inserieren
                                            </li>
                                            <li> Suchaufträge speichern</li>
                                            <li> Merkliste immer verfügbar</li>
                                        </ul>
                                    </div>
                                    <Button variant={'light'} onClick={() => setRegister(true)}>
                                        Zur Registrierung
                                    </Button>
                                </>
                            }
                        </Col>
                    </Row>
                </div>
            </Col>

        </Row>
    )
}

export default withRouter(LoginPage);