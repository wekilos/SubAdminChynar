import React,{useState,useEffect, useContext} from 'react';
import { Button,Select,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntance';

import './kategory.css';
import WelayatTable from './kategoryTable';
import WelayatGosh from './kategoryGosh';
import WelayatGozle from './kategoryGozle';
import { SebedimContext } from '../../context/Sebedim';

const {Option} = Select;
const Welayatlar = (prop) =>{

  const {dil} = useContext(SebedimContext);
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
       axiosInstance.get("/api/brand/kategory/"+welayatId,{
        params:{
          WelayatlarId:welayatId,
          active:true
        }
      }).then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    const getData = (id)=>{
      axiosInstance.get("/api/brand/kategory/"+id,{
        params:{
          WelayatlarId:id,
          active:true
        }
      }).then((data)=>{
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
      getData(value)
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
                title={dil==="TM"?"Brand Kategoryya Goş":"Добавить категорию бренда"}
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
                    <h2 >{dil==="TM"?"Brandlerin Kategoryya sahypasy":"Страница категории брендов"}</h2>
                      
                    </div>
                    <Select 
                      value={welayatId}
                      onChange={onChangeW} style={{minWidth:"250px"}}>
                        {
                          welayatlar.map((welayat)=>{
                            return <Option value={welayat.id}>{dil==="TM"?welayat.name_tm:welayat.name_ru}</Option>
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
                     {dil==="TM"?"Kategory Döret":"Создать категорию"}
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