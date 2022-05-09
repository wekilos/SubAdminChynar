import React, { useState, useEffect, useContext } from "react";

import { Input, Steps, Button, Drawer, message, Select } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./Kategorigosh";
import YolHatyGozle from "./yolHatyGozle";
import YolHatyBerTable from "./yolHatyBerTable";

import "./yolHatyBer.css";
import { SebedimContext } from "../../context/Sebedim";
const { Option } = Select;

const YolHatyBer = (props) => {
  const {dil } = useContext(SebedimContext)
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
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/api/markets",{
        // params:{
        //   deleted:false
        // }
      }).then((data)=>{
        console.log("data:",data.data);
        setData(data.data);
        getKategoriyas(data?.data[0]?.id)
        setMarket_id( data?.data[0]?.id)
        setKategoriyaValue(data?.data[0]?.name_tm);
        // setKategoriya(data.data?.[0].MarketKategoriyas)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getKategoriyas = (e)=>{
      console.log(e);
      axiosInstance.get("/api/market/kategoriya/"+market_Id ,{
        params:{
          active:true,
          deleted:false
        }
      }
      ).then((data)=>{
        console.log( "Market",data?.data);
        setKategoriya(data.data)
        // setKategoriya(data?.data.MarketKategoriyas);
      setKategoriyaValue( data?.data[0]?.Market?.name_tm)   
        //  setKategoriyaValue( data?.data.name_tm)

      }).catch((err)=>{
        console.log(err);
      });
    }

    function onChange(value) {
      console.log(`selected ${value}`);
      setMarket_id(value);
      getKategoriyas(value);
    }
   

  return (
    <div className="yolHatyBer">
      <Drawer
                width={500}
                className='lukman-table--drawer'
                title={dil==="TM"?"Kategoryya Goş":"Добавить категорию"}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <KategoriyaGosh getKategoriyas={getKategoriyas} getData={getData} market={market_Id} onClick={GoshButton}/>

            </Drawer>
      <div className="yolHaty--gozleg">
      <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
          {/* <Select
            className="yolHaty-gozle--input"
            style={{ width: 200 }}
            placeholder="Market Saýla"
            value={kategoriyaValue}
            onChange={onChange}
          >
            {
              data.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
            
          </Select> */}
          <h1>{dil==="TM"?"Market Kategoryalary":"Категории маркетa"}</h1>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            {dil==="TM"?" Kategoriýa Döret":"Создать категорию"}
          </Button>
        </div>
      </form>
    </div>
      </div>
      <div className="yolHaty-Table">
        <YolHatyBerTable getData={getData} getKategoriyas={getKategoriyas} data={[ kategoriya, setKategoriya ]}/>
      </div>
    </div>
  );
};

export default YolHatyBer;
