import React, { useState, useEffect } from "react";
import { Table, Button, Space, Select, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import "./welayatTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";
const {Option} = Select;

const WelayatTable = (props) => {
  
// geting all data from database with api
  const [data, setData] = props.data;
  const getData = props.getData;

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Welayat Ady tm",
      dataIndex: "name_tm",
    },
    {
      title: "Welayat Ady ru",
      dataIndex: "name_ru",
    },
    {
      title: "Welayat Ady en",
      dataIndex: "name_en",
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            Goşmaça
          </Button> */}
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowTelefon(record)}
          >
             Telefon 
          </Button> */}
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowSurat(record)}
          >
             Surat 
          </Button> */}
            <Popconfirm
            title="Siz çyndan öçürmek isleýärsiňizmi?"
            onConfirm={() => DeleteMarket(record.id)}
            // onCancel={cancel}
            okText="Hawa"
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
  ];

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ tel, setTel ] = useState(false);
  const [ img, setImg ] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ sur, setSur ] = useState();
  const [ market , setMarket ] = useState();
  const [ address_tm, setAddres_tm ] = useState();
  const [ address_ru, setAddres_ru ] = useState();
  const [ address_en, setAddres_en ] = useState();
  const [ description_tm, setDescription_tm ] = useState();
  const [ description_ru, setDescription_ru ] = useState();
  const [ description_en, setDescription_en ] = useState();
  const [ startI,setStartI] = useState();
  const [ endI,setEndI ] = useState();
  const [ startII,setStartII] = useState();
  const [ endII,setEndII ] = useState();
  const [dastawkaPrice,setDastawkaPrice] = useState();
  const [is_cart,setIs_cart] = useState();
  const [ loading , setLoading ] = useState(false);
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    axiosInstance.delete("/api/welayat/delete/"+event).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
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
  const UpdateSurat = async(e)=>{
    setLoading(true);
    console.log("eee::",e,sur)

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });

      let newImg = {
            img_name:sur.name,
            img:await toBase64(sur)
          }
      axiosInstance.patch("/api/markets/update/"+e,{surat:newImg}).then((data)=>{
        console.log(data.data);
        let oldmarket = market;
        oldmarket.surat = data.data.name;
        setMarket(oldmarket);
        getData();
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
        message.warn("Internet baglanşygyňyzy barlaň!")
      })

  }
  const ImgChangeHandler = (e)=>{
    setSur(e.target.files[0]);
  }
  const ShowTelefon = (event) => {
    setTel(!tel);
    setPhone([]);
    if(event){console.log("tel:",event); setPhone(event)};
  };
  const AddPhone = (event)=>{
    setLoading(true);
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
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      setLoading(false);
      message.warn("Internet baglanşygyňyzy barlaň!")
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
  
  const saveData = (event) => {
    setLoading(true);
    console.log(event);
    // setData([...data, maglumat]);
    setEdit(false);

      axiosInstance.patch("/api/welayat/update/"+maglumat.id,{
        name_tm:maglumat.name_tm,
        name_ru:maglumat.name_ru,
        name_en:maglumat.name_en,
      }).then((data)=>{
        console.log(data.data);
        message.success(data.data.msg);
        getData();
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
        message.warn("Internet baglanşygyňyzy barlaň!")
      })
      
    
  };

  const IsCart = (value)=>{
    setIs_cart(value);
  }

  return (
    <div className="yolHatyTable">
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Goşmaça"
        placement="right"
        onClose={() => ShowModal()}
        visible={visible}
      >
        {maglumat && (
          <table style={{width:"100%"}} border="1" className="goshmacha--ul">
            <tr className="modalLi" key={maglumat && maglumat.id}>
              <td style={{height:"40px"}}>ID </td>
              <td>{maglumat && maglumat.id} </td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_tm}>
              <td style={{height:"40px"}}>Name_tm </td>
              {maglumat && maglumat.name_tm}
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_ru}>
              <td style={{height:"40px"}}>Name_ru </td>
              <td>{maglumat && maglumat.name_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_en}>
              <td style={{height:"40px"}}>Name_en </td>
              <td>{maglumat && maglumat.name_en}</td>
            </tr>
            
              {maglumat.MarketAddresses &&
                maglumat.MarketAddresses.map((address)=>{
                  return <React.Fragment>
                    <tr className="modalLi">
                      <td style={{height:"40px"}}>Address_tm </td>
                      <td>
                        {address.name_tm}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>Address_ru </td>
                      <td>
                        {address.name_ru}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>Address_en </td>
                      <td>
                        {address.name_en}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>Description_tm</td>
                      <td>
                        {address.description_tm}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>Description_ru</td>
                      <td>
                        {address.description_ru}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>Description_en</td>
                      <td>
                        {address.description_en}
                      </td>
                      </tr>
                      </React.Fragment>
                })
              }
              {maglumat.PhoneNumbers &&
                maglumat.PhoneNumbers.map((number,i)=>{
                  return <React.Fragment>
                    <tr className="modalLi">
                      <td style={{height:"40px"}}>Telefon No-{i+1} </td>
                      <td>
                        {number.phoneNumber}
                      </td>
                      </tr>
                      </React.Fragment>
                })
              }
             <tr className="modalLi">
                      <td style={{height:"40px"}}>Surat</td>
                      <td >
                       <img style={{width:"50px",height:"50px",objectFit:"contain"}} src ={BASE_URL +"/"+ maglumat.surat} alt="surat"/>
                      </td>
                      </tr>
            
          </table>
          
        )}
        
      </Drawer>
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div className="DrawerButtons" style={{width:"100%",display:"flex",justifyContent:"space-evenly"}}>
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
            style={{ marginRight: "20px" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name="name_tm"
            value={maglumat && maglumat.name_tm}
            onChange={inputChangeHandler}
          />
          <Input
            addonBefore="Name ru"
            className="suruji-uytget--input"
            name="name_ru"
            value={maglumat && maglumat.name_ru}
            onChange={inputChangeHandler}
          />
          <Input
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
        width={500}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowTelefon()}
        visible={tel}
        
      >
        {!loading ? <div className="yolHatyTable--uytgetmeler">
        <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between"}}>
           <Input
               addonBefore={`Telefon belgi`}
               className="suruji-uytget--input"
               style={{width:"80%"}}
               value={newPhone}
               onChange={(e)=>{setNewPhone(e.target.value)}}
             />
              <Button
              type="primary"
              shape="round"
              onClick={()=>AddPhone(phone.id)}
            >
              Gosh
            </Button>
            </div>
          
          { phone.PhoneNumbers &&
            phone.PhoneNumbers.map((number,i)=>{
             return <React.Fragment>
             <div>
               <p style={{width:"100%",display:"inline-flex",justifyContent:"space-around"}}>
                 {i+1+") "}{number.phoneNumber} <Popconfirm
            title="Siz çyndan öçürmek isleýärsiňizmi?"
            onConfirm={() => DeleteTel(number.id)}
            // onCancel={cancel}
            okText="Hawa"
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
          </Popconfirm> </p>
          
               </div>
              
             </React.Fragment>
         
            })
            
          }
          
        </div>
        :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
              }
      </Drawer>
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowSurat()}
        visible={img}
        
      >
        {!loading ?<div className="yolHatyTable--uytgetmeler">
        <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between"}}>
           <input
               className="suruji-uytget--input"
               style={{width:"80%"}}
               type="file"
               onChange={(e)=>ImgChangeHandler(e)}
             />
              <Button
              type="primary"
              shape="round"
              onClick={()=>UpdateSurat(market.id)}
            >
              Gosh
            </Button>
            </div>
         {market &&  <img src={BASE_URL+"/"+market.surat} alt="Market Surat" style={{width:"450px",height:"500px",objectFit:"contain"}} />}
          
        </div>
        :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
              }
      </Drawer>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default WelayatTable;
