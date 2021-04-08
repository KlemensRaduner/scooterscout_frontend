import React, {useContext} from "react";
import {withRouter} from "react-router-dom";
import {Alert, Col, Form, Row} from "react-bootstrap";
import {FilterContext} from "../contexts";
import {ScooterContext} from "../contexts/scooterContext";
import TopScooter from "../topScooters/topScooters";

const SearchPage = ({history}) => {

    const {
        brands,
        selectedBrand,
        models,
        selectedModel,
        prices,
        selectBrand,
        selectModel,
        selectPrice,
        selectedPrice
    } = useContext(FilterContext);

    const {scooters} = useContext(ScooterContext)

    const handleClick = (id) => {
        history.push("/scooter/" + id)
    }

    return (
        <>
            <Row style={{paddingTop: 16, paddingBottom: 16}}>
                <Col sm={{span: 10, offset: 1}}>
                    <div style={{fontSize: 24}}><span
                        style={{color: 'orange'}}>{scooters.length}</span> Scooters
                    </div>
                    <hr/>
                </Col>
            </Row>

            <Row>
                <Col sm={{span: 2, offset: 1}}>
                    <Form>
                        <Form.Group controlId="brand">
                            <Form.Label>Marke</Form.Label>
                            <Form.Control as="select" size="lg"
                                          value={selectedBrand?.id}
                                          onChange={(event) => selectBrand(event.target.value)}>
                                <option hidden></option>
                                <option value={"alle"}>Alle</option>
                                {brands && brands.map(brand =>
                                    <option value={brand.id}
                                            key={brand.name}>
                                        {brand.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control as="select" size="lg" disabled={models.length <= 0}
                                          value={selectedModel?.id}
                                          onChange={(event) => selectModel(event.target.value)}>
                                <option hidden></option>
                                <option value={"alle"}>Alle</option>
                                {models && models.map(model =>
                                    <option key={model.name} value={model.id}>
                                        {model.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control as="select" size="lg" value={selectedPrice}
                                          onChange={(event => selectPrice(event.target.value))}>
                                <option hidden></option>
                                {prices.map(price =>
                                    <option key={price} value={price}>
                                        {price < 10000 ? `Bis ${price} CHF` : "Alle"}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={{span: 8}}>
                    {scooters.map((scooter) => (
                        <div style={{
                            cursor: 'pointer',
                            display: "flex",
                            border: "1px solid #eee",
                            margin: 16,
                            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)',
                            borderRadius: 2
                        }}
                             onClick={() => handleClick(scooter.id)}>
                            <img src={`data:image/png;base64,${scooter.image}`}
                                 style={{width: 250, height: 250, objectFit: 'scale-down'}}/>
                            <div style={{padding: 8, display: "flex", flexDirection: "column"}}>
                                <div style={{fontWeight: 'bold'}}>{scooter.name}</div>
                                <div>{scooter.description}</div>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2em',
                                    marginTop: 'auto',
                                    marginBottom: 16
                                }}>CHF {scooter.price}.-
                                </div>
                            </div>
                        </div>
                    ))}
                    {
                        scooters.length === 0 &&
                        <Alert variant={"warning"}>
                            <Alert.Heading>Keine Treffer</Alert.Heading>
                            Leider haben wir momentan nicht genau den Scooter, den Sie suchen
                        </Alert>
                    }
                </Col>
            </Row>

            <Row style={{paddingTop: 16, paddingBottom: 16}}>
                <Col md={{span: 10, offset: 1}}>
                    <hr/>
                    <div style={{fontWeight: 'bold', padding: 16}}>Top Scooters</div>
                    <TopScooter history={history}/>
                </Col>
            </Row>
        </>

    )
}

export default withRouter(SearchPage);