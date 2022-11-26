import Treenit from './components/treenit';
import Asiakassivu from './components/asiakassivu';
import Koti from './components/kotisivu';
import Calendar from './components/Calendar';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';

function App() {
      const [value, setValue] = useState('Koti');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
    <div className="App">
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="Koti" label="Koti" />
            <Tab value="Asiakassivu" label="Asiakassivu" />
            <Tab value="Treenit" label="Treenit" />
            <Tab value="Kalenteri" label="Kalenteri" />
            
        </Tabs>
        {value === 'Koti' && <Koti />}
        {value === 'Asiakassivu' && <Asiakassivu />}
        {value === 'Treenit' && <Treenit />}
        {value === 'Kalenteri' && <Calendar />}
    </div>);
}

export default App;
