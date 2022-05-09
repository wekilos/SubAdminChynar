import React, { useContext, useEffect, useState } from "react";

import { Input, Steps, Button, message, Select } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./kategoryGosh.css";
import axios from "axios";
import fetch from "node-fetch";
import { SebedimContext } from "../../context/Sebedim";

const  {Option} = Select;

const WelayatGosh = (props) => {
let getData = props.getData;

const {dil} = useContext(SebedimContext);
  const [ name_tm ,setName_tm] = useState(null);
  const [ name_ru ,setName_ru] = useState("");
  const [ name_en ,setName_en] = useState("");
  const [surat,setSurat] = useState();
  const [loading,setLoading] = useState(false);

const [welayatlar,setWelayatlar] = useState([]);
const [welayat_id,setWelayat_id] = useState();
const [brandKategory,setBrandKategory] = useState([]);
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
      axiosInstance.get("/api//brand/kategory",{
        params:{
          WelayatlarId:welayatId
        }
      }).then((data)=>{
        setBrandKategory(data.data)
      }).catch((err)=>{
        console.log(err);
      })
  }
  const onSubmit = async(id) => {
    // event.preventDefault();

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });

    setLoading(true)
    !kategory_id &&  message.warn(dil==="TM"?"Brand Kategory Saylan!":"Выберите категорию бренда!") 
    !kategory_id && setLoading(false);
    let data = {};
    if(surat){
        data.name_tm=name_tm;
        data.name_ru=name_ru;
        data.name_en=name_en;
        data.img = await toBase64(surat);
        data.img_name = surat.name;
        data.BrandsKategoryId = kategory_id;
        data.welayatId = welayat_id;
    }else{
      message.warn(dil==="TM"?"Surat Saylan!":"Выберите изображение!");
      setLoading(false);
    }
    surat && kategory_id && await axiosInstance.post("/api/brand/create",{
      data
    }).then((data)=>{
       message.success(dil==="TM"?"Brand Üstünlikli Döredildi!":"Бренд успешно создан!");
       setName_en("");
       setName_ru("");
       setName_tm("");
       getData(kategory_id);
       setLoading(false)
    }).catch((err)=>{
      console.log("errorrrrrorr",err);
      message.warn(dil==="TM"?"Internet baglanyşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
      setLoading(false)
    });
  };
  

  function onChangeW(value) {
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
            placeholder={dil==="TM"?"Welayat Sayla!":"Выберите регион!"}
            style={{width:"100%",marginBottom:"15px"}}
            onChange = {onChangeW}>
              {welayatlar?.map((welayat)=>{
                  return <Option value={welayat.id}>{welayat.name_tm}</Option>
              })}
            </Select>

            <Select
            placeholder={dil==="TM"?"Brand Kategory Sayla!":"Выберите категорию бренда!"}
            style={{width:"100%",marginBottom:"15px"}}
            onChange = {onChangeK}>
              {brandKategory?.map((brand)=>{
                  return <Option value={brand.id}>{brand.name_tm}</Option>
              })}
            </Select>
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_tm(e.target.value)}} 
              value={name_tm} 
              addonBefore={dil==="TM"?"Brand Ady_tm":"Бренд название tm" }
              className="yolHaty-gosh--input" />
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_ru(e.target.value)}} 
              value={name_ru} 
              addonBefore={dil==="TM"?"Brand Ady_ru":"Бренд название ru" }
              className="yolHaty-gosh--input" />
              <Input 
              style={{width:"100%"}}
              onChange={(e)=>{setName_en(e.target.value)}} 
              value={name_en} 
              addonBefore={dil==="TM"?"Brand Ady_en":"Бренд название en" }
              className="yolHaty-gosh--input" />
              <Input 
              style={{width:"100%"}} 
              type="file" 
              onChange={(e)=>{setSurat(e.target.files[0])}}
              addonBefore={dil==="TM"?'Brand Surat':"Изображение бренда" } 
              className='yolHaty-gosh--input' />

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
              {dil==="TM"?"Döret":"Создавать"}
            </Button>
       
        </div>
      </form>
    </div>
  );
};

export default WelayatGosh;
