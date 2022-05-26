import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';
import { useSizeComponents } from "../../components/sizeComponent";

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './yatyrlanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';
const {Option} = Select;

const Lukman = () =>{

    const {dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents();
    const [units,setUnits] = useState([]);
            const [ statuses,setStatuses] = useState([]);
            const [ statusId, setStatusId] = useState();
            const [ all, setAll ] = useState();
            const [valyuta,setValyuta] = useState();
            const [welayatlar,setWelayatlar] = useState([]);
            const [market_id,setMarket_id] = useState(); 
            const [markets,setMarkets] = useState([])

    useEffect(()=>{
        const time = setTimeout(() => {
            getOrders();
            console.log(all,statusId)
          }, 500);
        return ()=> clearTimeout(time);
    },[all,market_id]);

    useEffect(()=>{
        getConfig();
        getMarkets();
        getWelayatlar();
    },[]);

    const getWelayatlar = ()=>{
        axiosInstance.get("/api/welayatlar").then((data)=>{
            setWelayatlar(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getMarkets = (id)=>{
        axiosInstance.get("/api/markets",{
            params:{
              WelayatlarId:id
            }
          }).then((data)=>{
            setMarkets(data.data);
          }).catch((err)=>{
            console.log(err);
          })
    }

    const getConfig = ()=>{
        axiosInstance.get("/api/configs").then((data)=>{
            console.log("valyuta",data.data[0].currency_exchange)
            setValyuta(data.data[0].currency_exchange);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const getOrders = ()=>{
        let MarketId = localStorage.getItem("SubMarketId");
        axiosInstance.get("/api/orders/new",{
            params:{
                all:all,
                MarketId:MarketId,
            }
        }).then((data)=>{
            console.log(data.data.length);
            localStorage.setItem("gorulenler",data.data.length)
            localStorage.setItem("taze",data.data.length)
            setUnits(data.data)
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

    useEffect(()=>{
        getStatuses();
    },[])
    const getStatuses = ()=>{
        axiosInstance.get("/api/statuses").then((data)=>{
            setStatuses(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const OnChangeW = (value)=>{
        getMarkets(value)
    }

    const OnChangeM = (value)=>{
        setMarket_id(value);
    }
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={400}
            className='lukman-gosh--drawer'
            title="Unit Goş"
            placement="right"
            // closable={true}
            onClose={()=>Close()}
            visible={state}
            style={{zIndex:"100"}}
            >
              <UnitGosh getOrders={getOrders}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
             <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = {dil==="TM"?'Umumy Gözleg':"Общий поиск"} className='lukman-gozleg--input' />
                
                {/* <Select
                    className='lukman-gozleg--input'
                    placeholder="Welayat Saýla"
                    onChange={OnChangeW}
                    
                >
                    <Option value={null}>Ählisi</Option>
                    {
                    welayatlar.map((status)=>{
                        return <Option value={status.id}>{status.name_tm}</Option>
                    })
                    }
                </Select> */}
                {/* <Select
                    className='lukman-gozleg--input'
                    placeholder="Market Saýla"
                    onChange={OnChangeM}
                    
                >
                    <Option value={null}>Ählisi</Option>
                    {
                    markets.map((status)=>{
                        return <Option value={status.id}>{status.name_tm}</Option>
                    })
                    }
                </Select> */}
                {/* <Select
                    className='lukman-gozleg--input'
                    showSearch
                    // style={{ width: 200 }}
                    placeholder="Zakaz Status Saýla"
                    optionFilterProp="children"
                    onChange={(value)=>setStatusId(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="0">Ählisi</Option>
                    {
                    statuses.map((status)=>{
                        return <Option value={status.id}>{status.name_tm}</Option>
                    })
                    }
                </Select> */}
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button> */}
            </form>
            
        </div>
            </div>
            <div className='lukman-Table'>
                <LukmanTable getOrders={getOrders}  data={[units,setUnits]} valyuta = {valyuta}/>
            </div>
        </div>
    );
};

export default Lukman; 