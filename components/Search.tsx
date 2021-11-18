import React, {useState} from 'react';
import {TextField, Box, Button} from "@mui/material";
import { gql, useLazyQuery } from "@apollo/client";

const GET_CHARACTER_LOCATIONS = gql`
 query GetCharacterLocations($name: String!) {
    characters(filter: {
         name: $name
      }) {
            results {
                location {
                    name
            }
        }
    }
 } 
`;

function Search() {
    const [ name, setName ] = useState('')
    const [ display, setDisplay ] = useState(false)

    const [getCharacterLocations, {loading, error, data, called}] = useLazyQuery(
        GET_CHARACTER_LOCATIONS, {
        variables: {
            name: titleCase(name)
        }
    })

    function titleCase(str: string) {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const handleSearchClick = () => {
        getCharacterLocations();
        setDisplay(true)
    }

    const handleSearchChange = (value: string) => {
        setName(value);
        setDisplay(false)
    }

    return (
        <Box>
            <TextField
                id="search"
                label="search"
                variant="outlined"
                value={name}
                onChange={(e) => handleSearchChange(e.target.value) }
            />
            <Button onClick={() => handleSearchClick()}>Search</Button>

            {loading && display && <Box>spinner...</Box>}
            {error && display && <Box>an error occurred</Box>}
            {data && display && (
                <ul>
                    {data.characters.results.map((character: any, index: number) => {
                        return <li key={index}>{character.location.name}</li>
                    })}
                </ul>
            )}

        </Box>
    );
}

export default Search;