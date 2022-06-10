import React,{useContext, useEffect, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Space,message,Table,Select,Drawer,Popconfirm,Input,Modal} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled, LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';

import ProductEdit from './ProductEdit';
import ProductSkidga from "./skidga"
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';
const Option = {Select};
const LukmanTable = props=>{

  const { dil } = useContext(SebedimContext);
  const [width,height] = useSizeComponents();
    const [data,setData]=props.data;
    const getProducts = props.getProducts;

    const [openPro,setOpenPro] = useState(false);
    const [pro,setPro] = useState();
    
    const [brands,setBrands] = props?.brands;
    const [brandId,setBrandId] = useState();
    const [kategoriyalar,setKategoriyalar] = useState([]);
    const [ kategoriya_id, setKategoriya_id] = useState();
    const [ subKategoriya, setSubKategoriya ] = useState([]);
    const [ subKategoriya_id, setSubKategoriya_id] = useState();
    const [units,setUnits] = useState([]);
    const [unit_id, setUnit_id]=useState();

    const [edit,setEdit]=useState(false);
    const [skidka,setSkidka]=useState(false);

    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);


    const [editProId,setEditProId] = useState();
    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [name_en,setName_en] = useState();
    const [price,setPrice] = useState();
    const [gelenBaha,setGelenBaha] = useState();
    const [product_code,setProduct_code] = useState();
    const [sale_price,setSale_price] = useState();
    const [step,setStep] = useState();
    const [article_tm,setArticle_tm] = useState();
    const [article_ru,setArticle_ru] = useState();
    const [article_en,setArticle_en] = useState();
    const [description_tm,setDescription_tm] = useState();
    const [description_ru,setDescription_ru] = useState();
    const [description_en,setDescription_en] = useState();
    const [sale_until,setSale_until] = useState();
    const [total_amount,setTotal_amount] = useState();
    const [is_valyuta,setIs_valyuta] = useState();
    const [is_new,setIs_new] = useState();
    const [search,setSearch] = useState();
    const [surat,setSurat] = useState(null);
    const [surat1,setSurat1] = useState(null);
    const [surat2,setSurat2] = useState(null);
    const [surat3,setSurat3] = useState(null);
    const [loading, setLoading] = useState(false);

    const [productId,setProductId] = useState();
    const [renkRazmer,setRenkRazmer]  = useState(false);
    const [razmerler,setRazmerler] = useState([]);
    const [renkler,setRenkler] = useState([]);
    const [name_tm2,setName_tm2] = useState();
    const [name_ru2,setName_ru2] = useState();
    const [name_en2,setName_en2] = useState();
    const [name_en1,setName_en1] = useState();
    const [name_tm1,setName_tm1] = useState();
    const [name_ru1,setName_ru1] = useState();


    useEffect(()=>{
      getUnits()
    },[])

    const getMarketKategories = (id)=>{
      axiosInstance.get("/api/market/kategoriya/"+id,{
          params:{
              active:true
          }
      }).then((data)=>{
          setKategoriyalar(data.data);
      })
    }


   // updating product
   const EditProduct = async()=>{
    setLoading(true);
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });
        let data = {};
              data = {
              name_tm:name_tm,
              name_ru:name_ru,
              name_en:name_en,
              product_code:product_code,
              gelenBaha:gelenBaha,
              price:price,
              sale_price:sale_price,
              sale_until:sale_until,
              step:step,
              article_en:article_en,
              article_ru:article_ru,
              article_tm:article_tm,
              description_en:description_en,
              description_ru:description_ru,
              description_tm:description_tm,
              // is_sale:false,
              // is_active:true,
              total_amount:total_amount,
              // view_count:0,
              is_valyuta_price:is_valyuta,
              is_new:is_new,
              search:search,
              MarketKategoriyaId:kategoriya_id,
              MarketSubKategoriyaId:subKategoriya_id,
              UnitId:unit_id,
              BrandId:brandId
              
             }
            
            if(surat != null){
              data.img_name=surat.name;
              data.img=await toBase64(surat);
            }
            if(surat1 != null){
                data.img_name1=surat1.name;
                data.img1=await toBase64(surat1);
              }
            if(surat2 != null){
            data.img_name2=surat2.name;
            data.img2=await toBase64(surat2);
            }
            if(surat3 != null){
                data.img_name3=surat3.name;
                data.img3=await toBase64(surat3);
                }
  console.log("product id:",editProId,data)

 await   axiosInstance.patch("/api/product/update/"+editProId,{data}).then((data)=>{
      console.log(data.data);
      getProducts();
      message.success(data.data.msg);
      setName_tm();
      setName_ru();
      setName_en();
      setPrice();
      setSale_price();
      setStep();
      setArticle_tm();
      setArticle_ru();
      setArticle_en();
      setDescription_tm();
      setDescription_ru();
      setDescription_en();
      setSale_until();
      setTotal_amount();
      setIs_valyuta();
      setSearch();
      setLoading(false);
      
    }).catch((err)=>{
      console.log(err);
      setLoading(false);  
      message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
        
    })
}


const ChangeCheckbox = (value)=>{
    console.log("value",value)
    setIs_valyuta(value);
  }
const ChangeCheckboxTaze = (value)=>{
    console.log("value",value)
    setIs_new(value);
  }



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
               { record.is_active && <p style={{color:"green"}}> {dil==="TM"?"Hawa":"Да"} </p>}
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
                    <Button style={{marginRight:"15px"}} type='primary'shape='round'onClick={()=>ShowSkidka(record)} >{dil==="TM"?"Skidka":"Скидка"}</Button>
                    {/* <Button type='primary'shape='round'onClick={()=>NewProduct(record)} >Täze</Button> */}
                    <Button style={{marginBottom:"5px"}} type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <br></br>
                    <Popconfirm
                        title={dil==="TM"?"Siz çyndan Gizlemek isleýärsinizmi?":"Вы действительно хотите спрятаться?"}
                        onConfirm={()=>Active(record)} 
                        // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                    >
                    <Button type='primary' danger shape='round' >{dil==="TM"?"Gizle":"Скрывать"}</Button>
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
                <Button style={{marginBottom:"3px",width:"90px"}} type='primary'shape='round'onClick={()=>MoreInformation(record)}><InfoCircleOutlined/></Button>
                <Button style={{marginBottom:"3px",width:"90px"}} type='primary'shape='round'onClick={()=>ShowSkidka(record)} >{dil==="TM"?"Skidka":"Скидка"}</Button>
                <br></br>
                {/* <Button type='primary'shape='round'onClick={()=>NewProduct(record)} >Täze</Button> */}
                <Button style={{marginBottom:"3px",width:"90px"}} type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                <Popconfirm
                        title={dil==="TM"?"Siz çyndan Gizlemek isleýärsinizmi?":"Вы действительно хотите спрятаться?"}
                    onConfirm={()=>Active(record)} 
                    // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                >
                <Button style={{marginBottom:"3px",width:"90px"}} type='primary' danger shape='round' >{dil==="TM"?"Gizle":"Скрывать"}</Button>
                </Popconfirm>
                <Popconfirm
                    title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                    onConfirm={()=>DeleteUser(record)} 
                    // onCancel={cancel}
                        okText={dil==="TM"?"Hawa":"Да"}
                        cancelText={dil==="TM"?"Ýok":"Нет"}
                >
                    <Button style={{width:"90px"}} type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
           
                </Popconfirm>
            </div>
          ),
    }
    ]

   
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
        setMaglumat([]);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    getMarketKategories(event?.MarketId)
    setProductId(event?.id);
    getRazmerler2(event?.id);
    getRenkler2(event?.id)
    setEdit(!edit);
    console.log("maglumat edit",event);
    // setMaglumat([]);
    // await setMaglumat(event);
    if(event){
          setEditProId(event.id);
          setName_tm(event.name_tm);
          setName_ru(event.name_ru);
          setName_en(event.name_en);
          setGelenBaha(event.gelenBaha)
          setPrice(event.price);
          setSale_price(event.sale_price);
          setStep(event.step);
          setArticle_tm(event.article_tm);
          setArticle_ru(event.article_ru);
          setArticle_en(event.article_en);
          setDescription_tm(event.description_tm);
          setDescription_ru(event.description_ru);
          setDescription_en(event.description_en);
          setSale_until(event.sale_until);
          setTotal_amount(event.total_amount);
          setIs_valyuta(event.is_valyuta);
          setSearch(event.search);
    }
}
const ShowSkidka = async(event)=>{
    setSkidka(!skidka);
    console.log("maglumat edit",event);
    setMaglumat([]);
    await setMaglumat(event);
}

const NewProduct = async(event)=>{
    axiosInstance.patch("")
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


const getRazmerler2 = (id)=>{
    axiosInstance.get("/api/razmerler/"+id)
    .then((data)=>{
      setRazmerler(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

const getRazmerler = ()=>{
    axiosInstance.get("/api/razmerler/"+productId)
    .then((data)=>{
      setRazmerler(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const CreateRazmer = ()=>{
      setLoading(true)
      axiosInstance.post("/api/razmerler/create/"+productId,{
          name_tm:name_tm1,
          name_ru:name_ru1,
          name_en:name_en1
      }).then((data)=>{
        message.success("successfully!");
        setName_en1("");
        setName_ru1("");
        setName_tm1("");
        getRazmerler();
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      })
  }

  const DeleteRazmer = (id)=>{
    setLoading(true)
    axiosInstance.delete("/api/razmerler/delete/"+id).then((data)=>{
      getRazmerler()
      setLoading(false);
      message.success("Deleted!")
    }).catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }

  const getRenkler2 = (id)=>{
    axiosInstance.get("/api/renkler/"+id)
    .then((data)=>{
      setRenkler(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const getRenkler = ()=>{
    axiosInstance.get("/api/renkler/"+productId)
    .then((data)=>{
      setRenkler(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const CreateRenk = ()=>{
    setLoading(true)
     axiosInstance.post("/api/renkler/create/"+productId,{
        name_en:name_en2,
        name_ru:name_ru2,
        name_tm:name_tm2
     }).then((data)=>{
      setLoading(false)
      getRenkler();
      setName_en2("");
      setName_ru2("");
      setName_tm2("");
     }).catch((err)=>{
      setLoading(false)
       console.log(err);
     })
  }

  const DeleteRenk = (id)=>{
    setLoading(true)
    axiosInstance.delete("/api/renkler/delete/"+id).then((data)=>{
      getRenkler()
      setLoading(false);
      message.success("Deleted!")
    }).catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }

  const onChangeBaha = (value)=>{
    let baha = (gelenBaha*value)/100;
    setPrice(parseInt(gelenBaha)+baha);
  }

  const onChangeB = (value)=>{
    setBrandId(value);
  }

  const onChangeK = (value)=> {
    console.log(`selected ${value}`);
    setKategoriya_id(value);
    setSubKategoriya_id(null)
    getSubKategoriyas(value);
  }

  const getSubKategoriyas = (e)=>{
    axiosInstance.get("/api/market/subKategoriya/"+e,{
      active:true
    }).then((data)=>{
      console.log(data.data);
      setSubKategoriya(data.data);
    }).catch((err)=>{
      console.log(err);
    });
  }

  const onChangeSubK = (value)=> {
    console.log(`selected ${value}`);
    setSubKategoriya_id(value);
  }

  const getUnits = ()=>{
    axiosInstance.get("/api/units",{
      params:{
        active:true
      }
    }).then((data)=>{
        setUnits(data.data);
    }).catch((err)=>{
        console.log(err);
    })
} 

  const onChangeU = (value)=> {
    console.log(`selected ${value}`);
    setUnit_id(value);
  }
  
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
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt Code":"Код продукта"} </td>
                    <td>{maglumat?.product_code} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Ady tm":"Название tm"}</td>
                    <td>{maglumat &&  maglumat.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_ru}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Ady ru":"Название ru"} </td>
                    <td>{maglumat &&  maglumat.name_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_en}>
                    <td style={{height:"40px"}}> {dil==="TM"?"Ady en":"Название en"} </td>
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
                    <td>{maglumat &&  maglumat.is_sale===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && (maglumat.is_valyuta_price)}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Is_Valyuta_Price":"это обмен валюты"} </td>
                    <td>{maglumat &&  maglumat.is_valyuta_price===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && (maglumat.is_new)}>
                    <td style={{height:"40px"}}>{dil === "TM"?"Tazemi":"Новый?"}  </td>
                    <td>{maglumat &&  maglumat.is_new===true?"Howwa":"Yok"}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.gelenBaha}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Gelen Bahasy":"Доход Цена"}</td>
                    <td>{maglumat &&  maglumat.gelenBaha}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.price}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Baha":"цена"}</td>
                    <td>{maglumat &&  maglumat.price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_price}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Satyş Baha":"Продажная цена"} </td>
                    <td>{maglumat &&  maglumat.sale_price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_until}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Hachana chenli skidka":"Сколько стоит скидка?"} </td>
                    <td>{maglumat &&  maglumat.sale_until}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.search}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Gözleg üçin söz":"Cлово для поиска"} </td>
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
                    <td>{maglumat && maglumat.Brand &&(dil==="TM"? maglumat.Brand.name_tm:maglumat.Brand.name_ru)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm+"saassdf"}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Brand surat":"картинка бренда"}</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.Brand.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>
                    {maglumat && maglumat.surat &&<tr onClick={()=>{setOpenPro(true);setPro(maglumat.surat)}} className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat1":"картинка продукта 1"}</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat1 &&<tr onClick={()=>{setOpenPro(true);setPro(maglumat.surat1)}} className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat2":"картинка продукта 2"}</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat1} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat2 &&<tr onClick={()=>{setOpenPro(true);setPro(maglumat.surat2)}} className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat3":"картинка продукта 3"}</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat2} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
                    {maglumat && maglumat.surat3 &&<tr onClick={()=>{setOpenPro(true);setPro(maglumat.surat3)}} className="modalLi" key={maglumat && maglumat.Brand && maglumat.Brand.name_tm}>
                    <td style={{height:"40px"}}>{dil==="TM"?"Haryt surat4":"картинка продукта 4"}</td>
                    <td>{maglumat && maglumat.Brand && <img style={{height:"150px",objectFit:"contain"}} src={BASE_URL +"/"+ maglumat.surat3} alt={maglumat && maglumat.Brand && maglumat.Brand.name_tm} />} </td>
                    </tr>}
            
            
            
          </table>
}
                </Drawer>
                <Modal
                    visible={openPro}
                    onCancel={()=>setOpenPro(false)}
                    onOk={()=>setOpenPro(false)}
                >
                    
                    <img src={BASE_URL+"/"+`${ pro }`} style={{width:"100%",objectFit:"contain"}} alt="Haryt Surat"/>
                </Modal>
                <Drawer
                width={width>850?600:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Üýtgetmeler":"Изменения"}
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    {/* <ProductEdit getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  /> */}
                    {!loading ? <form className='suruji-yagdayy--form' >
                    <Button style={{width:"95%"}} onClick={()=>setRenkRazmer(true)}  shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Renk we Razmer Üýget":"Цвет и размер"} </Button>

                      <Select
                        className='suruji-yagdayy--input' 
                        placeholder={dil==="TM"?"Brand Saýla!":"Выбор бренда!"}
                        onChange={onChangeB}
                        showSearch
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          brands?.map((brand)=>{
                            return <Option key={brand.id+"brand"} value={`${brand.id}`}>{dil==="TM"?brand.name_tm:brand.name_ru}</Option>
                          })
                        }
                      </Select>

                      <Select
                        className='suruji-yagdayy--input'
                        placeholder={dil==="TM"?"Unit Saýla":"Выберите тип продажи"}
                        onChange={onChangeU}
                      >
                        {
                          units.map((unit)=>{
                            return <Option key={unit.id+"unit"} value={unit.id}>{dil==="TM"?unit.name_tm:unit.name_ru}</Option>
                          })
                        }
                      </Select>

                      <Select
                          className='suruji-yagdayy--input'
                            placeholder={dil==="TM"?"Market Kategoriýa Saýla!":"Выберите категорию маркет!"}
                            onChange={onChangeK}
                          >
                            {
                              kategoriyalar?.map((kategor)=>{
                                return <Option key={kategor.id+"kategor"} value={kategor.id}>{dil==="TM"?kategor.name_tm:kategor.name_ru}</Option>
                              })
                            }
                          </Select>
                          <Select
                            className='suruji-yagdayy--input'
                            placeholder={dil==="TM"?"Market SubKategoriýa Saýla!":"Выберите подкатегория маркет!"}
                              onChange={onChangeSubK}
                            >
                              {
                                subKategoriya.map((kategor)=>{
                                  return <Option key={kategor.id+"subkategor"} value={kategor.id}>{dil==="TM"?kategor.name_tm:kategor.name_ru}</Option>
                                })
                              }
                            </Select>
                        <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore={dil==="TM"?'ady tm':"имя тм" } className='suruji-yagdayy--input' />
                        <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore={dil==="TM"?'ady ru':"имя ru" }  className='suruji-yagdayy--input' />                
                        <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore={dil==="TM"?'ady en':"имя en" }  className='suruji-yagdayy--input' />
                        <Input value={product_code} onChange={(e)=>{setProduct_code(e.target.value)}} addonBefore={dil==="TM"?'product code':"код продукта" }  className='suruji-yagdayy--input' />
                        <Input value={gelenBaha} onChange={(e)=>{setGelenBaha(e.target.value)}} addonBefore={dil==="TM"?'gelen baha':"входящая цена" }  className='suruji-yagdayy--input' />
                        <Select
                          className='suruji-yagdayy--input'
                          // style={{ width: 200 }}
                          placeholder={dil==="TM"?"Satysh Baha %":"Продажная цена %"}
                          onChange={onChangeBaha}
                        >
                          <Option value="5">5%</Option>
                          <Option value="10">10%</Option>
                          <Option value="15">15%</Option>
                          <Option value="20">20%</Option>
                          <Option value="25">25%</Option>
                          <Option value="30">30%</Option>
                        </Select>
                        <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore={dil==="TM"?'baha':"цена" } className='suruji-yagdayy--input' />
                        <Input value={total_amount} onChange={(e)=>{setTotal_amount(e.target.value)}} addonBefore={dil==="TM"?'Ambardaky Sany':"Запас в склад" }  className='suruji-yagdayy--input' />
                        {/* <Input value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore={dil==="TM"?"Satysh Baha ":"Продажная цена "}  className='suruji-yagdayy--input' /> */}
                        {/* <Input value={step} onChange={(e)=>{setStep(e.target.value)}} addonBefore='Step'  className='suruji-yagdayy--input' />
                        <Input value={article_tm} onChange={(e)=>{setArticle_tm(e.target.value)}} addonBefore='Article tm'  className='suruji-yagdayy--input' />
                        <Input value={article_ru} onChange={(e)=>{setArticle_ru(e.target.value)}} addonBefore='Article ru'  className='suruji-yagdayy--input' />
                        <Input value={article_en} onChange={(e)=>{setArticle_en(e.target.value)}} addonBefore='Article en'  className='suruji-yagdayy--input' /> */}
                        <Input style={{width:"94%"}} value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore={dil==="TM"?'Description tm':"Описание тм"}  className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore={dil==="TM"?'Description ru':"Описание ru"}  className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} value={description_en} onChange={(e)=>{setDescription_en(e.target.value)}} addonBefore={dil==="TM"?'Description en':"Описание en"}  className='suruji-yagdayy--input' />
                        {/* <Input  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore='Sale until'  className='suruji-yagdayy--input' /> */}
                        {/* <Input  onChange={()=>ChangeCheckbox()} type="checkbox" addonBefore='Valýutamy'  className='suruji-yagdayy--input' /> */}
                        <Select
                            className='suruji-yagdayy--input'
                            placeholder={dil==="TM"?"Haryt Walyuta görämi?":"Товар в валюте?"}
                            optionFilterProp="children"
                            onChange={ChangeCheckbox}
                            >
                            <Option key="howwawalyuta" value="true">{dil==="TM"?"Hawa":"Да"}</Option>
                            <Option key="yokwalyuta" value="false">{dil==="TM"?"Yok":"Нет"}</Option>
                        </Select>
                        <Select
                            className='suruji-yagdayy--input'
                            placeholder={dil==="TM"?"Haryt Täzemi?":"Новый продукт?"}
                            optionFilterProp="children"
                            onChange={ChangeCheckboxTaze}
                            >
                            <Option key="howwataze" value="true">{dil==="TM"?"Hawa":"Да"}</Option>
                            <Option key="yoktaze" value="false">{dil==="TM"?"Yok":"Нет"}</Option>
                        </Select>
                        <Input style={{width:"94%"}} value={search} onChange={(e)=>{setSearch(e.target.value)}} addonBefore={dil==="TM"?'Gözleg söz':"Поисковое слово"}  className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} onChange={(e)=>{setSurat(e.target.files[0])}} type="file" addonBefore={dil==="TM"?'Haryt Surat 1':"Фото продукта 1"}  className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} onChange={(e)=>{setSurat1(e.target.files[0])}} type="file" addonBefore={dil==="TM"?'Haryt Surat 2':"Фото продукта 2"}   className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} onChange={(e)=>{setSurat2(e.target.files[0])}} type="file" addonBefore={dil==="TM"?'Haryt Surat 3':"Фото продукта 3"}   className='suruji-yagdayy--input' />
                        <Input style={{width:"94%"}} onChange={(e)=>{setSurat3(e.target.files[0])}} type="file" addonBefore={dil==="TM"?'Haryt Surat 4':"Фото продукта 4"}  className='suruji-yagdayy--input' />
                        
                                <div style={{width:"100%"}}>
                                <Button style={{width:"40%"}} onClick={EditProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> {dil==="TM"?"Üýget":"Редактировать"} </Button>
                                <Button style={{width:"40%"}} onClick={()=>ShowDrawer()} shape='round' danger type='primary' className='suruji-yagdayy--button'> {dil==="TM"?"Goýbolsun":"Отмена"} </Button>
                                </div>
                            </form>
                            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
                        }
                </Drawer>

                <Drawer
                width={width>850?600:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"Renkler we Razmerler":"Цвет и размер"}
                placement="right"
                onClose={()=>setRenkRazmer(false)}
                visible={renkRazmer}>
                     <div
                        className='suruji-yagdayy'>
                        {!loading ? <form className='suruji-yagdayy--form' >
                            <h2 style={{width:"100%",marginTop:"-15px",marginBottom:"0px"}}>{dil==="TM"?"Razmerler":"Pазмер"}</h2>
                            <Input value={name_tm1} onChange={(e)=>{setName_tm1(e.target.value)}} addonBefore={dil==="TM"?'ady tm':"имя тм" }  className='suruji-yagdayy--input' />
                            <Input value={name_ru1} onChange={(e)=>{setName_ru1(e.target.value)}} addonBefore={dil==="TM"?'ady ru':"имя ru" } className='suruji-yagdayy--input' />                
                            <Input value={name_en1} onChange={(e)=>{setName_en1(e.target.value)}} addonBefore={dil==="TM"?'ady en':"имя en" }  className='suruji-yagdayy--input' />
                            <Button style={{width:"46%"}} onClick={CreateRazmer} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Razmer Gosh":"Добавить размер"}</Button>

                            {/* <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly"}}>
                            <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                            </div> */}
                            <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly",margin:"10px auto 20px",borderBottom:"2px solid black",padding:"10px",borderRadius:"3px"}}>
                                {razmerler?.map((razmer)=>{
                                    return <Popconfirm
                                    title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                                    onConfirm={()=>DeleteRazmer(razmer.id)} 
                                    // onCancel={cancel}
                                    okText={dil==="TM"?"Hawa":"Да"}
                                    cancelText={dil==="TM"?"Ýok":"Нет"}
                                >
                                <div style={{border:"1px solid grey",borderRadius:"6px",padding:"5px 8px",fontWeight:"bold",cursor:"pointer"}}>{dil==="TM"?razmer.name_tm:razmer.name_ru}</div>

                                </Popconfirm>
                                })}
                            </div>

                        
                            <h2 style={{width:"100%",marginTop:"-5px",marginBottom:"0px"}}>{dil==="TM"?"Renkler":"Renkler"}</h2>

                            <Input value={name_tm2} onChange={(e)=>{setName_tm2(e.target.value)}} addonBefore={dil==="TM"?'ady tm':"имя тм" }  className='suruji-yagdayy--input' />
                            <Input value={name_ru2} onChange={(e)=>{setName_ru2(e.target.value)}} addonBefore={dil==="TM"?'ady ru':"имя ru" }  className='suruji-yagdayy--input' />                
                            <Input value={name_en2} onChange={(e)=>{setName_en2(e.target.value)}} addonBefore={dil==="TM"?'ady en':"имя en" }  className='suruji-yagdayy--input' />
                            <Button style={{width:"46%"}} onClick={CreateRenk} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Renk Gosh":"Добавить цвет"}</Button>

                            {/* <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly"}}>
                            <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                            </div> */}

                            <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly",margin:"10px auto 20px",borderBottom:"2px solid black",padding:"10px",borderRadius:"2px"}}>
                                {renkler?.map((renk)=>{
                                    return <Popconfirm
                                    title={dil==="TM"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                                    onConfirm={()=>DeleteRenk(renk.id)} 
                                    // onCancel={cancel}
                                    okText={dil==="TM"?"Hawa":"Да"}
                                    cancelText={dil==="TM"?"Ýok":"Нет"}
                                >
                                <div style={{border:"1px solid grey",borderRadius:"6px",padding:"5px 8px",fontWeight:"bold",cursor:"pointer"}}>{renk.name_tm}</div>

                                </Popconfirm>
                                })}
                            </div>

                        </form>
                        :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
                        }
                        <Button style={{width:"95%"}} onClick={()=>{setRenkRazmer(false);}} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil==="TM"?"Cancel":"Отмена"}</Button>

                    </div>
        
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