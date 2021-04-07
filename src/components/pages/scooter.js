import React, {useContext, useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import api from "../../config/api";

const ScooterPage = ({history}) => {
    const {id} = useParams();

    const [scooter, setScooter] = useState();

    useEffect(() => {
        api.get(`/scooters/${id}`).then(response => {
            setScooter(response.data);
        })
    }, []);


    if (scooter) {
        return (
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <img src={`data:image/png;base64,${scooter.image}`}
                         style={{
                             padding: 16,
                             width: '100%',
                             height: 500,
                             objectFit: 'contain',
                             objectPosition: "center"
                         }}/>
                    <div style={{fontWeight: 'bold', fontSize: '1.2em'}}>{scooter.name}</div>
                    <div style={{fontSize: '1.1em'}}>{scooter.description}</div>
                    <div style={{fontWeight: 'bold', fontSize: '1.6em', paddingTop: 16}}>CHF {scooter.price}.-
                    </div>
                    <hr/>
                    <div style={{display: 'flex'}}>
                        <Button variant={"warning"} size={"lg"} style={{marginRight: 16, width: 300}}
                                onClick={() => {
                                    document.location.href = `mailto:${scooter.user.email}`
                                }}>
                            Anfragen
                        </Button>
                        <Button variant={"outline-primary"} size={"lg"} style={{marginRight: 16, width: 300}}
                                onClick={() => {
                                    document.location.href = `tel:${scooter.user.phone}`
                                }}>
                            {scooter.user.phone}
                        </Button>

                    </div>
                    <hr/>
                    <div style={{paddingBottom: 32}}>
                        <div style={{fontWeight: 'bold', fontSize: '1.2em'}}>Anbieter</div>
                        <div>{scooter.user.alias}</div>
                        <div>{scooter.user.street}</div>
                        <div>{scooter.user.city}</div>
                    </div>
                </Col>
            </Row>
        );
    }
    return null

}

export default withRouter(ScooterPage);