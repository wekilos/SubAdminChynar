import React, { useState,useEffect } from "react";
import { Button, Input, Drawer } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled } from "@ant-design/icons";
import {BASE_URL,axiosInstance} from '../../utils/axiosIntance';
import BusGosh from "./busGosh";
import BusTable from "./busTable";
import BusGozle from "./busGozle";
import "./bus.css";

const Bus = (props) => {
  const [Gosh, setGosh] = useState(false);
  const [data, setData] = useState([
    {
      dowletNo: "AGF8548AG",
      kysmy: "Hundai",
      yyly: "2012",
      ugurNo: "15",
      ugurAdy: "Gurtly-Awtokombinat",
      ugurdakyNo: "3",
      guratlygy: true,
    }
  ]);
  
  useEffect(()=>{
    GetBus();
  },[])

const GetBus = ()=>{
  axiosInstance.get("/api/busses_list").then((data)=>{
    console.log("gelen data",data.data);
    setData(data.data);
  }).catch((err)=>{
    console.log(err);
  });
  
};
  

  const GoshButton = (event) => {
    setGosh(!Gosh);
  };

  return (
    <div className="bus">
      {/* <div className='bus--top'>
                <h2 className="bus--header">Awtobuslar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='bus--gosh'> Awtobus Goş </Button>
            </div> */}
      {/* {Gosh && <BusGosh data={[data,setData]} onClick={GoshButton} />} */}
      <Drawer
        width={400}
        className="lukman-table--drawer"
        title="Awtobus Goş"
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => GoshButton()}
        visible={Gosh}
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon={<PlusCircleFilled />}
              shape="round"
              type="primary"
              htmlType="submit"
              className="bus-gosh--button"
            >
              Hasaba al
            </Button>
            <Button
              onClick={GoshButton}
              shape="round"
              danger
              type="primary"
              className="bus-gosh--button"
            >
              Gerek däl
            </Button>
          </div>
        }
      >
        <BusGosh data={[data, setData]} />
      </Drawer>
      <div className="bus--gozleg">
        <BusGozle GoshButton={GoshButton} />
      </div>
      <div className="bus-Table">
        <BusTable data={[data, setData]} />
      </div>
    </div>
  );
};

export default Bus;
