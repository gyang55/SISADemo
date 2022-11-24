
import * as React from 'react';
import Button from '@mui/material/Button';

function BottomNav_NewVer(props) {

    return (
        <>
            <Button style={{ ...props.style, borderRadius: 25, height: 50 }} onClick={(e) => {
                e.preventDefault()
                props.eventHandler(e)
            }} className='hover:opacity-80' >{props.name}</Button>
        </>
    )
}

export default BottomNav_NewVer;

