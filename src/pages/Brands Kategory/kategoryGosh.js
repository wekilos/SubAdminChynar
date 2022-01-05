import React, { useEffect, useState } from "react";

import { Input, Steps, Button, message, Select } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./kategoryGosh.css";
import axios from "axios";
import fetch from "node-fetch";

const  {Option} = Select;

const WelayatGosh = (props) => {
let getData = props.getData;

  const [ name_tm ,setName_tm] = useState(null);
  const [ name_ru ,setName_ru] = useState("");
  const [ name_en ,setName_en] = useState("");
  const [loading,setLoading] = useState(false);

const [welayatlar,setWelayatlar] = useState([]);
const [welayat_id,setWelayat_id] = useState();
const [welayatKategory,setWelayatKategory] = useState([]);
const [kategory_id,setKategory_id] = useState();
 

  useEffect(()=>{
    getWelayatlar()
  },[])

  const getWelayatlar = ()=>{
    axiosInstance.get("/api/welayatlar").then((data)=>{
      setWelayatlar(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const getKategoriyas = (welayatId)=>{
      axiosInstance.get("/api/kategoryOfMarkets/"+welayat_id).then((data)=>{
        setWelayatKategory(data.data);
      }).catch((err)=>{
        console.log(err);
      })
  }
  const onSubmit = async(id) => {
    // event.preventDefault();
    setLoading(true)
    !kategory_id &&  message.warn("Welayat Saylan!") 
    !kategory_id && setLoading(false)
    kategory_id && await axiosInstance.post("/api/brand/kategory/create",{
      name_tm,name_ru,name_en,WelayatlarId:kategory_id,
    }).then((data)=>{
       message.success("Kategoriya Üstünlikli Döredildi!");
       setName_en("");
       setName_ru("");
       setName_tm("");
       getData(kategory_id);
       setLoading(false)
    }).catch((err)=>{
      console.log("errorrrrrorr",err);
      message.warn("Internet baglanşygyňyzy barlaň!")
      setLoading(false)
    });
  };
  

  function onChangeM(value) {
    setWelayat_id(value);
    getKategoriyas(value);
  }
  function onChangeK(value) {
    setKategory_id(value);
  }

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            {!loading ? <div className="step1" style={{width:"100%"}}>
            
            <Select
            placeholder="Welayat Sayla"
            style={{width:"100%",marginBottom:"15px"}}
            onChange = {onChangeK}>
              {welayatlar.map((welayat)=>{
                  return <Option value={welayat.id}>{welayat.name_tm}</Option>
              })}
            </Select>
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_tm(e.target.value)}} 
              value={name_tm} 
              addonBefore="Market Ady_tm" 
              className="yolHaty-gosh--input" />
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_ru(e.target.value)}} 
              value={name_ru} 
              addonBefore="Market Ady_ru" 
              className="yolHaty-gosh--input" />
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_en(e.target.value)}} 
              value={name_en} 
              addonBefore="Market Ady_en" 
              className="yolHaty-gosh--input" />
              <br></br>
            </div>
           :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
          }
         
        </div>
        <div className="steps-action">
         
          
            <Button
              type="primary" 
              onClick={()=>{onSubmit()}}
            >
              Döret
            </Button>
       
        </div>
      </form>
    </div>
  );
};

export default WelayatGosh;
