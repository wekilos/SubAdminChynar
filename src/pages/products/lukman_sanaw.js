import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
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
    const [ products, setProducts] = useState([]);

    const [all,setAll] = useState();
    const [market_id,setMarket_id] = useState(null);
    const [kategoriya_id, setKategoriya_id] = useState(null);
    const [is_sale, setIs_sale] = useState(null); 
    const [welayatlar,setWelayatlar] = useState([]);
    const [welayatId,setWelayatId] = useState(null);
    const [brands,setBrands] = useState();

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
    },[all,market_id,kategoriya_id,is_sale,welayatId])

    const getProducts = ()=>{
        let MarketId = localStorage.getItem("SubMarketId");
        axiosInstance.get("/api/products",{
            params:{
                all:all,
                market_id:MarketId, 
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

   

    const getKategoriyas = (id)=>{
        let MarketId = localStorage.getItem("SubMarketId");
        axiosInstance.get("/api/market/kategoriya/"+MarketId).then((data)=>{
            setKategoriyalar(data.data);
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
                        <Input value={all} onChange={(e)=>setAll(e.target.value)} placeholder='Umumy gözleg' className='lukman-gozleg--input' />
                        
                        {/* <Select onChange={OnChangeW} placeholder="Welayat Sayla!"  className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                welayatlar.map((welayat)=>{
                                    return <Option value={welayat.id}>{welayat.name_tm}</Option>
                                })
                            }
                        </Select> */}

                        {/* <Select onChange={(v)=>{setMarket_id(v);getKategoriyas(v)}} placeholder="Ählisi"  className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                markets.map((market)=>{
                                    return <Option value={market.id}>{market.name_tm}</Option>
                                })
                            }
                        </Select> */}
                        <Select onChange={(v)=>setKategoriya_id(v)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                kategoriyalar.map((kategoriya)=>{
                                    return <Option value={kategoriya.id}>{kategoriya.name_tm}</Option>
                                })
                            }
                        </Select>
                        <Select onChange={(v)=>setIs_sale(v)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            <Option value={true}>Skidkada</Option>
                            <Option value={false}>Skidka däl</Option>
                        </Select>
                        </div>
                        <div>
                        <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button>

                        </div>
                        </form>
 
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ products, setProducts]} getProducts={getProducts} />
            </div>
        </div>
    );
};

export default Lukman; 