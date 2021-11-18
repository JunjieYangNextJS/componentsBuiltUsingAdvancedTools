import React, {useState, useEffect, useRef} from 'react';

function Useref() {
    const [name, setName] = useState('')
    const prevName = useRef('')

    useEffect(() => {
        prevName.current = name
    },[name])

    //useRef stores the value from the previous state
    //and does not cause a rerender when it changes.

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <div>My name is {name} and it used to be {prevName.current}</div>
        </div>
    );
}

export default Useref;