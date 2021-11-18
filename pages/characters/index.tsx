import React from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';
import {useRouter} from "next/router";
import {useCharacters} from "../../hooks/useCharacters";
import Search from "../../components/Search";


function Index() {
    const router = useRouter();
    const {error, loading, data} = useCharacters()


    if(loading) return <Box>spinner</Box>;
    if(error) return  <Box>something went wrong</Box>


    return (
        <>
            <Search/>
            <ButtonGroup >{data?.characters.results.map((character: any) => {
                return  (
                    <Button key={character.id} onClick={() => router.push(`/character/${character.id}`)}>
                        <img src={character.image}/>
                        <h2>{character.name}</h2>
                    </Button>)

            })}</ButtonGroup>
        </>

    );
}

export default Index;