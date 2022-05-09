import React,{useState,useEffect, useContext} from 'react';
import { Button,Select,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntance';

import './kategory.css';
import WelayatTable from './brandsTable';
import WelayatGosh from './brandsGosh';
import WelayatGozle from './brandsGozle';
import { SebedimContext } from "../../context/Sebedim";

const {Option} = Select;
const Welayatlar = (prop) =>{

  const { dil } = useContext(SebedimContext);
    const [Gosh,setGosh]=useState(false);
    const [welayatlar,setWelayatlar] = useState([]);
    const [kategories,setKategories] = useState([]);
    const [welayatId,setWelayatId] = useState();
    const [kategoryId,setKategoryId] = useState(null);
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
      getData(kategoryId)
    },[kategoryId,welayatId])
    
    // const getDataSort = ()=>{
    //   axiosInstance.get("/api/brands",{
    //     params:{
    //       KategoryId:kategoryId,
    //     }
    //   }).then((data)=>{
    //     console.log(data.data);
    //     setData(data.data);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }
    const getData = (id)=>{
      axiosInstance.get("/api/brands",{
        params:{
          KategoryId:id,
          welayatId:welayatId
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
        setWelayatId(data.data[0].id)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getKategories = (id)=>{
      axiosInstance.get("/api/brand/kategory/"+id,{
        params:{WelayatlarId:id}
      }).then((data)=>{
        setKategories(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const onChangeW = (value)=>{
      console.log(value)
      setWelayatId(value);
      getKategories(value);
    }
    const onChangeK = (value)=>{
      console.log(value)
      setKategoryId(value)
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
                title={dil==="TM"?"Brand Goş":"Создать бренд"}
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
                      // value={welayatId}
                      onChange={onChangeW} style={{minWidth:"250px"}}>
                        {
                          welayatlar?.map((welayat)=>{
                            return <Option value={welayat.id}>{dil==="TM"?welayat.name_tm:welayat.name_ru}</Option>
                          })
                        }
                      </Select>
                      <Select 
                      // value={kategoryId}
                      placeholder={dil==="TM"?"Kategoriya Sayla!":"Выбрать категорию!"}
                      onChange={onChangeK} style={{minWidth:"250px"}}>
                        <Option value={null}>{dil==="TM"?"Ahlisi":"Бсе"}</Option>
                        {
                          kategories && kategories?.map((kategory)=>{
                            return <Option value={kategory.id}>{dil==="TM"?kategory.name_tm:kategory.name_ru}</Option>
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
                      {dil==="TM"?"Brand Döret":"Создать бренд"}
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