import React,{useState,useEffect} from 'react';
import { Button,Select,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntance';

import './kategory.css';
import WelayatTable from './kategoryTable';
import WelayatGosh from './kategoryGosh';
import WelayatGozle from './kategoryGozle';

const {Option} = Select;
const Welayatlar = prop =>{

    const [Gosh,setGosh]=useState(false);
    const [welayatlar,setWelayatlar] = useState([]);
    const [welayatId,setWelayatId] = useState();
    const [sany,setSany] = useState(0);
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }    
    const [data, setData] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      getWelayatlar();
      
    },[])

    useEffect(()=>{
      getDataSort()
    },[welayatId])
    
    const getDataSort = ()=>{
      axiosInstance.get("/api/kategoryOfMarkets/"+welayatId).then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    const getData = (id)=>{
      axiosInstance.get("/api/kategoryOfMarkets/"+id).then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getWelayatlar = ()=>{
      axiosInstance.get("/api/welayatlar").then((data)=>{
        console.log(data.data);
        setWelayatlar(data.data);
        getData(data.data[0].id);
        setWelayatId(data.data[0].id)
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
            <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Welayat Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <WelayatGosh getData={getData} onClick={GoshButton}/>

            </Drawer>
            <div className='yolHaty--gozleg'>
               <form  className=" welayatGozleg">
                    <div>
                    <h2 >Marketlerin Kategoryya sahypasy</h2>
                      
                    </div>
                    <Select 
                      value={welayatId}
                      onChange={onChangeW} style={{minWidth:"250px"}}>
                        {
                          welayatlar.map((welayat)=>{
                            return <Option value={welayat.id}>{welayat.name_tm}</Option>
                          })
                        }
                      </Select>
                    <div>
                    {true && <Button
                      onClick={GoshButton}
                      shape="round"
                      type="primary"
                      icon={<PlusCircleFilled />}
                      className="yolHaty-gozle--button"
                    >
                      Kategory Döret
                    </Button>}
                  </div>
                </form>
            </div>
            <div className='yolHaty-Table'>
                <WelayatTable getData={getData} data={[data,setData]}/>
            </div>
        </div>
    );
};

export default Welayatlar;