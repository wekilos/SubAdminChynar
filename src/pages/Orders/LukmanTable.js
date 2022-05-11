import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from '../Orders/UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import PrintComponent from "../../components/PrintComponent"


import { useSizeComponents } from "../../components/sizeComponent";
const LukmanTable = (props)=>{

    
    const [width,height] = useSizeComponents();
    const [data,setData]=props.data;
    const getOrders = props.getOrders;
    const valyuta = props.valyuta;

    const columns = width>850 ? [
        {
            title:"Order No",
            dataIndex:"id"
        },
        
        {
            title:"Umumy baha",
            dataIndex:"sum"
        },
        {
            title:"Umumy Haryt sany",
            dataIndex:"sany"
        },
        {
            title:"Zakaz edilen wagty",
            dataIndex:"order_date_time",
            render:(text,record)=>(
                <div>
                   <p> { record.order_date_time && record.order_date_time.slice(0,10) }</p> 
                   <p>{ record.order_date_time && record.order_date_time.slice(11,19)}</p>
                    
                </div>
            )
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
            title:"Zakaz status",
            render:(text,record)=>(
                <div>
                    {record.Status && record.Status.name_tm} 
                </div>
            )
        },
        {
            title:"Zakaz Salgy",
            render:(text,record)=>(
                
                <div>
                    <h3>{record.Address && record.Address.rec_name}</h3>
                     <p>{record.Address && record.Address.rec_address} {record.Address && record.Address.rec_number}</p>
                     
                 </div>
            )
        },
        {
            title:"Ulanyjy",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                     <p>{record.User && record.User.phoneNumber}</p>
                 </div>
            )
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     <Popconfirm
                        title="Haryt Gowşuryldymy?"
                        onConfirm={()=>Gowshuryldy(record)} 
                        // onCancel={cancel}
                        okText="Hawa"
                        cancelText="Ýok"
                    >
                     <Button type='primary'shape='round' >Gowşuryldy</Button>
                    </Popconfirm>
                     <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Hawa"
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
            title:"Umumy baha",
            dataIndex:"sum"
        },
        {
            title:"Zakaz status",
            render:(text,record)=>(
                <div>
                    {record.Status && record.Status.name_tm} 
                </div>
            )
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <div>
                     <Button style={{marginBottom:"5px",width:"105px"}} type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     <br></br>
                     <Popconfirm
                        title="Haryt Gowşuryldymy?"
                        onConfirm={()=>Gowshuryldy(record)} 
                        // onCancel={cancel}
                        okText="Hawa"
                        cancelText="Ýok"
                    >
                     <Button 
                     style={{marginBottom:"5px",width:"105px"}} type='primary'shape='round' >Gowşuryldy</Button>
                    </Popconfirm><br></br>

                     <Button style={{marginRight:"5px"}} type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Hawa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                    </div>
              ),
        }
    ]

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const [ sum, setSum ] = useState(null);
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
    if(event && event.OrderedProducts){
        let jemi=0;
        event.OrderedProducts.map((data)=>{
            if(data.Product.is_sale){
                if(data.Product.is_valyuta_price){
                    jemi=jemi + data.amount*data.Product.sale_price*valyuta;
                }else{
                    jemi=jemi + data.amount*data.Product.sale_price;
                }
               
            }else{
                if(data.Product.is_valyuta_price){
                    jemi=jemi + data.amount*data.Product.price*valyuta;
                }else{
                    jemi=jemi + data.amount*data.Product.price
                }
            }
        });
        setSum(jemi);
    }
}

const Gowshuryldy = (event)=>{
    axiosInstance.patch("/api/order/deliveri/"+event.id).then((data)=>{
        message.success(data.data.msg);
        getOrders()
    }).catch((err)=>{
        console.log(err);
    })
}




    return(
        <div className='LukmanTable'>
                <Drawer
                    width={width>850?500:320}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                        { maglumat && <table style={{width:"100%"}} border="1" className="goshmacha--ul">
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
                            <td>{sum && sum} </td>
                            </tr>
                            <tr className="modalLi" key="toleg">
                            <td>Töleg görnüşi</td>
                            <td>{maglumat && maglumat.is_cash && "Nagt töleg"}{maglumat && !maglumat.is_cash && "Kart bilen töleg"} </td>
                            </tr>
                            {maglumat && maglumat.OrderedProducts && maglumat.OrderedProducts.map((product,i)=>{
                                    return <React.Fragment>
                                     <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt No</td>
                                    <td>{product.ProductId} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolega${i}`}>
                                    <td>{i+1}) Haryt Ady</td>
                                    <td>{product.Product.name_tm} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegd${i}`}>
                                    <td>{i+1}) Haryt Dushundirish</td>
                                    <td>{product.Product.description_tm} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegpu${i}`}>
                                    <td>{i+1}) Haryt ölçegi</td>
                                    <td>{product.Product.Unit.name_tm} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegp${i}`}>
                                    <td>{i+1}) Haryt baha</td>
                                    <td>{product.Product.is_valyuta_price==true ? (product.Product.price*valyuta).toFixed(2):product.Product.price} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegsp${i}`}>
                                    <td>{i+1}) Haryt skitga baha</td>
                                    <td>{product.Product.is_valyuta_price==true ? (product.Product.sale_price*valyuta).toFixed(2) :product.Product.sale_price} </td>
                                    </tr>
                                    <tr className="modalLi" key={`sany${i}`}>
                                    <td>{i+1}) Haryt Sany</td>
                                    <td>{product.amount} </td>
                                    </tr>
                                    {product.razmer && <tr className="modalLi" key={`sanyr${i}`}>
                                    <td>{i+1}) Haryt Razmer</td>
                                    <td>{product.razmer} </td>
                                    </tr>}
                                    {product.renk && <tr className="modalLi" key={`sanyre${i}`}>
                                    <td>{i+1}) Haryt Renki</td>
                                    <td>{product.renk} </td>
                                    </tr>}
                                    <tr className="modalLi" key={`surat${i}`}>
                                    <td>{i+1}) {product.Product && product.Product.name_tm }</td>
                                    <img src={BASE_URL+"/"+`${product.Product && product.Product.surat }`} style={{width:"50px",height:"50px"}} alt="Haryt Surat"/>
                                    </tr>
                                    <tr className="modalLi" key={`suratM${i}`}>
                                    <td>{i+1}) {product.Product && product.Product.Market && product.Product.Market.name_tm }</td>
                                    <img src={BASE_URL+"/"+`${product.Product && product.Product.Market && product.Product.Market.surat }`} style={{width:"50px",height:"50px"}} alt="Market Surat"/>
                                    </tr>
                                    </React.Fragment>
                            })}
                        </table>}
                        <PrintComponent maglumat={maglumat} sum={sum}  valyuta={valyuta} />
                </Drawer>
                <Drawer
                width={width>850?500:320}
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