import React, { useState, useEffect,useCallback, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Asiakassivu() {
    const [customer, setCustomer] = useState([]);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }
    const toCsv = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Asiakas lisätty!');
                setOpen(true);
                fetchCustomers();
            } else {
                alert('Ei onnistunut')
            }
        })
        .catch(err => console.error(err))
    }
    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
          method: 'PUT',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
          if (response.ok) {
            setMsg('Asiakas päivitetty');
            setOpen(true);
            fetchCustomers();
          } else {
            alert('Ei onnistunut');
          }
        })
        .catch(err => console.error(err))
      }

      const deleteCustomer = (link) => {
        if (window.confirm('Oletko varma?')) {
            fetch(link, {method: 'DELETE'})            
            .then(response => {                      
            if (response.ok) {
                setMsg('Poistettu');
                setOpen(true);
            } else {
                alert('Ei onnistunut')
            }
        })
      }
    }

    const addTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                setMsg("Treeni lisätty onnistuneesti!");
                setOpen(true);
                fetchCustomers();
            } else {
                alert("Ei onnistunut")
            }
            })
            .catch(err => console.error(err))
        
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true, width: 140 },
        { field: 'lastname', sortable: true, filter: true, width: 140 },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 110 },
        { field: 'city', sortable: true, filter: true, width: 110 },
        {
            headerName: 'Modify Customer',
            width: 150,
            field: 'links.0.href',                   
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
          },
        { 
            headerName: 'Add new training',
            width: 150,
            field: 'links.0.href',
            cellRenderer: params => <AddTraining addTraining={addTraining} params={params} />
        },
        {    
            headerName: 'Delete', 
            width: 120,
            field: 'links.0.href',                      
            cellRenderer: params =>                
            <IconButton onClick={() => deleteCustomer(params.value)}>    
                <DeleteForeverIcon/> 
                            
            </IconButton>   }                          
    ]

    return (
        <>
         <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{ height: 600, width: '90%' }}>
            <AgGridReact
            floatingFilter
            animateRows={true}
            columnDefs={columns}
            rowData={customer}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            ref={gridRef}
            />
            <IconButton onClick={toCsv}>
                <UploadFileIcon />Lataa tästä asiakastiedot
            </IconButton>
        </div>
        </>
    )
}

