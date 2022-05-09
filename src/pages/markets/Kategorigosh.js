import React, { useContext, useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";
import { SebedimContext } from "../../context/Sebedim";


const YolHatyGosh = (props) => {

  const {dil } = useContext(SebedimContext)
let getData = props.getData;
let getKategoriyas = props.getKategoriyas;
let market_id = props.market;
  const [ name_tm ,setName_tm] = useState("");
  const [ name_ru ,setName_ru] = useState("");
  const [ name_en ,setName_en] = useState("");
  const [loading,setLoading] = useState(false);
  
  const KategoriyaGosh = (event)=>{
    setLoading(true);
    console.log("marketId",event);
    let market_id = event;
    axiosInstance.post("/api/market/kategoriya/create/"+market_id,{
      name_tm:name_tm,
      name_ru:name_ru,
      name_en:name_en,
      active:true
    }).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg);
      setName_tm();
      setName_ru();
      setName_en();
      getKategoriyas(market_id);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      message.warn("Internet baglanşygyňyzy barlaň!")
      setLoading(false);
    })
  }
    

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            <div className="step1">
            { !loading ? <div className="yolHatyTable--uytgetmeler">
              <div className="yolHatyTable--uytgetmeler" style={{width:"100%",justifyContent:"center"}}>
                <Input
                    style={{margin:"10px 0px"}}
                    addonBefore={dil==="TM"?"Ady tm":"Название тм"}
                    className="suruji-uytget--input"
                    name="name_tm"
                    value={name_tm}
                    onChange={(e)=>setName_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore={dil==="TM"?"Ady ru":"Название ru"}
                    className="suruji-uytget--input"
                    value={name_ru}
                    onChange={(e)=>setName_ru(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore={dil==="TM"?"Ady en":"Название en"}
                    className="suruji-uytget--input"
                    value={name_en}
                    onChange={(e)=>setName_en(e.target.value)}
                    />
                </div>
                    <Button
                    type="primary"
                    shape="round"
                    onClick={()=>KategoriyaGosh(market_id)}
                    >
                    {dil==="TM"?"Gosh":"Создайте"}
                    </Button>
                </div>
                :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />}
            </div>
         
        </div>
        {/* <div className="steps-action">
         
          
            <Button
              type="primary" 
              onClick={()=>{onSubmit()}}
            >
              Döret
            </Button>
       
        </div> */}
      </form>
    </div>
  );
};

export default YolHatyGosh;
