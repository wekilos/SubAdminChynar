import React,{useContext, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import PrintComponent from '../../components/PrintComponent';
import { SebedimContext } from '../../context/Sebedim';

const LukmanTable = props=>{

    const { dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents()
    const [data,setData]=props.data;
    const [openPro,setOpenPro] = useState(false);
    const [pro,setPro] = useState();
    const getOrders = props.getOrders;
    const valyuta = props.valyuta;
    const columns = width>850?[
        {
            title:dil==="TM"?"Order No":"№ заказа.",
            dataIndex:"id"
        },
        
        {
            title:dil==="TM"?"Umumy baha":"Общая цена",
            dataIndex:"sum"
        },
        {
            title:dil==="TM"?"Umumy Haryt sany":"Всего товаров",
            dataIndex:"sany"
        },
        {
            title:dil==="TM"?"Zakaz edilen wagty":"Время заказa",
            dataIndex:"order_date_time",
            render:(text,record)=>(
                <div>
                   <p> { record.order_date_time && record.order_date_time.slice(0,10) }</p> 
                   <p>{ record.order_date_time && record.order_date_time.slice(11,19)}</p>
                    
                </div>
            )
        },
        {
            title:dil==="TM"?"Töleg görnüşi":"Способ оплаты",
            dataIndex:"is_cash",
            render:(text,record)=>(
                <div>
                    {record.is_cash && (dil==="TM"?"Nagt töleg":"Наличный расчет")}
                    {!record.is_cash && (dil==="TM"?"Kart bilen töleg":"Оплата картой")}
                </div>
            )
        },
        
        // {
        //     title:"Zakaz status",
        //     render:(text,record)=>(
        //         <div>
        //             {record.Status && record.Status.name_tm} 
        //         </div>
        //     )
        // },
        {
            title:dil==="TM"?"Zakaz Salgy":"Адрес заказа",
            render:(text,record)=>(
                
                <div>
                    <h3>{record.Address && record.Address.rec_name}</h3>
                     <p>{record.Address && record.Address.rec_address} {record.Address && record.Address.rec_number}</p>
                     
                 </div>
            )
        },
        {
            title:dil==="TM"?"Ulanyjy":"Пользователь",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                     <p>{record.User && record.User.phoneNumber}</p>
                 </div>
            )
        },
        {
            title:dil==="TM"?"Üýygetmek we Özgertmek":"Изменить",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil==="TM"?"Goşmaça":"Дополнительная"}</Button>
                     {/* <Button type='primary'shape='round'onClick={()=>Gowshuryldy(record)} >Gowşuryldy</Button> */}
                     {/* <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button> */}
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ]
    :[
        {
            title:dil==="TM"?"Umumy baha":"Общая цена",
            dataIndex:"sum"
        },
        {
            title:dil==="TM"?"Ulanyjy":"Пользователь",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                     <p>{record.User && record.User.phoneNumber}</p>
                 </div>
            )
        },
        {
            title:dil==="TM"?"Üýygetmek we Özgertmek":"Изменить",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <div >
                     <Button style={{marginBottom:"5px",width:"90px"}} type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil==="TM"?"Goşmaça":"Дополнительная"}</Button>
                    <br></br>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                        <Button style={{width:"90px"}}  type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </div>
              ),
        }
    ]

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const [sum,setSum] = useState(null)
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
        event?.OrderedProducts.map((data)=>{
            if(data?.Product?.is_sale){
                if(data.Product.is_valyuta_price){
                    jemi=jemi + data.amount*data.Product.sale_price*valyuta;
                }else{
                    jemi=jemi + data.amount*data.Product.sale_price;
                }
               
            }else{
                if(data?.Product?.is_valyuta_price){
                    jemi=jemi + data.amount*data.Product.price*valyuta;
                }else{
                    jemi=jemi + data.amount*data?.Product?.price
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
                            <td>{dil==="TM"?"Sany":"Количество"} </td>
                            <td>{maglumat && maglumat.sany} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.sum}>
                            <td>{dil==="TM"?"Umumy Baha":"Общая цена"} </td>
                            <td>{sum && sum} </td>
                            </tr>
                            <tr className="modalLi" key="toleg">
                            <td>{dil==="TM"?"Töleg görnüşi":"Способ оплаты"}</td>
                            <td>{maglumat && maglumat.is_cash &&  (dil==="TM"?"Nagt töleg":"Наличный расчет")}{maglumat && !maglumat.is_cash && (dil==="TM"?"Kart bilen töleg":"Оплата картой")} </td>
                            </tr>
                            {maglumat && maglumat.OrderedProducts && maglumat.OrderedProducts.map((product,i)=>{
                                    return <React.Fragment>
                                     <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt No":"Продукт нo"}</td>
                                    <td>{product.ProductId} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolega${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt Ady":"Название продукта"}</td>
                                    <td>{dil==="TM"?product?.Product?.name_tm:product?.Product?.name_ru} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegd${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt Dushundirish":"Описание товара"}</td>
                                    <td>{dil==="TM"?product?.Product?.description_tm:product?.Product?.description_ru} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegpu${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt ölçegi":"Тип продажи продукта"}</td>
                                    <td>{dil==="TM"?product?.Product?.Unit.name_tm:product?.Product?.Unit.name_ru} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegp${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt baha":"Цена товара"}</td>
                                    <td>{product?.Product?.is_valyuta_price==true ? (product?.Product?.price*valyuta).toFixed(2):product?.Product?.price} </td>
                                    </tr>
                                    <tr className="modalLi" key={`tolegsp${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt skitga baha":"Цена продукта со скидкой"}</td>
                                    <td>{product?.Product?.is_valyuta_price==true ? (product?.Product?.sale_price*valyuta).toFixed(2) :product?.Product?.sale_price} </td>
                                    </tr>
                                    <tr className="modalLi" key={`sany${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt Sany":"количество товаров"}</td>
                                    <td>{product.amount} </td>
                                    </tr>
                                    {product.razmer && <tr className="modalLi" key={`sanyr${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt Razmer":"Размер товара"}</td>
                                    <td>{product.razmer} </td>
                                    </tr>}
                                    {product.renk && <tr className="modalLi" key={`sanyre${i}`}>
                                    <td>{i+1}) {dil==="TM"?"Haryt Renki":"Цвет продукта"}</td>
                                    <td>{product.renk} </td>
                                    </tr>}
                                    <tr onClick={()=>{setOpenPro(true);setPro(product.Product)}} className="modalLi" key={`surat${i}`}>
                                    <td>{i+1}) {product.Product && (dil==="TM"?product.Product.name_tm:product.Product.name_ru) }</td>
                                    <img src={BASE_URL+"/"+`${product.Product && product.Product.surat }`} style={{width:"50px",height:"50px"}} alt="Haryt Surat"/>
                                    </tr>
                                    <tr className="modalLi" key={`suratM${i}`}>
                                    <td>{i+1}) {product.Product && product.Product.Market && product.Product.Market.name_tm }</td>
                                    <img src={BASE_URL+"/"+`${product.Product && product.Product.Market && product.Product.Market.surat }`} style={{width:"50px",height:"50px"}} alt="Market Surat"/>
                                    </tr>
                                    
                                    </React.Fragment>
                            })}
                        </table>}
                        <PrintComponent maglumat={maglumat} sum={sum} valyuta={valyuta}/>
                </Drawer>
                <Modal
                    visible={openPro}
                    onCancel={()=>setOpenPro(false)}
                    onOk={()=>setOpenPro(false)}
                >
                    
                    <img src={BASE_URL+"/"+`${ pro?.surat }`} style={{width:"100%",objectFit:"contain"}} alt="Haryt Surat"/>
                </Modal>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil==="TM"?"Üýtgetmeler":"Изменения"}
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