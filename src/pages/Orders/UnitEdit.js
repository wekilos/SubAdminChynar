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
    const getOrders = props.getOrders;
    const [emaglumat,setEmaglumat] =  props.order;
    const [status,setStatus ] = useState([]);
    const [statusId,setStatusId] = useState();
    console.log("orders",emaglumat);

    useEffect(()=>{
        getStatus()
    },[])

    const getStatus =()=>{
        axiosInstance.get("/api/statuses").then((data)=>{
            console.log(data.data);
            setStatus(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const Uytget=()=>{
        axiosInstance.patch("/api/order/status/"+emaglumat.id,{
            StatusId:statusId
        }).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getOrders();
            setStatusId(null);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    const onChangeS = (value)=>{
        console.log(value,emaglumat.id);
        setStatusId(value);
        
    }
    

 
      

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
                <h1 style={{width:"90%"}}>{emaglumat && emaglumat.Status && (dil==="TM"?emaglumat.Status.name_tm:emaglumat.Status.name_ru)}</h1>
                
                <Select
                    style={{width:"90%"}}
                    className='suruji-yagdayy--input' 
                    // className="yolHaty-gozle--input"
                    showSearch
                    // style={{ width: 200 }}
                    placeholder={dil==="TM"?"Status üýtget":"Изменить статус"}
                    optionFilterProp="children"
                    value={statusId}
                    onChange={onChangeS}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
            
            {
              status.map((sta)=>{
                return <Option value={sta.id}>{dil==="TM"?sta.name_tm:sta.name_ru}</Option>
              })
            }
          </Select>

                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> {dil==="TM"?"üýtget":"Изменить"}</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Goýbolsun":"Отмена"}</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;