import React from 'react';

import './busGozle.css';

import {Input,Button} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';

const BusGozle = props=>{
    const GoshButton=props.GoshButton;
    return(
        <div className='bus-gozle'>
            <form className='bus-gozle--form'>
                <div>
                <Input className='bus-gozle--input' placeholder='Döwlet No' addonAfter={<SearchOutlined/>}/>
                <Input className='bus-gozle--input' placeholder='Umumy Gözleg' addonAfter={<SearchOutlined/>}/>
                </div>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='bus-gozle--button'> Awtobus Goş </Button>
           </form>
        </div>
    );
};

export default BusGozle;