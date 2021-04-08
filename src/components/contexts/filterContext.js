import React, {createContext, useContext, useEffect, useState} from "react";
import api from "../../config/api";
import {ScooterContext} from "./scooterContext";

export const FilterContext = createContext();

function FilterContextProvider(props) {

    const {updateScooters} = useContext(ScooterContext);

    const [selectedBrand, setSelectedBrand] = useState();
    const [brands, setBrands] = useState([]);
    const [selectedModel, setSelectedModel] = useState();
    const [models, setModels] = useState([]);
    const [prices, setPrices] = useState([1000000, 250, 500, 1000, 1500, 2000, 4000]);
    const [selectedPrice, setSelectedPrice] = useState();


    const getBrands = () => {
        api.get("/brands").then(response => {
            setBrands(response.data)
            updateScooters();
        });
    }

    const selectBrand = (brandId, update = true) => {
        const brand = brands.find(b => b.id === brandId);
        setSelectedBrand(brand);
        setModels(brand?.models || []);
        setSelectedModel(undefined)
        if (update) {
            updateScooters({price: selectedPrice, brand: brand?.name, model: undefined});

        }
    }

    const selectModel = (modelId, update = true) => {
        const model = selectedBrand?.models.find(m => m.id === modelId);
        setSelectedModel(model || {id: 'alle'});
        if (update) {
            updateScooters({price: selectedPrice, brand: selectedBrand?.name, model: model?.name});
        }
    }

    const selectPrice = (price, update = true) => {
        setSelectedPrice(price);
        if (update) {
            updateScooters({price, brand: selectedBrand?.name, model: selectedModel?.name});
        }
    }

    useEffect(() => {
        getBrands();
    }, [])

    return (
        <FilterContext.Provider
            value={{
                selectBrand,
                selectedBrand,
                brands,
                prices,
                selectedPrice,
                selectPrice,
                selectedModel,
                selectModel,
                models,
                setModels
            }}>
            {props.children}
        </FilterContext.Provider>
    );
}

export default FilterContextProvider;
