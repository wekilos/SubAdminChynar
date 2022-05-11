import React, { useState, useEffect, useContext } from "react";

import { useSizeComponents } from "../../components/sizeComponent";
import {  Button, Drawer, Select } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./subKategorigosh";
import YolHatyGozle from "./yolHatyGozle";
import YolHatyBerTable from "./subKategoryiyaTable";

import "./yolHatyBer.css";
import { SebedimContext } from "../../context/Sebedim";
const { Option } = Select;

const YolHatyBer = (props) => {

  const [width,height] = useSizeComponents()
  const {dil} = useContext(SebedimContext)
  const [Gosh, setGosh] = useState(false);
  const GoshButton = () => {
    setGosh(!Gosh);
    console.log(Gosh);
  };

  let market_Id = localStorage.getItem("SubMarketId")
  const [data, setData] = useState([]);
  const [ kategoriya, setKategoriya ] = useState([]);
  const [ market_id , setMarket_id ] = useState();
  const [ kategoriyaValue, setKategoriyaValue ] = useState();
  const [marketkategories,setMarketkategories] = useState([]);
  const [marketkategoriya,setMarketkategoriya] = useState();
  const [subKategories,setSubKategories] = useState([])
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/api/markets",{
        params:{
          active:true,
          deleted:false
        }
      }).then((data)=>{
        console.log("data:",data.data);
        setData(data.data);
        getKategoriyas(data.data && data.data[0].id)
        setMarket_id(data.data && data.data[0].id)
        setKategoriyaValue(data.data && data.data[0].name_tm)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getKategoriyas = (e)=>{
      axiosInstance.get("/api/market/kategoriya/"+market_Id,{
        params:{
          active:true,
          deleted:false
        }
      }).then((data)=>{
        console.log( "Market",data.data);
        setKategoriya(data.data);
        setMarketkategoriya(data?.data[0]?.id)
        setKategoriyaValue(data.data  && data.data[0].name_tm)
        getSubKategoriyas(data.data[0]?.id)
      }).catch((err)=>{
        console.log(err);
      });
    }

    const getSubKategoriyas = (e)=>{
      axiosInstance.get("/api/market/subKategoriya/"+e,{
        params:{
          active:true,
          deleted:false
        }
      }).then((data)=>{
        console.log( "Market",data.data);
        setSubKategories(data.data);
      }).catch((err)=>{
        console.log(err);
      });
    }

    function onChange(value) {
      console.log(`selected ${value}`);
      setMarket_id(value);
      getKategoriyas(value);
    }
    function onSearch(val) {
      console.log('search:', val);
    }

    function onChangeK(value){
        setMarketkategoriya(value.target.value);
        getSubKategoriyas(value.target.value)
        console.log("seret",value.target.value)
    }

   

  return (
    <div className="yolHatyBer">
      <Drawer
                width={width>850?500:320}
                className='lukman-table--drawer'
                title={dil==="TM"?"SubKategoryya Goş":"Создать подкатегорию"}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <KategoriyaGosh getKategoriyas={getSubKategoriyas} getData={getData} market={marketkategoriya} onClick={GoshButton}/>

            </Drawer>
      <div className="yolHaty--gozleg">
      <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
         

          <select
            className="yolHaty-gozle--input"
            // showSearch
            style={{ width: "250px" ,height:"35px"}}
            placeholder={dil==="TM"?"Kategoriya Saýla":"выбрать категорию"}
            // value={kategoriyaValue}
           
            onChange={onChangeK}
          >
            {
              kategoriya?.map((kategory)=>{
                return <option value={kategory.id}>{dil==="TM"?kategory.name_tm:kategory.name_ru}</option>
              })
            }
            
          </select>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
             {width>850?"SubKategoriýa Döret":"SubKategoriya"}
          </Button>
        </div>
      </form>
    </div>
      </div>
      <div className="yolHaty-Table">
        <YolHatyBerTable getData={getData} getKategoriyas={getSubKategoriyas} data={[ subKategories, setSubKategories ]}/>
      </div>
    </div>
  );
};

export default YolHatyBer;
