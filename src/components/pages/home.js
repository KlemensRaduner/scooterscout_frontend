import React, {useContext} from "react";
import banner from "../../resources/images/bg.jpg";
import "./homePageStyle.css";
import {Form, Row, Col, Button} from "react-bootstrap";
import {FilterContext} from "../contexts";
import {withRouter} from "react-router-dom";
import TopScooter from "../topScooters/topScooters";
import {ScooterContext} from "../contexts/scooterContext";

const HomePage = ({history}) => {

    const {scooterCount, scooters} = useContext(ScooterContext);
    const {brands, models, prices, selectBrand, selectModel, selectPrice} = React.useContext(FilterContext);

    const search = () => {
        history.push("/search")
    }

    return (
        <>
            <img src={banner} alt={"banner"} className={"banner"}/>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <div className={'search-box'}>
                        <div style={{paddingBottom: 16}}>
                            <div style={{fontSize: 24}}> Suchen Sie in <span
                                style={{color: 'orange'}}>{scooterCount}</span> Fahrzeugen
                            </div>
                            <div>Auf dem grössten Schweizer Scootermarktplatz für Occasion und Neu</div>
                        </div>
                        <div className={'filter'}>
                            <Form>
                                <Row style={{paddingBottom: 16}}>
                                    <Col>
                                        <Form.Control as="select" size="lg"
                                                      onChange={(event) => selectBrand(event.target.value)}>
                                            <option hidden>Marke</option>
                                            <option value={"alle"}>Alle</option>
                                            {brands && brands.map(brand => <option value={brand.id}
                                                                                   key={brand.name}>
                                                {brand.name}
                                            </option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" size="lg" disabled={models.length <= 0}
                                                      onChange={(event) => selectModel(event.target.value)}>
                                            <option hidden>Model</option>
                                            <option value={"alle"}>Alle</option>
                                            {models && models.map(model => <option key={model.name} value={model.id}>
                                                {model.name}
                                            </option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" size="lg"
                                                      onChange={(event) => selectPrice(event.target.value)}>
                                            <option hidden>Preis</option>
                                            {prices.map(price =>
                                                <option
                                                    value={price}
                                                    key={price}> {price < 10000 ? `Bis ${price} CHF` : "Alle"}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="warning" className={'search-button'} onClick={search}>
                                        {scooters.length} Scooters
                                    </Button>
                                </div>
                            </Form>

                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{paddingTop: 16, paddingBottom:16}}>
                <Col md={{span: 10, offset: 1}}>
                    <div style={{fontWeight: 'bold',padding:16}}>Top Scooters</div>
                    <TopScooter history={history}/>
                </Col>
            </Row>
        </>
    )

}

export default withRouter(HomePage);