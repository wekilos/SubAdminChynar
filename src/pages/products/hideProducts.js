
import React,{useEffect, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Button,Input,Drawer,Select,message} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import HideProductsTable from './hideProductsTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option}=Select;


const Lukman = () =>{

    const [width,height] = useSizeComponents()
    const [ markets,setMarkets] = useState([]);
    const [ kategoriyalar,setKategoriyalar] = useState([]);
    const [ subKategoriyalar, setSubKategoriyalar] = useState([]);
    const [ products, setProducts] = useState([]);

    const [all,setAll] = useState();
    let market_Id = localStorage.getItem("SubMarketId");
    const [market_id,setMarket_id] = useState(market_Id);
    const [kategoriya_id, setKategoriya_id] = useState();
    const [subKategoriya_id, setSubKategoriya_id] = useState(null);
    const [is_sale, setIs_sale] = useState(); 
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
    },[])

    useEffect(()=>{
        const time = setTimeout(() => {
            getProducts();
          }, 500);
        return ()=> clearTimeout(time);
    },[all,market_id,kategoriya_id,is_sale,welayatId,code])

    const getProducts = ()=>{
        axiosInstance.get("/api/products/disActive",{
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
                console.log(data.data);
                setProducts(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getProductsPerPage()
    },[pageNo])
    const getProductsPerPage = ()=>{
        axiosInstance.get("/api/products/disActive",{
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
                console.log(data.data);
                let array = products
                data.data?.map((pro)=>{
                    array.push(pro)
                })
                setProducts([...array]);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getWelayatlar = () =>{
        axiosInstance.get("/api/welayatlar").then((data)=>{
            setWelayatlar(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getBrands = ()=>{
        axiosInstance.get("/api/brands").then((data)=>{
            setBrands(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const getMarkets = (id)=>{
        axiosInstance.get("/api/markets",{
            params:{WelayatlarId:id}
        }).then((data)=>{
            console.log(data.data);
            setMarkets(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getKategoriyas()
    },[market_id])

    const getKategoriyas = ()=>{
        axiosInstance.get("/api/market/kategoriya/"+market_Id).then((data)=>{
            setKategoriyalar(data.data);
        }).catch((err)=>{
            console.log(err)
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
            title="Haryt Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
            <SurujiYagdayy getProducts={getProducts} brands = {[brands,setBrands]} welayatlar = {[welayatlar,setWelayatlar]} markets={[ markets,setMarkets]} onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                    <form className='lukman-gozleg--form'>
                        <div>
                        <Input value={code} onChange={(e)=>setCode(e.target.value)} placeholder='Haryt Code' className='lukman-gozleg--input' />

                        <Input value={all} onChange={(e)=>setAll(e.target.value)} placeholder='Umumy gözleg' className='lukman-gozleg--input' />
                       
                        <select style={{height:"35px",border:"none",borderRadius:"6px"}}  onChange={(v)=>{setKategoriya_id(v.target.value);getSubKategoriyas(v.target.value)}} placeholder="Kategoryalar" className='lukman-gozleg--input'>
                            <option value={null}>Ählisi</option>
                            {
                                kategoriyalar.map((kategoriya)=>{
                                    return <option value={kategoriya.id}>{kategoriya.name_tm}</option>
                                })
                            }
                        </select>
                        <select style={{height:"35px",border:"none",borderRadius:"6px"}}  onChange={(v)=>setKategoriya_id(v.target.value)} placeholder="SubKategoryalar" className='lukman-gozleg--input'>
                            <option value={null}>Ählisi</option>
                            {
                                subKategoriyalar.map((kategoriya)=>{
                                    return <option value={kategoriya.id}>{kategoriya.name_tm}</option>
                                })
                            }
                        </select>
                        <select style={{height:"35px",border:"none",borderRadius:"6px"}}  onChange={(v)=>setIs_sale(v.target.value)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <option value={null}>Ählisi</option>
                            <option value={true}>Skidkada</option>
                            <option value={false}>Skidka däl</option>
                        </select>
                        <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button>
                        <Button onClick={()=>{setPageNo(pageNo+1);message.success("Yene 1000 haryt goshuldy!")}} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>+1000</Button>

                        </div>
                        <div>
                        {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button> */}

                        </div>
                        </form>
 
            </div>
            <div className='lukman-Table'>
                <HideProductsTable data={[ products, setProducts]} getProducts={getProducts} />
            </div>
        </div>
    );
};

export default Lukman; 