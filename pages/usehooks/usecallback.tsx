import React, {useEffect, useState, useCallback} from 'react';
import {Button} from "@mui/material";

function Usecallback() {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);
    const [items, setItems] = useState<number[]>([0])

    //useCallback returns the actual function
    // while useMemo returns the value that is being returned.

    const getItems = useCallback((increment: number) => {
        return [number, number + increment, number + increment*2]
    }, [number])

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333'
    }


    useEffect(() => {
        setItems(getItems(50))
        console.log('updating items')
    },[getItems])

    return (
        <div style={theme}>
            <input
                type='number'
                value={number}
                onChange={e => setNumber(parseInt(e.target.value))}
            />
            <Button
                onClick={() => setDark(prevDark => !prevDark)}>
                Toggle theme
            </Button>
            {
                items.map(item => <div key={item}>{item || 0}  </div>)
            }
        </div>
    );
}

export default Usecallback;