import React, { useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";


const YolHatyGosh = (props) => {
let getData = props.getData;

  const [ surat, setSurat ] = useState(null);
  const [ name_tm ,setName_tm] = useState(null);
  const [ name_ru ,setName_ru] = useState("");
  const [ name_en ,setName_en] = useState("");
  const [ description_tm ,setDescription_tm] = useState("");
  const [ description_ru ,setDescription_ru] = useState("");
  const [ description_en ,setDescription_en] = useState("");
  const [ address_tm ,setAddress_tm] = useState("");
  const [ address_ru ,setAddress_ru] = useState("");
  const [ address_en ,setAddress_en] = useState("");
  const [ phoneNumber ,setPhoneNumber] = useState("");
  const [loading,setLoading] = useState(false);
  const [ data, setData ] = useState({
    img_name:"",
    img:"",
    name_tm:"",
    name_ru:"",
    name_en:"",
    phoneNumber:"",
    address_en:"",
    address_ru:"",
    address_tm:"",
    description_en:"",
    description_ru:"",
    description_tm:"",
   })

  const fileHandler = (e)=>{
    let file = e.target.files[0];
    setSurat(file);
  }
  const onSubmit = async(event) => {
    // event.preventDefault();
    setLoading(true)
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });
      let data = {}
      if(surat){
            data={
            img_name:surat.name,
            img:await toBase64(surat),
            name_tm:name_tm,
            name_ru:name_ru,
            name_en:name_en,
            phoneNumber:phoneNumber,
            address_en:address_en,
            address_ru:address_ru,
            address_tm:address_tm,
            description_en:description_en,
            description_ru:description_ru,
            description_tm:description_tm,
           }
          }

    await axiosInstance.post("/api/market/create",{
      data
    }).then((data)=>{
      message.success("Market Üstünlikli Döredildi!");
      setName_en("");
      setName_ru("");
      setName_tm("");
      setAddress_en("");
      setAddress_ru("");
      setAddress_tm("");
      setDescription_en("");
      setDescription_ru("");
      setDescription_tm("");
      setPhoneNumber("");
      setSurat();
      setData({
        img_name:"",
        img:"",
        name_tm:"",
        name_ru:"",
        name_en:"",
        phoneNumber:"",
        address_en:"",
        address_ru:"",
        address_tm:"",
        description_en:"",
        description_ru:"",
        description_tm:"",
       });
       getData();
       setLoading(false)
    }).catch((err)=>{
      console.log("errorrrrrorr",err);
      message.warn("Internet baglanşygyňyzy barlaň!")
      setLoading(false)
    });
  };
  
    

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            {!loading ? <div className="step1" style={{width:"100%"}}>
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
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setDescription_tm(e.target.value)}}
                value={description_tm}
                addonBefore="Description tm"
                className="yolHaty-gosh--input suruji"
              />
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setDescription_ru(e.target.value)}}
                value={description_ru}
                addonBefore="Description ru"
                className="yolHaty-gosh--input"
              />
              <br></br>
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setDescription_en(e.target.value)}}  
                value={description_en}
                addonBefore="Description en"
                className="yolHaty-gosh--input suruji"
              />
           
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
                value={phoneNumber}
                addonBefore="Phone Number"
                className="yolHaty-gosh--input"
              />
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setAddress_tm(e.target.value)}}
                value={address_tm}
                addonBefore=" Address tm "
                className="yolHaty-gosh--input"
              />
              {/* <h2 className="step2-header">Tapgyr II</h2> */}
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setAddress_ru(e.target.value)}}
                value={address_ru}
                addonBefore="Address ru"
                className="yolHaty-gosh--input"
              />
              <Input
              style={{width:"100%"}}
                onChange={(e)=>{setAddress_en(e.target.value)}}
                value={address_en}
                addonBefore=" Address en "
                className="yolHaty-gosh--input"
              />
              <h3 className="step2-header">Market Surat</h3>
              <input 
              style={{width:"100%"}}
              onChange={(e)=>fileHandler(e)}
              type="file" 
              name="marketImage"
              className="yolHaty-gosh--input suruji"
              />
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

export default YolHatyGosh;
