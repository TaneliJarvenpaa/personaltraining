import React, { useEffect, useState } from 'react';
import { Calendar, luxonLocalizer,  Views } from 'react-big-calendar'
import { DateTime } from "luxon";
import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function KalenteriSivu() {
    const [trainings, setTrainings] = useState([]);
 
          useEffect( () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }, []);

    const localizer = luxonLocalizer(DateTime)

    const treenit = trainings.map((training) => (
        {start: new Date(training.date),
        end: new Date(new Date(training.date).getTime() + (training.duration)),
        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} Phone: ${training.customer.phone} `}
            ))

    return (
          <div style={{ height: 600, width: '90%' }}>
          <Calendar 
        events={treenit}
        step={60}
        localizer={localizer}
        popup={true}
             />
        </div>

    )
    

}