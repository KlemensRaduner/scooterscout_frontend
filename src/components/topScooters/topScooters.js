import React from "react";
import {ScooterContext} from "../contexts/scooterContext";
import "./topScootersStyle.css";

const TopScooter = ({history}) => {

    const {topScooters} = React.useContext(ScooterContext);

    const handleClick = (id) => {
        history.push("/scooter/" + id)
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 16,
            flexWrap: 'wrap',
            height: 200,
            overflow: "hidden"
        }}>
            {topScooters.map(s => (
                <div key={s.id} className={'preview-box'} onClick={() => handleClick(s.id)}>
                    <img src={`data:image/png;base64,${s.image}`}/>
                    <div className={'preview-box-description'}
                         style={{color: "white", backgroundColor: "#00478c", paddingLeft: 5}}>
                        {`CHF ${s.price}`}
                        <br/>
                        {s.name}
                    </div>
                </div>)
            )}
        </div>
    );
}
export default TopScooter;