import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Treenit() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Oletko varma?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setMsg("Poistettu");
          setOpen(true);
          fetchTrainings();
        } else {
          alert("Ei onnistunut");
        }
      });
    }
  };
  const getCustomerName = (params) => {
    return params.data.customer.firstname + " " + params.data.customer.lastname;
  };

  const columns = [
    {
      headerName: "Customer",
      valueGetter: getCustomerName,
      width: 180,
    },
    { field: "activity", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        dayjs(params.value).format(" DD-MM-YYYY  HH:mm"),
    },
    {
      headerName: "",
      width: 90,
      field: "id",
      cellRenderer: (params) => (
        <IconButton onClick={() => deleteTraining(params.data.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  

  return (
    <>
      <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          columnDefs={columns}
          suppressCellFocus={true}
          rowData={trainings}
        />
      </div>
     
    </>
  );
}

export default Treenit;
