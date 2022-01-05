import React, { useEffect, useState } from "react";

import { Input, Steps, Button, message, Select } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";

const  {Option} = Select;

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
  const [ startI,setStartI] = useState();
  const [ endI,setEndI ] = useState();
  const [ startII,setStartII] = useState();
  const [ endII,setEndII ] = useState();
  const [dastawkaPrice,setDastawkaPrice] = useState();
  const [is_cart,setIs_cart] = useState();
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
const [welayatlar,setWelayatlar] = useState([]);
const [welayat_id,setWelayat_id] = useState();
const [welayatKategory,setWelayatKategory] = useState([]);
const [kategory_id,setKategory_id] = useState();
  const fileHandler = (e)=>{
    let file = e.target.files[0];
    setSurat(file);
  }

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
      axiosInstance.get("/api/kategoryOfMarkets/"+welayatId).then((data)=>{
        setWelayatKategory(data.data);
      }).catch((err)=>{
        console.log(err);
      })
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
            dastawkaStartI:startI,
            dastawkaEndI:endI,
            dastawkaStartII:startII,
            dastawkaEndII:endII,
            dastawkaPrice:dastawkaPrice,
            is_cart:is_cart,
            WelayatlarId:welayat_id,
            KategoriyaOfMarketId:kategory_id,
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
  

  function onChangeM(value) {
    setWelayat_id(value);
    getKategoriyas(value);
  }
  function onChangeK(value) {
    setKategory_id(value);
  }

  const IsCart = (value)=>{
    setIs_cart(value);
  }
  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            {!loading ? <div className="step1" style={{width:"100%"}}>
            <Select
            className='suruji-yagdayy--input' 
            // style={{ width: 200 }}
            placeholder="Welayat Saýla"
            onChange={onChangeM}
          >
            {
              welayatlar.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
          </Select>
          <Select
            className='suruji-yagdayy--input' 
            // style={{ width: 200 }}
            placeholder="Kategoryya Saýla"
            onChange={onChangeK}
          >
            {
              welayatKategory.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
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
              <Input
                addonBefore="I bashlayan"
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={startI}
                onChange={(e)=>setStartI(e.target.value)}
              />
              <Input
                addonBefore="I gutaryan"
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={endI}
                onChange={(e)=>setEndI(e.target.value)}
              />
              <Input
                addonBefore="II bashlayan"
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={startII}
                onChange={(e)=>setStartII(e.target.value)}
              />
              <Input
                addonBefore="II gutaryan"
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={endII}
                onChange={(e)=>setEndII(e.target.value)}
              />
                <Input
                addonBefore="Dastawka Baha"
                name="description_en"
                className="suruji-uytget--input"
                value={dastawkaPrice}
                onChange={(e)=>setDastawkaPrice(e.target.value)}
              />
              <Select
              style={{width:"100%"}}
              placeholder="Market kartdan söwda edýärmi?"
              onChange={IsCart}>
                <Option value={true}>Howa</Option>
                <Option value={false}>Ýok</Option>
              </Select>
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
