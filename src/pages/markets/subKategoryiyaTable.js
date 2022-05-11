import React, { useState } from "react";

import { useSizeComponents } from "../../components/sizeComponent";
import { Table, Button, Space, Input, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined,LoadingOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";

const YolHatyTable = (props) => {
  
  const [width,height] = useSizeComponents();
// geting all data from database with api
  const [data, setData] = props.data;
  console.log("Data:",data)
  const getData = props.getData;
  const getKategoriyas = props.getKategoriyas;

  const columns = width>850?[
    {
      title: "No",
      dataIndex: "id",
    },
    
    {
      title: "Market Kategoryya Ady",
      dataIndex: "name_tm",
      render:(text,record)=>(
        <h3>{record.MarketKategoriya.name_tm}</h3>
      )
    },
    {
      title: "SubKategoriya ady tm",
      dataIndex: "name_tm",
    },
    {
      title: "SubKategoriya ady ru",
      dataIndex: "name_ru",
    },
    {
      title: "SubKategoriya ady en",
      dataIndex: "name_en",
    },
    
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          
          
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText="Howwa"
            cancelText="Ýok"
          >
             <Button
              type="primary"
              shape="round"
              danger
              // onClick={}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
            
         
        </Space>
      ),
    },
  ]
  :[
    {
      title: "No",
      dataIndex: "id",
    },  
    // {
    //   title: "Market Kategoryya Ady",
    //   dataIndex: "name_tm",
    //   render:(text,record)=>(
    //     <h3>{record.MarketKategoriya.name_tm}</h3>
    //   )
    // },
    {
      title: "SubKategoriya ady tm",
      dataIndex: "name_tm",
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space >
          
          
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText="Howwa"
            cancelText="Ýok"
          >
             <Button
              type="primary"
              shape="round"
              danger
              // onClick={}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
            
         
        </Space>
      ),
    },
  ]

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ tel, setTel ] = useState(false);
  const [ img, setImg ] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ name_tm, setName_tm ] = useState();
  const [ name_ru, setName_ru ] = useState();
  const [ name_en, setName_en ] = useState();
  const [ market , setMarket ] = useState();
  const [loading,setLoading] = useState(false);
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    let market_id=event.MarketKategoriyaId;
    axiosInstance.delete("/api/market/subKategoriya/delete/"+event.id).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
      getKategoriyas(market_id);
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  const DeleteTel = (event) => {
    axiosInstance.delete("/api/market/phone/delete/"+event).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
      let phoneState = phone;
      let galany = phone.PhoneNumbers.filter((tel)=>{
        return tel.id !== event
      })
      phoneState.PhoneNumbers = galany;
      setPhone(phoneState);
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  const ShowSurat = (event) => {
    setImg(!img);
    if(event){console.log("market:",event); setMarket(event)};
  };
  
  
  const ShowTelefon = (event) => {
    setTel(!tel);
    setPhone([]);
    if(event){console.log("tel:",event); setPhone(event)};
  };
  const AddPhone = (event)=>{
    console.log(event,newPhone);
    let phoneNumbers=[];
    phoneNumbers.push(newPhone);
    axiosInstance.post("/api/market/phone/create/"+event,{
      phoneNumber:phoneNumbers
    }).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg);
      let newp = phone;
      newp.PhoneNumbers.push(data.data.data);
      setPhone(newp);
      setNewPhone();
      getData()
    }).catch((err)=>{
      console.log(err);
    })
  }
  const ShowModal = (event) => {
    setVisible(!visible);
    console.log("goshmacha",event);
    setMaglumat([]);
    setMaglumat(event);
  };
  const ShowDrawer = (event) => {
    setEdit(!edit);
    setVisible(false);
    console.log(event);
    setMaglumat([]);
    setMaglumat(event);
  };
  const inputChangeHandler = (event) => {
    console.log(event.target.name);
    let name = event.target.name;
    let value = event.target.value;

    setMaglumat({
      ...maglumat,
      [name]: value,
    });
  };
  
  const KategoriyaGosh = (event)=>{
    setLoading(true);
    console.log(event);
    let market_id = event.MarketId;
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
      setLoading(false);
      message.warn("Internet baglanşygyňyzy barlaň!")
    })
  }

  const saveData = (event) => {
    // console.log(event)
    let market_id = event.MarketKategoriyaId;
    // setData([...data, maglumat]);
    setEdit(false);
    axiosInstance.patch("/api/market/subKategoriya/update/"+maglumat.id,{
      name_tm:maglumat.name_tm,
      name_ru:maglumat.name_ru,
      name_en:maglumat.name_en,
      active:true
    }).then((data)=>{
      console.log(data.data);
      getKategoriyas(market_id)
      message.success("Uytgedildi!")
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div className="yolHatyTable">
      <Drawer
        width={width>850?500:320}
        className="lukman-table--drawer"
        title="Goşmaça"
        placement="right"
        onClose={() => ShowModal()}
        visible={visible}
      >
        {maglumat && (
          <table border="1" className="goshmacha--ul">
            <tr className="modalLi" key={maglumat && maglumat.id}>
              <td>ID </td>
              <td>{maglumat && maglumat.id} </td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_tm}>
              <td>Kategorýa tm </td>
               {maglumat &&  maglumat.name_tm}
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_ru}>
              <td>Kategorýa ru </td>
              <td>{maglumat && maglumat.name_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_en}>
              <td>Kategorýa en </td>
              <td>{maglumat && maglumat.name_en}</td>
            </tr>
            
            
          </table>
          
        )}
        
      </Drawer>
      
      <Drawer
        width={width>850?500:320}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div className="DrawerButtons" style={{margin:"0 auto",display:"flex",justifyContent:"space-evenly"}}>
            <Button
              className="DrawerButton"
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowDrawer()}
            >
              Goý bolsun
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              Üýtget <EditOutlined />
            </Button>
          </div>
        }
      >
      {!loading ? <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name="name_tm"
            value={maglumat && maglumat.name_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name ru"
            className="suruji-uytget--input"
            name="name_ru"
            value={maglumat && maglumat.name_ru}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name en"
            className="suruji-uytget--input"
            name="name_en"
            value={maglumat && maglumat.name_en}
            onChange={inputChangeHandler}
          />
          
        </div>
        :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
          }
      </Drawer>

      <Drawer
        width={width>850?500:320}
        className="lukman-table--drawer"
        title="Üýtgetmelerrrrr"
        placement="right"
        onClose={() => ShowSurat()}
        visible={img}
        
      >
        <div className="yolHatyTable--uytgetmeler">
          <div className="yolHatyTable--uytgetmeler" style={{width:"100%",justifyContent:"center"}}>
           <Input
               style={{margin:"10px 0px"}}
               addonBefore="Ady tm"
               className="suruji-uytget--input"
               name="name_tm"
               value={name_tm}
               onChange={(e)=>setName_tm(e.target.value)}
             />
             <Input
               style={{margin:"10px 0px"}}
               addonBefore="Ady ru"
               className="suruji-uytget--input"
               value={name_ru}
               onChange={(e)=>setName_ru(e.target.value)}
             />
             <Input
               style={{margin:"10px 0px"}}
               addonBefore="Ady en"
               className="suruji-uytget--input"
               value={name_en}
               onChange={(e)=>setName_en(e.target.value)}
             />
          </div>
              <Button
              type="primary"
              shape="round"
              onClick={()=>KategoriyaGosh(market)}
            >
              Gosh
            </Button>
        </div>
      </Drawer>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
