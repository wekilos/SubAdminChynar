import React from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './mehanikFilter.css';
const { RangePicker } = DatePicker;
const {Option}=Select;
const MehanikFilter = props=>{
    const GoshButton=props.GoshButton;
    return(
        <div className='mehanik-gozleg'>
            <form className='mehanik-gozleg--form'>
                <div>
                <Input addonBefore='Sürüji No' className='mehanik-gozleg--input' />
                <Select defaultValue="all" className='mehanik-gozleg--input'>
                    <Option value='all'>Ählisi</Option>
                    <Option value="healthy">Sagdyn</Option>
                    <Option value="unhealthy">Näsag</Option>
                </Select>
               <RangePicker placeholder={['seneden','sena çenli']} className='mehanik-gozleg--input' />
                </div>
                </form>
            
        </div>
    );
};

export default MehanikFilter;

