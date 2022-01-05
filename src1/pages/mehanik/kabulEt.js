import React from 'react';

import {Input,Button,Tabs,Checkbox} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';
import './kabulEt.css';

const KabulEt = props=>{

    const Checked = (e)=>{
        console.log(`checked = ${e.target.checked}`);
    }

    return(
        <div className='kabulEt'>
            
            <div>
                <form className='kabul-form'>
                     <div className="filter">
                         <label className="kabul-label">
                              Awtobusyň Ýol Hat No: 
                        </label>
                          <Input placeholder="Ýol Haty No" className='kabul-input' addonAfter={<SearchOutlined/>} />
                     </div>
                <div className='mehanik-form'>
                <div className='labels'>
                    <label className="kabul-label">
                        Awtobusyň tehniki taýdan guratlygy: 
                    </label>
                    <Checkbox className='kabul-checkbox' onChange={Checked}></Checkbox>
                </div>
                <div className='labels'>
                    <label className="kabul-label">
                        Ýoldan gelen wagty: 
                    </label>
                    <Input type='date' className='kabul-input' />
                </div>
                <div className='labels'>
                    <label className="kabul-label">
                    Spidometriň görkezjisi: 
                    </label>
                    <Input type='text' placeholder='km...' className='kabul-input' />
                </div>
                <div className='labels'>
                    <label className="kabul-label">
                    Awtobusdaky ýangyjyň möçberi:
                    </label>
                    <Input type='text' placeholder='litr...' className='kabul-input' />
                </div>
                <div>
                    <Button type='primary' shape='round' className='kabul-button' >Hasaba al</Button>
                </div>
                
                </div>
                </form>
            </div>
        </div>
    );
};

export default KabulEt;