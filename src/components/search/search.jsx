import {AsyncPaginate} from "react-select-async-paginate"
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../apiKeys";


const Search = ({onChangeSearch}) => {
    const [search, setSearch] = useState(null);


    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onChangeSearch(searchData)
    };

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) =>{
                        return {
                            value: `${city.latitude} ${city.longitude}` ,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                }),
            }})
            .catch((error => console.error(error)))

    }

    return (
        <AsyncPaginate
            placeholder="Search for city..."
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;