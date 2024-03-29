import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

// import StatusEdit from './SurujiYagdayy';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getStatuses = props.getStatuses;
    
    const columns = [
        {
            title:"Post No",
            dataIndex:"id"
        },
        {
            title:"Post Ady",
            dataIndex:"slug_tm",
            
        },
        {
            title:"Post Text ",
            dataIndex:"description_tm",
        },
        {
            title:"Ulanyjy ",
            render:(text,record)=>(
                <div>
                    <h3>{record.User && record.User.fname} {record.User && record.User.lastname}</h3>
                    <p>{record.User && record.User.phoneNumber}</p>
                </div>
            )
        },
        {
            title:"Öçürmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button> */}
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/post/delete/"+event.id).then((data)=>{
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
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    {/* <StatusEdit getStatuses={getStatuses} mag={[maglumat,setMaglumat]} onClick={ShowDrawer}  /> */}
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;