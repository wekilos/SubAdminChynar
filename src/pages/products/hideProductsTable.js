import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

import ProductEdit from './ProductEdit';
import ProductSkidga from "./skidga"
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getProducts = props.getProducts;
    const columns = [
        {
            title:"Haryt No",
            dataIndex:"id"
        },
        {
            title:"Haryt Surat",
            dataIndex:"surat",
            render:(text,record)=>(
                <div>
                    <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Haryt Surat"/>
                </div>
            )
        },
        {
            title:"Haryt Ady",
            dataIndex:"name_tm",
        },
        // {
        //     title:"Article",
        //     dataIndex:"article_tm"
        // },
        {
            title:"Description",
            dataIndex:"description_tm"
        },
        {
            title:"Baha",
            dataIndex:"price"
        },
        {
            title:"Satyş Baha",
            dataIndex:"sale_price"
        },
        {
            title:"Satylyşy",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_active && <p style={{color:"green"}}>{JSON.stringify(record.is_active)}</p>}
               { !record.is_active && <p style={{color:"red"}}>{JSON.stringify(record.is_active)}</p>}
               </div>
            )
        },
        {
            title:"Skidka ",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_sale && <p style={{color:"green"}}>{JSON.stringify(record.is_sale)}</p>}
               { !record.is_sale && <p style={{color:"red"}}>{JSON.stringify(record.is_sale)}</p>}
               </div>
            )
        },
        {
            title:"Lukman Gözegçiligi we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>MoreInformation(record)}>Goşmaça</Button>
                    <Button type='primary'shape='round'onClick={()=>ShowSkidka(record)} >Skidka</Button>
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan Active etmek isleýärsinizmi?"
                        onConfirm={()=>Active(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                     <Button type='primary' danger shape='round' >Görkez</Button>
                    </Popconfirm>
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
                width={600}
                className='lukman-table--drawer'
                title="Goşmça Maglumat"
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
                    <td style={{height:"40px"}}>Haryt Code </td>
                    <td>{maglumat?.product_code} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_tm}>
                    <td style={{height:"40px"}}>Ady tm </td>
                    <td>{maglumat &&  maglumat.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_ru}>
                    <td style={{height:"40px"}}>Ady ru </td>
                    <td>{maglumat &&  maglumat.name_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_en}>
                    <td style={{height:"40px"}}>Ady en </td>
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
                    <td style={{height:"40px"}}>Description tm </td>
                    <td>{maglumat &&  maglumat.description_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_ru}>
                    <td style={{height:"40px"}}>Description ru </td>
                    <td>{maglumat &&  maglumat.description_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_en}>
                    <td style={{height:"40px"}}>Description en </td>
                    <td>{maglumat &&  maglumat.description_en}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_active)}>
                    <td style={{height:"40px"}}>Satylyşy</td>
                    <td>{maglumat &&  maglumat.is_active===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_sale)}>
                    <td style={{height:"40px"}}>Skidka </td>
                    <td>{maglumat &&  maglumat.is_sale===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_valyuta_price)}>
                    <td style={{height:"40px"}}>Is_Valyuta_Price </td>
                    <td>{maglumat &&  maglumat.is_valyuta_price===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.gelenBaha}>
                    <td style={{height:"40px"}}>Gelen Bahasy</td>
                    <td>{maglumat &&  maglumat.gelenBaha}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.price}>
                    <td style={{height:"40px"}}>Bahasy</td>
                    <td>{maglumat &&  maglumat.price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_price}>
                    <td style={{height:"40px"}}>Satylyş baha </td>
                    <td>{maglumat &&  maglumat.sale_price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_until}>
                    <td style={{height:"40px"}}>Hachana chenli skidka </td>
                    <td>{maglumat &&  maglumat.sale_until}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.search}>
                    <td style={{height:"40px"}}>Gözleg üçin söz </td>
                    <td>{maglumat &&  maglumat.search}</td>
                    </tr>
                    {/* <tr className="modalLi" key={maglumat && maglumat.step}>
                    <td style={{height:"40px"}}>Step </td>
                    <td>{maglumat &&  maglumat.step}</td>
                    </tr> */}
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td style={{height:"40px"}}>Ambardaky Umumy sany</td>
                    <td>{maglumat &&  maglumat.total_amount}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td style={{height:"40px"}}>Görenleriň sany</td>
                    <td>{maglumat &&  maglumat.view_count}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Market && maglumat.Market.name_tm}>
                    <td style={{height:"40px"}}>Market </td>
                    <td>{maglumat && maglumat.Market && maglumat.Market.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}>
                    <td style={{height:"40px"}}>Market Kategoriýa</td>
                    <td>{maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Unit && maglumat.total_amount}>
                    <td style={{height:"40px"}}>Unit</td>
                    <td>{maglumat && maglumat.Unit &&  maglumat.Unit.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Welayatlar && maglumat.Welayatlar.name_tm}>
                    <td style={{height:"40px"}}>Welayat</td>
                    <td>{maglumat && maglumat.Welayatlar && maglumat.Welayatlar.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Brand</td>
                    <td>{maglumat && maglumat.Brand && maglumat.Brand.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Brand surat</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.Brand.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>
                    {maglumat && maglumat.surat &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Haryt surat1</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat1 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Haryt surat2</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat1} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat2 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Haryt surat3</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat2} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat3 &&<tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>Haryt surat4</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat3} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
            
            
            
            
          </table>
}
                </Drawer>
                <Drawer
                width={600}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <ProductEdit getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  />
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
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