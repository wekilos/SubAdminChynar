import React from 'react';

import {Input,Button,Tabs,Checkbox} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';
import './yolda.css';

const {TextArea}=Input;
const Yolda = props=>{

    const Checked = (e)=>{
        console.log(`checked = ${e.target.checked}`);
    }

    return(
        <div className='yolda'>
            
            <div >
                <form className='yolda-form'>
                    <div className="filter">
                        <label className="yolda-label">
                            Awtobusyň Ýol Hat No: 
                        </label>
                        <Input placeholder="Ýol Haty No" className='kabul-input' addonAfter={<SearchOutlined/>} />
                    </div>
                <div className='mehanik-form'>
                <div className='labels'>
                    <label className="yolda-label">
                        Garaža gelen wagty: 
                    </label>
                    <Input type='date' className='yolda-input' />
                </div>
                <div className='labels'>
                    <label className="yolda-label">
                        Garaždan çykan wagty: 
                    </label>
                    <Input type='date' className='yolda-input' />
                </div>

                <label >
                    <TextArea style={{display:"flex",justifyContent:"center",height:"80px"}} row="4" className='textArea' placeholder="Sebäbi..." />
                </label>

                <div className='labels'>
                    <label className="yolda-label">
                        Ýolda duran wagty: 
                    </label>
                    <Input type='date' className='yolda-input' />
                </div>
                <div className='labels'>
                    <label className="yolda-label">
                        Ýolda ugran wagty: 
                    </label>
                    <Input type='date' className='yolda-input' />
                </div>

                <label >
                    <TextArea style={{display:"flex",justifyContent:"center",height:"80px"}} row="4" className='textArea' placeholder="Sebäbi..." />
                </label>
                <div>
                    <Button type='primary' shape='round' className='yolda-button' >Hasaba al</Button>
                </div>
                
                </div>
                </form>
            </div>
        </div>
    );
};

export default Yolda;