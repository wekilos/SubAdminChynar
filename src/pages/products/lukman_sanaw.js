import React,{useContext, useEffect, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Input,Drawer,Select, message} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import LukmanSanawTable from './LukmanSanawTable';
import { SebedimContext } from '../../context/Sebedim';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option}=Select;


const Lukman = () =>{

    const { dil } = useContext(SebedimContext)
    const [width,height] = useSizeComponents();
    const [ markets,setMarkets] = useState([]);
    const [ kategoriyalar,setKategoriyalar] = useState([]);
    const [ subKategoriyalar, setSubKategoriyalar] = useState([]);
    const [ products, setProducts] = useState([]);

    const [all,setAll] = useState();
    let market_Id = localStorage.getItem("SubMarketId");
    const [market_id,setMarket_id] = useState(market_Id);
    const [kategoriya_id, setKategoriya_id] = useState(null);
    const [subKategoriya_id, setSubKategoriya_id] = useState(null);
    const [is_sale, setIs_sale] = useState(null); 
    const [welayatlar,setWelayatlar] = useState([]);
    const [welayatId,setWelayatId] = useState(null);
    const [brands,setBrands] = useState();
    const [pageNo,setPageNo] = useState(0);
    const [code, setCode] = useState(null);

    useEffect(()=>{
        getMarkets();
        getProducts();
        getWelayatlar();
        getBrands();
        getKategoriyas();
    },[])

    useEffect(()=>{
        const time = setTimeout(() => {
            getProducts();
          }, 500);
        return ()=> clearTimeout(time);
    },[all,market_id,kategoriya_id,is_sale,welayatId,code])

    const getProducts = ()=>{
        axiosInstance.get("/api/products",{
            params:{
                code:code,
                // limit:pageNo===0?15:(pageNo)*15+15,
                limit:999,
                all:all,
                market_id:market_Id, 
                kategoriya_id:kategoriya_id,
                is_sale:is_sale,
                welayatId:welayatId,
            }
        }).then((data)=>{
                console.log("products",data.data);
                setProducts(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getProductsPerPage()
    },[pageNo])
    const getProductsPerPage = ()=>{
        axiosInstance.get("/api/products",{
            params:{
                page:pageNo,
                limit:999,
                all:all,
                market_id:market_Id, 
                kategoriya_id:kategoriya_id,
                is_sale:is_sale,
                welayatId:welayatId,
            }
        }).then((data)=>{
                console.log("products",data.data);
                let array = products;
                data.data?.map((pro)=>{
                    array.push(pro);
                })
                setProducts([...array]);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getWelayatlar = () =>{
        axiosInstance.get("/api/welayatlar",{
            params:{active:true}
        }).then((data)=>{
            setWelayatlar(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getBrands = ()=>{
        axiosInstance.get("/api/brands",{
            params:{
                active:true,
                limit:999
            }
        }).then((data)=>{
            setBrands(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getMarkets = (id)=>{
        axiosInstance.get("/api/markets",{
            params:{
                WelayatlarId:id,
                active:true
        }
        }).then((data)=>{
            console.log(data.data);
            setMarkets(data.data);

        }).catch((err)=>{
            console.log(err);
        })
    }

   

    const getKategoriyas = (id)=>{
        axiosInstance.get("/api/market/kategoriya/"+market_Id,{
            params:{
                active:true
            }
        }).then((data)=>{
            setKategoriyalar(data.data);
        })
    }

    const getSubKategoriyas = (id)=>{
        axiosInstance.get("/api/market/subKategoriya/"+id,{
            params:{
                active:true
            }
        }).then((data)=>{
            setSubKategoriyalar(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }
    const OnChangeW = (value)=>{
        setWelayatId(value);
        getMarkets(value)
    }
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={width>850?600:320}
            className='lukman-gosh--drawer'
            title={dil==="TM"?"Haryt Goş":"Добавить продукт"}
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
            <SurujiYagdayy getProducts={getProducts} brands = {[brands,setBrands]} welayatlar = {[welayatlar,setWelayatlar]} markets={[ markets,setMarkets]} onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                    <form className='lukman-gozleg--form'>
                        <div>
                        <Input style={{marginTop:"0px",marginBottom:"10px"}}  value={code} onChange={(e)=>setCode(e.target.value)} placeholder={dil==="TM"?'Haryt Code':"Код продукта"} className='lukman-gozleg--input' />

                        <Input style={{marginTop:"0px",marginBottom:"10px"}}  value={all} onChange={(e)=>setAll(e.target.value)} placeholder={dil==="TM"?'Umumy gözleg':"Общий поиск"} className='lukman-gozleg--input' />
                        
                   
                        <select style={{height:"35px",border:"none",borderRadius:"6px",marginTop:"0px",marginBottom:"10px"}} onChange={(v)=>{setKategoriya_id(v.target.value);getSubKategoriyas(v.target.value)}}
                         placeholder={dil==="TM"?"Kategoryya":"Категория" } className='lukman-gozleg--input'>
                            <option value={null}>{dil==="TM"?"Ählisi Kategoryya":"Все Категория"}</option>
                            {
                                kategoriyalar?.map((kategoriya,i)=>{
                                    return <option key={"ketegoryi"+i} value={kategoriya.id}>{dil==="TM"?kategoriya.name_tm:kategoriya.name_ru}</option>
                                })
                            }
                        </select>
                        <select style={{height:"35px",border:"none",borderRadius:"6px",marginTop:"0px",marginBottom:"10px"}} onChange={(v)=>setSubKategoriya_id(v.target.value)} placeholder={dil==="TM"?"Ähli SubKategory":"Все подкатегории"} className='lukman-gozleg--input'>
                            <option value={null}>{dil==="TM"?"Ähli SubKategory":"Все подкатегории"}</option>
                            {
                                subKategoriyalar?.map((kategoriya)=>{
                                    return <option value={kategoriya.id}>{dil==="TM"?kategoriya.name_tm:kategoriya.name_ru}</option>
                                })
                            }
                        </select>
                        <select style={{height:"35px",border:"none",borderRadius:"6px",marginTop:"0px",marginBottom:"10px"}} onChange={(v)=>setIs_sale(v.target.value)} placeholder={dil==="TM"?"Ählisi":"Все"} className='lukman-gozleg--input'>
                            <option value={null}>{dil==="TM"?"Ählisi":"Все"} </option>
                            <option value={true}>{dil==="TM"?"Skidkada":"Cкидка"}</option>
                            <option value={false}>{dil==="TM"?"Skidka däl":"Hет скидки"}</option>
                        </select>
                        <Button style={{marginTop:"0px",marginBottom:"10px"}}  onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>{dil==="TM"?"Haryt goş":"Добавить товары"}</Button>
                        <Button style={{marginTop:"0px",marginBottom:"10px"}}  onClick={()=>{setPageNo(pageNo+1);message.success(dil==="TM"?"Yene 1000 haryt goshuldy!":"Добавлено еще 1000 товаров!")}} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>+1000</Button>

                        </div>
                        <div>

                        </div>
                        </form>
 
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ products, setProducts]} getProducts={getProducts} brands = {[brands,setBrands]}  />
            </div>
        </div>
    );
};

export default Lukman; 