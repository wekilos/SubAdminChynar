import React,{useContext, useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';

const Option = {Select};

const SurujiYagdayy = props =>{
    
  const { dil } = useContext(SebedimContext);
    const getStatuses = props.getStatuses;
    const [name_tm,setName_tm]=useState();
    const [name_ru,setName_ru]=useState();
    const [name_en,setName_en]=useState();
    
    
    const EditStatus = ()=>{
      axiosInstance.post("/api/status/create",{
        name_tm:name_tm,
        name_ru:name_ru,
        name_en:name_en
      }).then((data)=>{
        console.log(data.data);
        message.success(data.data.msg);
        getStatuses();
        setName_tm();
        setName_ru();
        setName_en();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore={dil==="TM"?'Status ady tm':"Название статуса тм" } className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore={dil==="TM"?'Status ady ru':"Название статуса ru" } className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore={dil==="TM"?'Status ady en':"Название статуса en" }  className='suruji-yagdayy--input' />
           
                
                <Button style={{width:"40%"}} onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Goş":"Добавлять"}</Button>
                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Goýbolsyn":"Отмена"}</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;