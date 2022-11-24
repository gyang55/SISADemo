import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ButtonConfirmDialog(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {"Confirm the action"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    {props.dialog.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} style={{ color: '#FF0000' }}>Cancel</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    props.handleClose(props.dialog.buttonName)
                }}>
                    {props.dialog.buttonName}
                </Button>
            </DialogActions>
        </Dialog >

    )
}
