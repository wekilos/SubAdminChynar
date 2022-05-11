import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer,Select, message} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import LukmanSanawTable from './LukmanSanawTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option}=Select;


const Lukman = () =>{

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
            width={600}
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
                        
                        {/* <Select onChange={OnChangeW} placeholder="Welayat Sayla!"  className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                welayatlar.map((welayat)=>{
                                    return <Option value={welayat.id}>{welayat.name_tm}</Option>
                                })
                            }
                        </Select> */}

                        {/* <Select onChange={(v)=>{setMarket_id(v);getKategoriyas(market_Id)}} placeholder="Ählisi"  className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                markets.map((market)=>{
                                    return <Option value={market.id}>{market.name_tm}</Option>
                                })
                            }
                        </Select> */}
                        <Select onChange={(v)=>{setKategoriya_id(v);getSubKategoriyas(v)}} placeholder="Kategoryya" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                kategoriyalar.map((kategoriya)=>{
                                    return <Option value={kategoriya.id}>{kategoriya.name_tm}</Option>
                                })
                            }
                        </Select>
                        <Select onChange={(v)=>setSubKategoriya_id(v)} placeholder="SubKategoryya" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                subKategoriyalar.map((kategoriya)=>{
                                    return <Option value={kategoriya.id}>{kategoriya.name_tm}</Option>
                                })
                            }
                        </Select>
                        <Select onChange={(v)=>setIs_sale(v)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            <Option value={true}>Skidkada</Option>
                            <Option value={false}>Skidka däl</Option>
                        </Select>
                        <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button>
                        <Button onClick={()=>{setPageNo(pageNo+1);message.success("Yene 1000 haryt goshuldy!")}} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>+1000</Button>

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