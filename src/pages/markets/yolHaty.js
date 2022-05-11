import React,{useState,useEffect, useContext} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import { Button,Input,Drawer, Select, message } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import YolHatyGosh from './yolHatyGosh';
import YolHatyGozle from './yolHatyGozle';
import YolHatyTable from './yolHatyTable';
import { axiosInstance } from '../../utils/axiosIntance';

import './yolHaty.css';
import "./yolHatyGozle.css";
import { SebedimContext } from '../../context/Sebedim';
const {Option} = Select;

const YolHaty = prop =>{

  const [width,height] = useSizeComponents()
  const {dil} = useContext(SebedimContext);

    const [Gosh,setGosh]=useState(false);
    const [sany,setSany] = useState(0);
    let market_Id = localStorage.getItem("SubMarketId")
    const [welayatId,setWelayatId] = useState(null);
    const [welayatlar,setWelayatlar] = useState([])
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }    
    const [data, setData] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      Welayatlar()
    },[])
    
    useEffect(()=>{
      const time = setTimeout(()=>{
         getData() 
      },500)
      return ()=>clearTimeout(time);
    },[welayatId])

    const Welayatlar = ()=>{
      axiosInstance.get("/api/welayatlar").then((data)=>{
        setWelayatlar(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getData = ()=>{
      axiosInstance.get("/api/market/"+market_Id).then((data)=>{
        console.log(data.data);
        let newArray = []
        newArray.push(data.data);
        setData([...newArray]);
        setSany(data.data.length);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const onChangeW = (value)=>{
      setWelayatId(value)
    }

    return(
        <div className='yolHaty'>
            {/* <div className='yolHaty--top'>
                <h2 className="yolHaty--header">Ýol Hatlar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji--gosh'>Ýol Haty Döret</Button>
            </div> */}
            {/* {Gosh && <YolHatyGosh onClick={GoshButton}/>} */}
            {/* <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Market Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <YolHatyGosh getData={getData} onClick={GoshButton}/>

            </Drawer> */}
            <div className='yolHaty--gozleg yolHaty-gozle'>
                {/* <YolHatyGozle sany={sany} GoshButton={GoshButton}/> */}
                <form className="yolHaty-gozle--form">
                  <div style={{display:"inline-flex"}}>
                  <h2 style={{margin:"10px 10px"}}>{dil==="TM"?"Admin Market page":"Страница администратора рынка"}</h2>
                    {/* <Input
                      className="yolHaty-gozle--input"
                      placeholder="Id No"
                      addonAfter={<SearchOutlined />}
                    />
                    <Input
                      className="yolHaty-gozle--input"
                      placeholder="Umumy Gözleg"
                      addonAfter={<SearchOutlined />}
                    /> */}
                    {/* <Select 
                      onChange={onChangeW}
                      placeholder="Welayat Sayla" style={{minWidth:"250px",margin:"10px"}}>
                      <Option value={null}>Ahlisi</Option>
                     {welayatlar.map((welayat)=>{
                       return <Option value={welayat.id}>{welayat.name_tm}</Option>
                     })}
                    </Select> */}
                  </div>
                  <div>
                    {false && <Button
                      onClick={GoshButton}
                      shape="round"
                      type="primary"
                      icon={<PlusCircleFilled />}
                      className="yolHaty-gozle--button"
                    >
                      Market Döret
                    </Button>}
                  </div>
                </form>
            </div>
            <div className='yolHaty-Table'>
                <YolHatyTable getData={getData} data={[data,setData]}/>
            </div>
        </div>
    );
};

export default YolHaty;