import { useEffect } from 'react';
import { useState } from 'react'

export default function InputField(props) {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value)
    }, [props])
    return (
        <div className="mb-2" id={props.id}>
            <p className='text-md text-black text-left px-1'>{props.title}</p>
            <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
                type='text'
                value={value}
                placeholder={value}
                maxLength='100'
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
