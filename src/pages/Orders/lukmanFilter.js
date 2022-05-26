import React, { useContext } from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
import { SebedimContext } from '../../context/Sebedim';
const { RangePicker } = DatePicker;
const {Option}=Select;
const LukmanGozleg = props=>{
    const { dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents();
    const GoshButton=props.GoshButton;
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                {/* <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' /> */}
               <h2 style={{margin:"10px 10px"}}>{width>850? (dil==="TM"?"Admin Zakazlar Status page":"Страница статуса заказов администратора"):(dil==="TM"?"Status page":"Статус страницы")}</h2>
                
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>{dil==="TM"?"Status goş":"Добавить статус"}</Button>

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

