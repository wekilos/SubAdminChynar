import React,{useContext, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import StatusEdit from './SurujiYagdayy';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';

const LukmanTable = props=>{

    const { dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents();
    const [data,setData]=props.data;
    const getStatuses = props.getStatuses;
    
    const columns =width>850? [
        {
            title:dil==="TM"?"Status No":"Статус №",
            dataIndex:"id"
        },
        {
            title:dil==="TM"?"Status ady tm":"Имя статуса тм",
            dataIndex:"name_tm",
            
        },
        {
            title:dil==="TM"?"Status ady ru":"Имя статуса ru",
            dataIndex:"name_ru",
        },
        {
            title:dil==="TM"?"Status ady en":"Имя статуса en",
            dataIndex:"name_en"
        },
        {
            title:dil==="TM"?"Üýtgetmeler":"Изменения",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    {/* <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm> */}
                     </Space>
              ),
        }
    ]
    :[
        {
            title:dil==="TM"?"Status No":"Статус №",
            dataIndex:"id"
        },
        {
            title:dil==="TM"?"Status ady tm":"Имя статуса тм",
            dataIndex:"name_tm",
            
        },
        {
            title:dil==="TM"?"Üýtgetmeler":"Изменения",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space >
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    {/* <Popconfirm
                        title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm> */}
                     </Space>
              ),
        }
    ]

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/status/delete/"+event.id).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getStatuses()
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    const MoreInformation = async(event)=>{
        console.log("maglummat",event);
        setShowInfo(!showInfo);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    await setMaglumat(event);
}

const saveData = (event)=>{
    setData([
        ...data,
        maglumat
    ]);
    setEdit(false);
};


    return(
        <div className='LukmanTable'>
                <Drawer
                width={width>850?500:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Üýtgetmeler":"Изменения"}
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <StatusEdit getStatuses={getStatuses} mag={[maglumat,setMaglumat]} onClick={ShowDrawer}  />
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;