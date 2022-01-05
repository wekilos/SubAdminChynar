import React, { useState } from 'react';
import {Table,Button,Space,Modal,Input} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import './surujiTable.css';
         
const SurujiTable = (props)=>{
    const [data,setData]=useState([
        {
            ady:"Wekill",
            familyasy:"yazgulyyew",
            a_ady:"Bazarowich",
            surujiNo:"2555",
            telefonbelgi:65085630,
            salgysy:"ashgabat",
            doglanSene:"19.02.2000",
            active:true
        },
        {
            ady:"Wekil",
            familyasy:"yazgulyyew",
            a_ady:"Bazarowich",
            surujiNo:"2575",
            telefonbelgi:65085630,
            salgysy:"ashgabat",
            doglanSene:"19.02.2000",
            active:true
        },
        {
            ady:"Wekiil",
            familyasy:"yazgulyyew",
            a_ady:"Bazarowich",
            surujiNo:"2585",
            telefonbelgi:65085630,
            salgysy:"ashgabat",
            doglanSene:"19.02.2000",
            active:true
        },
        {
            ady:"Weekil",
            familyasy:"yazgulyyew",
            a_ady:"Bazarowich",
            surujiNo:"2595",
            telefonbelgi:65085630,
            salgysy:"ashgabat",
            doglanSene:"2000-02-19",
            active:true
        }
                ]); 
    const columns = [
        {
           title:"Ady",
           dataIndex:"ady",
        },
        {
            title:"Familýasy",
            dataIndex:"familyasy",
        },
        {
            title:"Suruji No",
            dataIndex:"surujiNo"
        },
        {
            title:"Telefon belgi",
            dataIndex:"telefonbelgi"
        },
        {
            title:"Goşmaça maglumat we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowModal(record)}>Goşmaça</Button>
                    <Button type='primary'shape='round'onClick={()=>ShowModal2(record)} ><EditOutlined /></Button>
                    {record.active ?(<Button type='primary' shape='round' danger onClick={()=>DeleteUser(record.surujiNo)} ><DeleteOutlined /></Button>):
                    (<Button type='primary' shape='round'  onClick={()=>DeleteUser(record.surujiNo)} ><DeleteOutlined /></Button>)}
                  
                </Space>
              ),
        },
       
    ];

    const [visible,setVisible]=useState(false);
    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const DeleteUser = (event)=>{
        console.log(event);
       
    }
    const ShowModal = (event)=>{
            setVisible(!visible);
            console.log(event);
            setMaglumat([]);
            setMaglumat(event);
    }
    const ShowModal2 =(event)=>{
          setEdit(!edit);
          setVisible(false);
          console.log(event);
          setMaglumat([]);
          setMaglumat(event);
    }
    const inputChangeHandler=(event)=>{
        console.log(event.target.name);
        let name=event.target.name;
        let value=event.target.value;

        setMaglumat({
            ...maglumat,
            [name]:value
        })            
    }
    const saveData = (event)=>{
        setData([
            ...data,
            maglumat
        ]);
        setEdit(false);

    }


    return(
        <div className='surujiTable'>
            <Modal
                visible={visible}
                title='Goşmaça Maglumat'
                onCancel={ShowModal}
                footer={[
                    <Button key="back" onClick={ShowModal}>
                      Goý bolsun
                    </Button>,
                    <Button key="submit" type="primary"  onClick={ShowModal2}>
                      Üýtgetmek <EditOutlined />
                    </Button>,
                  ]}
                >
           <ul className="Goshmacha--ul">
            <li className='modalLi' key={maglumat.ady}><b>Ady: </b>{maglumat.ady}</li>
            <li className='modalLi' key={maglumat.familyasy}><b>Familýasy: </b>{maglumat.familyasy}</li>
            <li className='modalLi' key={maglumat.a_ady}><b>Atasynyň Ady: </b>{maglumat.a_ady}</li>
            <li className='modalLi' key={maglumat.surujiNo}><b>Sürüji No: </b>{maglumat.surujiNo}</li>
            <li className='modalLi' key={maglumat.telefonbelgi}><b>Telefon Belgi: </b>{maglumat.telefonbelgi}</li>
            <li className='modalLi' key={maglumat.salgysy}><b>Salgys: </b>{maglumat.salgysy}</li>
            <li className='modalLi' key={maglumat.doglanSene}><b>Doglan Sene: </b>{maglumat.doglanSene}</li>
        </ul>


            </Modal>
            <Modal
                visible={edit}
                title="Üýtgetmeler"
                onCancel={ShowModal2}
                footer={[
                    <Button key="back" onClick={ShowModal2}>
                      Goý bolsun
                    </Button>,
                    <Button key="submit" type="primary"  onClick={saveData}>
                      Üýtgetmek <EditOutlined />
                    </Button>,
                  ]}
                >
                <Input style={{width:"200px"}} addonBefore='Sürüji No'name='surujiNo' placeholder='Sürüji No' className='suruji-uytget--input' value={maglumat.surujiNo}  onChange={inputChangeHandler}/>
                <Input addonBefore='Ady' className='suruji-uytget--input' name='ady' value={maglumat.ady} onChange={inputChangeHandler}  />
                <Input addonBefore='Familýasy'className='suruji-uytget--input'name='familyasy' value={maglumat.familyasy} onChange={inputChangeHandler} />
                <Input addonBefore='A.Ady' className='suruji-uytget--input' name='a_ady' value={maglumat.a_ady} onChange={inputChangeHandler}/>
                <Input style={{marginRight:"20px"}} type='date'addonBefore='Doglan-sene' name='doglanSene' className='suruji-uytget--input' value={maglumat.doglanSene} onChange={inputChangeHandler}/>
                <Input addonBefore='Telefon belgi' className='suruji-uytget--input' name='telefonbelgi' value={maglumat.telefonbelgi} onChange={inputChangeHandler} />
                <Input addonBefore='Ýaşaýan ýeri' name="salgysy" className='suruji-uytget--input' value={maglumat.salgysy} onChange={inputChangeHandler}/>
            </Modal>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default SurujiTable;