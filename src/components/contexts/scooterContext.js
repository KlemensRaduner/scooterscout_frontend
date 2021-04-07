import React, {createContext, useEffect, useState} from "react";
import api from "../../config/api";

export const ScooterContext = createContext();

function ScooterContextProvider(props) {
    const [scooterCount, setScooterCount] = useState()
    const [scooters, setScooters] = useState([]);
    const [topScooters, setTopScooters] = useState([])

    useEffect(() => {
        api.get("/scooters/top10").then(response => {
            setTopScooters(response.data);
        });

        api.get("/scooters/count").then(response => {
            setScooterCount(response.data);
        })
    }, [])


    const updateScooters = (params) => {
        api.get("/scooters", {params}).then(response => {
            setScooters(response.data);
        })
    }

    return (
        <ScooterContext.Provider value={{scooters, setScooters, topScooters, updateScooters, scooterCount}}>
            {props.children}
        </ScooterContext.Provider>
    );
}

export default ScooterContextProvider;
