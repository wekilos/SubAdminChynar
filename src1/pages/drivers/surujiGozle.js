import React from 'react';

import {Input,Button} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';

import './surujiGozle.css';
const {Search}=Input
const SurujiGozle=props=>{
    const GoshButton=props.GoshButton
    return(
        <div className='suruji-gozle'>
            <form className='suruji-gozle--form'>
                <div>
                <Input style={{width:"200px"}}  className='suruji-gozle--input' placeholder='Suruji No' addonAfter={<SearchOutlined/>} />
                <Input className='suruji-gozle--input' placeholder='Umumy Gözleg' addonAfter={<SearchOutlined/>}/>
                </div>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji-gozle--button'> Sürüji Goş </Button>
            </form>
        </div>
    );
};

export default SurujiGozle;