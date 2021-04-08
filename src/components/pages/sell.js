import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import api from "../../config/api";
import {FilterContext, UserContext} from "../contexts";
import {withRouter} from "react-router-dom";


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/[^,]*,/, ""));
        reader.onerror = (error) => reject(error);
    });
}


const SellPage = ({history}) => {

    const {user} = useContext(UserContext);
    const {
        selectBrand,
        brands,
        selectedModel,
        selectModel,
        models,
    } = useContext(FilterContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        selectBrand(brands[0]?.id, false);
    }, [brands])

    useEffect(() => {
        selectModel(models[0]?.id, false);
    }, [models])

    const submit = (event) => {
        api.post("/scooters", {name, description, image, price, street, city, model: selectedModel, user: user})
    }

    if (user) {
        return (
            <Row style={{paddingTop: 16, paddingBottom: 16}}>
                <Col md={{span: 10, offset: 1}}>
                    <Form>
                        <Form.Group controlId="brand">
                            <Form.Label style={{fontWeight: 'bold'}}>Marke</Form.Label>
                            <Form.Control as="select" size="lg"
                                          onChange={(event) => selectBrand(event.target.value, false)}>
                                {brands && brands.map(brand => <option value={brand.id}
                                                                       key={brand.name}>
                                    {brand.name}
                                </option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="model">
                            <Form.Label style={{fontWeight: 'bold'}}>Model</Form.Label>
                            <Form.Control as="select" size="lg" disabled={models.length <= 0}
                                          onChange={(event) => selectModel(event.target.value,false)}>
                                {models && models.map(model => <option value={model.id}
                                                                       key={model.name}>
                                    {model.name}
                                </option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label style={{fontWeight: 'bold'}}>Name</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setName(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Name darf nicht leer sein.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label style={{fontWeight: 'bold'}}>Beschreibung</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setDescription(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Beschreibung darf nicht leer sein.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label style={{fontWeight: 'bold'}}>Preis</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">CHF</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="number" onChange={(e) => setPrice(e.target.value)}/>
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                                Preis darf nicht leer sein.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="street">
                            <Form.Label style={{fontWeight: 'bold'}}>Strasse</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setStreet(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Strasse darf nicht leer sein.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label style={{fontWeight: 'bold'}}>PLZ / Stadt</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setCity(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                PLZ / Stadt darf nicht leer sein.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label style={{fontWeight: 'bold'}}>Bild hochladen</Form.Label>
                            <Form.Control type="file" onChange={(event) => {
                                const file = event.target.files[0];
                                getBase64(file).then((result) => {
                                    setImage(result);
                                });
                            }} required/>
                        </Form.Group>


                        <Button type={"submit"} onClick={submit} style={{marginTop: 64}}>Scooter Anbieten</Button>
                    </Form>
                </Col>
            </Row>
        )
    }

    history.push("/login")
    return null;
}

export default withRouter(SellPage);