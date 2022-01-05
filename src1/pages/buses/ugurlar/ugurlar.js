import React, { useState,useEffect } from "react";
import { Button, Input, Drawer } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled,SearchOutlined} from "@ant-design/icons";

import UgurlarTable from "./ugurlarTable";
import "./ugurlar.css";

import UgurGosh from "./ugurGosh";
import { axiosInstance } from "../../../utils/axiosIntance";

const Ugurlar = (props) => {
  const [Gosh, setGosh] = useState(false);
  const [data, setData] = useState([]);
  const [all,setAll] = useState(null);
  const [no,setNo]=useState(null);

  useEffect(()=>{
    GetUgurlar();
  },[])
  const GetUgurlar=()=>{
    axiosInstance.get("/api/bus_number_list").then((data)=>{
      setData(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    const time = setTimeout(()=>{
      GetUgurlarWithFilter();
      
    },500);
    return()=>clearTimeout(time);
    
  },[all,no])
  const GetUgurlarWithFilter=()=>{
    axiosInstance.get("/api/bus_number_list",{
      params:{
        query:all
      }
    }).then((data)=>{
      setData(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const GoshButton = (event) => {
    setGosh(!Gosh);
  };

  return (
    <div className="ugurlar">
      {/* <div className='bus--top'>
                <h2 className="bus--header">Awtobuslar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='bus--gosh'> Awtobus Goş </Button>
            </div> */}
      {/* {Gosh && <BusGosh data={[data,setData]} onClick={GoshButton} />} */}
      
      
       

      <Drawer
        width={400}
        className="lukman-table--drawer"
        title="Ugur Goş"
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => GoshButton()}
        visible={Gosh}
        
      >
        <UgurGosh data={[data, setData]} GoshButton={GoshButton} GetUgurlar={GetUgurlar}/>
      </Drawer>
      <div className="ugurlar--gozleg">
      <div className='ugurlar-gozle '>
            <form className='ugurlar-gozle--form'>
                <div>
                <Input addonBefore="No" className='ugurlar-gozle--input' onChange={(e)=>setNo(e.target.value)}/>
                <Input addonBefore="Umumy" className='ugurlar-gozle--input' onChange={(e)=>setAll(e.target.value)}/>
                </div>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ugurlar-gozle--button'> Ugur Goş </Button>
           </form>
        </div>
      </div>
      <div className="bus-Table">
        <UgurlarTable data={[data, setData]} GetUgurlar={GetUgurlar}/>
      </div>
    </div>
  );
};

export default Ugurlar;
