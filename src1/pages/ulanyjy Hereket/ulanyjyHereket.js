import React from 'react';
import HereketFilter from './HereketFilter';
import HereketTable from './HereketTable';

import './ulanyjyHereket.css';


const UlanyjyHereket = props=>{
    return (
        <div className='ulanyjy-hereket'>
            <div className='filter'>
                <HereketFilter/>
            </div>
            <div className='Table'>
                <HereketTable/>
            </div>
        </div>
    );
}; 

export default UlanyjyHereket;