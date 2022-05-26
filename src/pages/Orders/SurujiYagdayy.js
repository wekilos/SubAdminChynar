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
    const [maglumat,setMaglumat] = props.mag;
    console.log(maglumat)
    const [name_tm,setName_tm]=useState();
    const [name_ru,setName_ru]=useState();
    const [name_en,setName_en]=useState();
    
    useEffect(()=>{
      setName_en(maglumat && maglumat.name_en)
      setName_ru(maglumat && maglumat.name_ru)
      setName_tm(maglumat && maglumat.name_tm)
    },[maglumat])
    
    const EditStatus = ()=>{
      axiosInstance.patch("/api/status/update/"+maglumat.id,{
        name_tm:name_tm,
        name_ru:name_ru,
        name_en:name_en
      }).then((data)=>{
        console.log(data.data);
        message.success(data.data.msg);
        getStatuses();
        // setName_tm();
        // setName_ru();
        // setName_en();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore={dil==="TM"?"Status ady tm":"Имя статуса тм"} className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore={dil==="TM"?"Status ady ru":"Имя статуса ru"}   className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore={dil==="TM"?"Status ady en":"Имя статуса en"}   className='suruji-yagdayy--input' />
           
                
                <Button onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Üýtget":"Редактировать"}</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Goýbolsyn":"Отмена"}</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;