import React from 'react';
import {useRouter} from "next/router";
import {useCharacter} from "../../hooks/useCharacter";
import {Box} from "@mui/material";
import Image from "next/image";

function Character() {
    const router = useRouter();
    const id = router.query.id;

    const {data, loading, error} = useCharacter(id)

    // const {name, gender, image, episode} = data?.character
    console.log(error, loading, data)

    if(loading) return <Box>spinner</Box>;
    if(error) return  <Box>something went wrong</Box>

    return(
    <Box>
        <Image src={data?.character.image} width={300} height={300}/>
        <Box>{data?.character.name}</Box>
        <Box>{data?.character.gender}</Box>
        <Box>{data?.character.episode.map((ep: any) => {
            return <div key={ep.name}>
                {ep.name} - <b>{ep.episode}</b>
            </div>
        })}</Box>
    </Box>
)
;
}

export default Character;