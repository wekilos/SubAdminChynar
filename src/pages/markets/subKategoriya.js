import React, { useState, useEffect } from "react";

import {  Button, Drawer, Select } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./subKategorigosh";
import YolHatyGozle from "./yolHatyGozle";
import YolHatyBerTable from "./subKategoryiyaTable";

import "./yolHatyBer.css";
const { Option } = Select;

const YolHatyBer = (props) => {
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
        setMarketkategoriya(value);
        getSubKategoriyas(value)
    }

    function onSearchK(val) {
      console.log('search:', val);
    }

  return (
    <div className="yolHatyBer">
      <Drawer
                width={500}
                className='lukman-table--drawer'
                title="SubKategoryya Goş"
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
          {/* <Select
            className="yolHaty-gozle--input"
            showSearch
            style={{ width: 200 }}
            placeholder="Market Saýla"
            value={kategoriyaValue}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              data.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
            
          </Select> */}

          <Select
            className="yolHaty-gozle--input"
            showSearch
            style={{ width: 200 }}
            placeholder="Kategoriya Saýla"
            value={kategoriyaValue}
            optionFilterProp="children"
            onChange={onChangeK}
            onSearch={onSearchK}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              kategoriya.map((kategory)=>{
                return <Option value={kategory.id}>{kategory.name_tm}</Option>
              })
            }
            
          </Select>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            Market Kategoriýa Döret
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
