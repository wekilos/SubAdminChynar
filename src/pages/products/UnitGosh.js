import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import { axiosInstance } from '../../utils/axiosIntance';


const UnitGosh = props =>{
    const getUnits = props.getUnits;
    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [name_en,setName_en] = useState();
    const [loading, setLoading] = useState(false);

    const UnitGosh = ()=>{
        setLoading(true);
        axiosInstance.post("/api/unit/create",{
            name_tm:name_tm,
            name_ru:name_ru,
            name_en:name_en
        }).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            setName_tm();
            setName_ru();
            setName_en();
            getUnits();
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
            message.warn("Internet baglanşygyňyzy barlaň!")
        })
    }

    return (
        <div className='suruji-yagdayy'>
            {!loading ? <form className='suruji-yagdayy--form' >
            
               <Input style={{width:"100%"}} value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}}  name='surujiNo' addonBefore='Unit ady tm'  className='suruji-yagdayy--input' />
               <Input style={{width:"100%"}} value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}}  name='surujiNo' addonBefore='Unit ady ru'  className='suruji-yagdayy--input' />
               <Input style={{width:"100%"}} value={name_en} onChange={(e)=>{setName_en(e.target.value)}}  name='surujiNo' addonBefore='Unit ady en'  className='suruji-yagdayy--input' />
         

                <Button onClick={UnitGosh} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Goş</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
               }
        </div>
    );
};

export default UnitGosh;