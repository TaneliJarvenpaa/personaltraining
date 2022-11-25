import Treenit from './components/treenit';
import Asiakassivu from './components/asiakassivu';
import Koti from './components/kotisivu';
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
            
        </Tabs>
        {value === 'Koti' && <Koti />}
        {value === 'Asiakassivu' && <Asiakassivu />}
        {value === 'Treenit' && <Treenit />}
        
    </div>);
}

export default App;
