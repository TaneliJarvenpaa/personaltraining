import React, { useState } from "react";
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AddTraining({ addTraining, params }) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '', 
        duration: '',
        customer: params.value
    })
    
    const save = () => {
        addTraining(training);
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: ''
        })
    }
    const [customer, setCustomer] = useState({
        name: ''
    })

    const openEdit = () => {
        setOpen(true);
        setCustomer({
            name: params.data.firstname + " " + params.data.lastname
        })
    }

   

    

    const inputChanged = (event, data) => {
        setTraining({...training, [event.target.name]: event.target.value})
    } 
    const cancel = () => {
        setOpen(false);
    }

    return(
        <>
        <div>
        <IconButton onClick={openEdit}>
            <AddCircleIcon />
        </IconButton>
        <Dialog open={open} onClose={cancel}>
            <DialogTitle>Lisää uusi treeni</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Päivä & Kellonaika"
                    value={training.date}
                    inputFormat="DD-MM-YYYY                         HH:mm"
                    onChange={(newValue) => {
                    setTraining({...training, date: newValue});
                }}
                renderInput={(params) => 
                <TextField variant='standard' {...params} fullWidth /> }
                />
            </LocalizationProvider>
                <TextField
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Mitä treenasi"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    margin="dense"
                    label="Kesto"
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={save}>Tallenna</Button>
                    <Button onClick={cancel}>Peruuta</Button>
                    
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}

export default AddTraining;