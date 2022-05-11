import React,{useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Space,message,Table,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [width,height] = useSizeComponents();
    const [data,setData]=props.data;
    const getUnits = props.getUnits;

    const columns = width>850? [
        {
            title:"Unit No",
            dataIndex:"id"
        },
        {
            title:"Unit ady tm",
            dataIndex:"name_tm"
        },
        {
            title:"Unit ady ru",
            dataIndex:"name_ru"
        },
        {
            title:"Unit ady en",
            dataIndex:"name_en"
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUnit(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ]
    :[
        {
            title:"Unit No",
            dataIndex:"id"
        },
        {
            title:"Unit ady tm",
            dataIndex:"name_tm"
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space >
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUnit(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ]

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState();
    const DeleteUnit = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/unit/delete/"+event.id).then((data)=>{
            message.success(data.data.msg);
            getUnits();
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setMaglumat();
    setMaglumat(event);
    
}




    return(
        <div className='LukmanTable'>
           
                <Drawer
                width={width>850?400:320}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} unit={[maglumat,setMaglumat]} getUnits={getUnits}/>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;