import React, {useMemo, useState} from 'react';
import {Button} from "@mui/material";

function Usememo() {

    const a = 'STRING_A';

    const [increment, setIncrement] = useState(0)

    const getA = useMemo(() => {
        console.log('once');

        if (a === 'STRING_A') {
            return 'duplicate';
        }

        if (a === 'STRING_B') {
            return 'good';
        }

        return 'N/A';

    }, [a])

    console.log(getA)

    return (
        <div><Button onClick={() => setIncrement(increment + 1)}>{increment}</Button></div>
    );
}

export default Usememo;