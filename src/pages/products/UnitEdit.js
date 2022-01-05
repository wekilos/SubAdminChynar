import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    const getUnits = props.getUnits;
    const [maglumat,setMaglumat] =  props.unit;
    const [name_tm,setName_tm] = useState(maglumat && maglumat.name_tm);
    const [name_ru,setName_ru] = useState(maglumat && maglumat.name_ru);
    const [name_en,setName_en] = useState(maglumat && maglumat.name_en);
    const [loading, setLoading] = useState(false);
    console.log("Units",maglumat);

    useEffect(()=>{
        if(maglumat){
            // setName_tm(emaglumat.name_tm)
            // setName_ru(emaglumat.name_ru)
            // setName_en(emaglumat.name_en)
            
        }
    },[])

    

    const Uytget=()=>{
        setLoading(true);
        axiosInstance.patch("/api/unit/update/"+maglumat.id,{
            name_tm:maglumat.name_tm,
            name_ru:maglumat.name_ru,
            name_en:maglumat.name_en
        }).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getUnits();
            setName_tm();
            setName_ru();
            setName_en();
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
                { maglumat && <Input style={{width:"100%"}} value={maglumat.name_tm} onChange={(e)=>{setMaglumat({...maglumat,name_tm:e.target.value })}}  name='surujiNo' addonBefore='Unit ady tm'  className='suruji-yagdayy--input' />
                }{ maglumat && <Input style={{width:"100%"}} value={maglumat.name_ru} onChange={(e)=>{setMaglumat({...maglumat,name_ru:e.target.value })}}  name='surujiNo' addonBefore='Unit ady ru'  className='suruji-yagdayy--input' />
                }{ maglumat && <Input style={{width:"100%"}} value={maglumat.name_en} onChange={(e)=>{setMaglumat({...maglumat,name_en:e.target.value })}}  name='surujiNo' addonBefore='Unit ady en'  className='suruji-yagdayy--input' />
            }

                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Unit üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsun</Button>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
        }
        </div>
    );
};

export default SurujiYagdayy;