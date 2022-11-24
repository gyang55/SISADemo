import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { BuildingContext } from '../Context/context';

export default function ItemCard(props) {

    const navigate = useNavigate()
    const { pathname, state } = useLocation()

    // Event handler for Card to navigate
    function cardNavigate(event) {
        let clickedCardTitle = event.target.innerText
        let path = '../'
        let new_state = {}

        console.log('clicked card title: ', clickedCardTitle)

        if (pathname === '/dataCollection') {
            path += 'buildingpage'
            new_state = {
                buildingName: clickedCardTitle, subSection: null,
            }
        } else {
            path += clickedCardTitle.toLowerCase().split(' ')[0]
            new_state = {
                ...state, subSection: clickedCardTitle
            }
        }

        navigate(path, { state: new_state })
    }

    return (
        <Card className='my-3'>
            <CardContent
                className='bg-sisa-header hover:opacity-90 justify-content-center'
                onClick={cardNavigate}
            >
                <p className='text-md text-white text-center'>{props.title}</p>
            </CardContent>
            <CardActions className='justify-center' >
                <p className='text-md text-sisa-indigo text-center'>{props.status ? 'Completed' : 'Incomplete'}</p>
            </CardActions>
        </Card>
    )
}


