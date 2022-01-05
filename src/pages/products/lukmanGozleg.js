import React from 'react';

import {Button,Input, message} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
import { axiosInstance } from '../../utils/axiosIntance';

const LukmanGozleg = props=>{
    const GoshButton=props.GoshButton;
    const NewProducts = ()=>{
        axiosInstance.patch("/api/products/update/new").then(()=>{
            message.success("Succesfully!")
        }).catch((err)=>{
            console.log(err);
        })
    }
    const SaleProducts = ()=>{
        axiosInstance.patch("/api/products/update/saleUntil").then((data)=>{
            console.log(data.data)
            message.success("Succesfully!")
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <h2 style={{margin:"10px 10px"}}>Admin Haryt Unit page</h2>
                {/* <Input placeholder = 'Umumy Gözleg' className='lukman-gozleg--input' /> */}
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                <div>
                <Button onClick={()=>NewProducts()} shape='round' type='primary'  className='lukman-gozleg--button'>Täze Harytlar</Button>
                <Button onClick={()=>SaleProducts()} shape='round' type='primary'  className='lukman-gozleg--button'>Skitka Harytlare</Button>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button>
                </div>
            </form>
            
        </div>
    );
};

export default LukmanGozleg;

