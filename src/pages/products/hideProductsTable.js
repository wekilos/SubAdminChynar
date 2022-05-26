import React,{useContext, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Space,message,Table,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined ,InfoCircleOutlined} from '@ant-design/icons';

import ProductEdit from './ProductEdit';
import ProductSkidga from "./skidga"
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';

const LukmanTable = props=>{

    const { dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents();
    const [data,setData]=props.data;
    const getProducts = props.getProducts;
    const columns = width>850? [
        {
            title:dil==="TM"?"Haryt No":"Продукт No",
            dataIndex:"id"
        },
        {
            title:dil==="TM"?"Haryt Surat":"Фото продукта",
            dataIndex:"surat",
            render:(text,record)=>(
                <div>
                    <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Haryt Surat"/>
                </div>
            )
        },
        {
            title:dil==="TM"?"Haryt Ady":"Название продукта",
            dataIndex:"name_tm",
        },
        // {
        //     title:"Article",
        //     dataIndex:"article_tm"
        // },
        {
            title:dil==="TM"?"Description":"Описание",
            dataIndex:"description_tm"
        },
        {
            title:dil==="TM"?"Baha":"цена",
            dataIndex:"price"
        },
        {
            title:dil==="TM"?"Satyş Baha":"Продажная цена",
            dataIndex:"sale_price"
        },
        {
            title:dil==="TM"?"Satylyşy":"Продажи",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_active && <p style={{color:"green"}}>{dil==="TM"?"Hawa":"Да"}</p>}
               { !record.is_active && <p style={{color:"red"}}>{dil==="TM"?'Ýok':"Нет"}</p>}
               </div>
            )
        },
        {
            title:dil==="TM"?"Skidka ":"Скидка",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_sale && <p style={{color:"green"}}>{dil==="TM"?"Hawa":"Да"} </p>}
               { !record.is_sale && <p style={{color:"red"}}>{dil==="TM"?'Ýok':"Нет"}</p>}
               </div>
            )
        },
        {
            title:dil==="TM"?"Goshmacha we Özgertmek":"Дополнение и модификация",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <div size="middle">
                    <Button style={{marginBottom:"5px"}} type='primary'shape='round'onClick={()=>MoreInformation(record)}>{dil==="TM"?"Goşmaça":"Дополнительная"}</Button>
                    <br></br>
                    <Button style={{marginRight:"10px"}} type='primary'shape='round'onClick={()=>ShowSkidka(record)} >{dil==="TM"?"Skidka":"Скидка"}</Button>
                    <Button style={{marginBottom:"5px"}} type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <br></br>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan Gorkezmek isleýärsinizmi?":"Вы действительно хотите Покажите?"}
                        onConfirm={()=>Active(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                     <Button type='primary' danger shape='round' >{dil==="TM"?"Görkez":"Покажите"}</Button>
                    </Popconfirm>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </div>
              ),
        }
    ]
    :[
        {
            title:dil==="TM"?"Haryt Surat":"Фото продукта",
            dataIndex:"surat",
            render:(text,record)=>(
                <div style={{width:"50px"}}>
                    <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Haryt Surat"/>
                </div>
            )
        },
        {
            title:dil==="TM"?"Haryt Ady":"Название продукта",
            dataIndex:"name_tm",
        },
        {
            title:dil==="TM"?"Goshmacha we Özgertmek":"Дополнение и модификация",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <div >
                    <Button style={{marginBottom:"3px",width:"90px"}}  type='primary'shape='round'onClick={()=>MoreInformation(record)}><InfoCircleOutlined/></Button>
                    <Button style={{marginBottom:"3px",width:"90px"}}  type='primary'shape='round'onClick={()=>ShowSkidka(record)} >{dil==="TM"?"Skidka":"Скидка"}</Button>
                    <Button style={{marginBottom:"3px",width:"90px"}}  type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan Gorkezmek isleýärsinizmi?":"Вы действительно хотите Покажите?"}
                        onConfirm={()=>Active(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                     <Button style={{marginBottom:"3px",width:"90px"}}  type='primary' danger shape='round' >{dil==="TM"?"Görkez":"Покажите"}</Button>
                    </Popconfirm>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                        <Button style={{marginBottom:"3px",width:"90px"}}  type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                </div>
              ),
        }
    ]

    const [edit,setEdit]=useState(false);
    const [skidka,setSkidka]=useState(false);
    const [loading, setLoading] = useState(false);

    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/product/delete/"+event.id).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getProducts()
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
const ShowSkidka = async(event)=>{
    setSkidka(!skidka);
    console.log("maglumat edit",event);
    await setMaglumat(event);
}

const Active = (event)=>{
    console.log(event);
    let is_active = !event.is_active;
    axiosInstance.patch("/api/product/isActive/"+event.id,{
        is_active:is_active,
    }).then((data)=>{
        message.success(data.data.msg);
        getProducts();
    }).catch((err)=>{
        console.log(err);
    })
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
};


    return(
        <div className='LukmanTable'>
                <Drawer
                width={width>850?600:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Goşmça Maglumat":"Дополнительная информация"}
                placement="right"
                onClose={()=>MoreInformation()}
                visible={showInfo}>
                    { maglumat &&
                    <table style={{width:"100%"}} border="1" className="goshmacha--ul">
                    <tr className="modalLi" key={maglumat && maglumat.id}>
                    <td style={{height:"40px"}}>ID </td>
                    <td>{maglumat && maglumat.id} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat?.product_code}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt Code":"Код продукта"}</td>
                    <td>{maglumat?.product_code} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Ady tm":"Название tm"} </td>
                    <td>{maglumat &&  maglumat.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_ru}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Ady ru":"Название ru"} </td>
                    <td>{maglumat &&  maglumat.name_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_en}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Ady en":"Название en"} </td>
                    <td>{maglumat &&  maglumat.name_en}</td>
                    </tr>
                    {/* <tr className="modalLi" key={maglumat && maglumat.article_tm}>
                    <td style={{height:"40px"}}>Article tm </td>
                    <td>{maglumat &&  maglumat.article_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.article_ru}>
                    <td style={{height:"40px"}}>Article ru </td>
                    <td>{maglumat &&  maglumat.article_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.article_en}>
                    <td style={{height:"40px"}}>Article en </td>
                    <td>{maglumat &&  maglumat.article_en}</td>
                    </tr> */}
                    <tr className="modalLi" key={maglumat && maglumat.description_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Description":"Описание"} tm </td>
                    <td>{maglumat &&  maglumat.description_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_ru}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Description":"Описание"} ru </td>
                    <td>{maglumat &&  maglumat.description_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_en}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Description":"Описание"} en </td>
                    <td>{maglumat &&  maglumat.description_en}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_active)}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Satylyşy":"Продажи"}</td>
                    <td>{maglumat &&  maglumat.is_active===true?"Hawa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_sale)}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Skidka ":"Скидка"} </td>
                    <td>{maglumat &&  maglumat.is_sale===true?"Hawa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_valyuta_price)}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Is_Valyuta_Price":"это обмен валюты"} </td>
                    <td>{maglumat &&  maglumat.is_valyuta_price===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && (maglumat.is_new)}>
                    <td style={{height:"40px"}}>{dil === "TM"?"Tazemi":"Новый?"}  </td>
                    <td>{maglumat &&  maglumat.is_new===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.gelenBaha}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Gelen Bahasy":"Доход Цена"}  </td>
                    <td>{maglumat &&  maglumat.gelenBaha}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.price}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Baha":"цена"}</td>
                    <td>{maglumat &&  maglumat.price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_price}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Satyş Baha":"Продажная цена"}   </td>
                    <td>{maglumat &&  maglumat.sale_price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_until}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Hachana chenli skidka":"Сколько стоит скидка?"} </td>
                    <td>{maglumat &&  maglumat.sale_until}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.search}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Gözleg üçin söz":"Cлово для поиска"}</td>
                    <td>{maglumat &&  maglumat.search}</td>
                    </tr>
                    {/* <tr className="modalLi" key={maglumat && maglumat.step}>
                    <td style={{height:"40px"}}>Step </td>
                    <td>{maglumat &&  maglumat.step}</td>
                    </tr> */}
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td style={{height:"40px"}}>{dil==="TM"?'Ambardaky Sany':"Запас в склад"}</td>
                    <td>{maglumat &&  maglumat.total_amount}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Görenleriň sany":"Количество просмотров"}</td>
                    <td>{maglumat &&  maglumat.view_count}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Market && maglumat.Market.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Market":"Mаркет"} </td>
                    <td>{maglumat && maglumat.Market && maglumat.Market.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Market Kategoriýa":"Категория маркет"}</td>
                    <td>{maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm+"dfgh"}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Market SubKategoriýa":"подкатегория маркет"}</td>
                    <td>{maglumat?.MarketSubKategoriya?.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Unit && maglumat.total_amount}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Unit":"Выберите тип продажи"}</td>
                    <td>{maglumat && maglumat.Unit &&  maglumat.Unit.name_tm}</td>
                    </tr>
                    {/* <tr className="modalLi" key={maglumat && maglumat.Welayatlar && maglumat.Welayatlar.name_tm}>
                    <td style={{height:"40px"}}>Welayat</td>
                    <td>{maglumat && maglumat.Welayatlar && maglumat.Welayatlar.name_tm}</td>
                    </tr> */}
                    <tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Brand":"бренд"}</td>
                    <td>{maglumat && maglumat.Brand && (dil==="TM"? maglumat.Brand.name_tm:maglumat.Brand.name_ru)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Brand surat":"картинка бренда"}  </td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.Brand.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>
                    {maglumat && maglumat.surat &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat1":"картинка продукта 1"}  </td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat1 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat 2":"картинка продукта 2"}  </td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat1} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat2 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat 3":"картинка продукта 3"}  </td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat2} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat3 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat 4":"картинка продукта 4"}  </td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat3} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
            
            
            
            
          </table>
}
                </Drawer>
                <Drawer
                width={width>850?600:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Üýtgetmeler":"Изменения"}
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <ProductEdit getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  />
                </Drawer>
                <Drawer
                width={width>850?600:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Skidka doret":"Сделать скидку"}
                placement="right"
                onClose={()=>ShowSkidka()}
                visible={skidka}>
                    <ProductSkidga getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  />
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;