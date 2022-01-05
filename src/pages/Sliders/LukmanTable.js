import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getOrders = props.getOrders;

    const columns = [
        {
            title:"Order No",
            dataIndex:"id"
        },
        {
            title:"Haryt sany",
            dataIndex:"sany"
        },
        {
            title:"Umumy baha",
            dataIndex:"sum"
        },
        {
            title:"Töleg görnüşi",
            dataIndex:"is_cash",
            render:(text,record)=>(
                <div>
                    {record.is_cash && "Nagt töleg"}
                    {!record.is_cash && "Kart bilen töleg"}
                </div>
            )
        },
        {
            title:"Zakaz edilen wagty",
            dataIndex:"order_date_time",
            render:(text,record)=>(
                <div>
                    {record.order_date_time.slice(0,10)} {record.order_date_time.slice(11,19)}
                </div>
            )
        },
        {
            title:"Zakaz gowşurylan wagty",
            dataIndex:"delivery_date_time",
            render:(text,record)=>(
                <div>
                    {record.delivery_date_time.slice(0,10)} {record.delivery_date_time.slice(11,19)}
                </div>
            )
        },
        {
            title:"Zakaz status",
            render:(text,record)=>(
                <div>
                    {record && record.Status && record.Status.name_tm} 
                </div>
            )
        },
        {
            title:"Ulanyjy",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.User && record.User.fname} </h3> 
                    <p>{record && record.User && record.User.phoneNumber} </p>
                    <p>{ record.User.Addresses.map((id)=>{if(record.User.primary_addres_id === id.id)return id.rec_address })}</p>
                </div>
            )
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const DeleteOrder = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/order/delete/"+event.id).then((data)=>{
            message.success(data.data.msg);
            getOrders();
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setEmaglumat(event);
    console.log("maglumat",emaglumat)
    
}

const ShowInformation = (event)=>{
    setInfo(!info);
    console.log(event);
    setMaglumat(event);

}




    return(
        <div className='LukmanTable'>
                <Drawer
                    width={400}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                        { maglumat && <table border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={maglumat && maglumat.id}>
                            <td>ID </td>
                            <td>{maglumat && maglumat.id} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.sany}>
                            <td>Sany </td>
                            <td>{maglumat && maglumat.sany} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.sum}>
                            <td>Umumy Baha </td>
                            <td>{maglumat && maglumat.sum} </td>
                            </tr>
                            <tr className="modalLi" key="toleg">
                            <td>Töleg görnüşi</td>
                            <td>{maglumat && maglumat.sum && "Nagt töleg"}{!maglumat && maglumat.sum && "Kart bilen töleg"} </td>
                            </tr>
                            {maglumat && maglumat.OrderedProducts && maglumat.OrderedProducts.map((product,i)=>{
                                    return <React.Fragment>
                                     <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt No</td>
                                    <td>{product.ProductId} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt Sany</td>
                                    <td>{product.amount} </td>
                                    </tr>
                                    </React.Fragment>
                            })}
                        </table>}
                </Drawer>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} order={[emaglumat,setEmaglumat]} getOrders={getOrders}/>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;