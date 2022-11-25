import React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";


function AddCustomer({ addCustomer }) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);          
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''      
        })
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})     
    }

    return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Lisää asiakas
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Lisää asiakas</DialogTitle>
            <DialogContent>
                <TextField
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Etunimi"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Sukunimi"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    margin="dense"
                    label="Osoite"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    margin="dense"
                    label="Postinumero"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    margin="dense"
                    label="Kaupunki"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    margin="dense"
                    label="Sähköposti"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    label="Puhelin"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions><Button onClick={handleSave}>Tallenna</Button>
            <Button onClick={handleClose}>Peruuta</Button>
             </DialogActions>
        </Dialog>
        </div>
    );

}

export default AddCustomer;