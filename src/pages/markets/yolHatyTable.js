import React, { useState, useEffect } from "react";
import { Table, Button, Space, Select, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";
const {Option} = Select;

const YolHatyTable = (props) => {
  
// geting all data from database with api
  const [data, setData] = props.data;
  const getData = props.getData;

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Market Ady",
      dataIndex: "name_tm",
    },
    {
      title: "Address",
      dataIndex: "address_tm",
      render:(text,record)=>(
        <Space>
          {record.MarketAddresses && record.MarketAddresses.map(address=>{
            return <div><h4>{address.name_tm}</h4>
            </div>
          }) }
        </Space>
      )
    },
    {
      title: "Telefon No ",
      dataIndex: "phoneNumber",
      render:(text,record)=>(
        <Space>
          {record.PhoneNumbers && record.PhoneNumbers.map(number=>{
            return <div><h4>{number.phoneNumber}</h4>
            </div>
          }) }
        </Space>
      )
    },
    {
      title: "Market Surat",
      dataIndex: "surat",
      render:(text,record)=>(
        <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Market Surat" />
      )
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            Goşmaça
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowTelefon(record)}
          >
             Telefon 
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowSurat(record)}
          >
             Surat 
          </Button>
            {/* <Popconfirm
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
          </Popconfirm> */}
         
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
    axiosInstance.delete("/api/market/delete/"+event).then((data)=>{
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
    if(event && event.MarketAddresses[0]){
    setAddres_tm(event.MarketAddresses[0].name_tm);
    setAddres_ru(event.MarketAddresses[0].name_ru);
    setAddres_en(event.MarketAddresses[0].name_en);
    setDescription_tm(event.MarketAddresses[0].description_tm);
    setDescription_ru(event.MarketAddresses[0].description_ru);
    setDescription_en(event.MarketAddresses[0].description_en);
    setStartI(event.MarketAddresses[0].dastawkaStartI);
    setEndI(event.MarketAddresses[0].dastawkaEndI);
    setStartII(event.MarketAddresses[0].dastawkaStartII);
    setEndII(event.MarketAddresses[0].dastawkaEndII);
    setDastawkaPrice(event.MarketAddresses[0].dastawkaPrice);
    setIs_cart(event.MarketAddresses[0].is_cart);
    }
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
    let address_id = event.MarketAddresses[0].id;
    // setData([...data, maglumat]);
    setEdit(false);
    axiosInstance.patch("/api/market/update/"+event.id,{
      name_tm:maglumat.name_tm,
      name_ru:maglumat.name_ru,
      name_en:maglumat.name_en,
      dastawkaStartI:startI,
      dastawkaEndI:endI,
      dastawkaStartII:startII,
      dastawkaEndII:endII,
      dastawkaPrice:dastawkaPrice,
      is_cart:is_cart,
    }).then((data)=>{
      console.log(data.data);
      
      console.log("market AddresssID",address_id);
      axiosInstance.patch("/api/market/address/update/"+address_id,{
        name_tm:address_tm,
        name_ru:address_ru,
        name_en:address_en,
        description_tm:description_tm,
        description_ru:description_ru,
        description_en:description_en
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
      
    }).catch((err)=>{
      console.log(err);
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

            <tr className="modalLi" key={maglumat && maglumat.dastawkaStartI}>
              <td style={{height:"40px"}}>dastawka I </td>
              <td>{maglumat && maglumat.dastawkaStartI && maglumat.dastawkaStartI.slice(0,5)}-{maglumat && maglumat.dastawkaEndI && maglumat.dastawkaEndI.slice(0,5)}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.dastawkaStartII}>
              <td style={{height:"40px"}}>dastawka II </td>
              <td>{maglumat && maglumat.dastawkaStartII && maglumat.dastawkaStartII.slice(0,5)}-{maglumat && maglumat.dastawkaEndII && maglumat.dastawkaEndII.slice(0,5)}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.dastawkaPrice}>
              <td style={{height:"40px"}}>dastawka Baha </td>
              <td>{maglumat && maglumat.dastawkaPrice}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.is_cart}>
              <td style={{height:"40px"}}>Kartdan Sowda etyarmi? </td>
              <td>{maglumat && maglumat.is_cart===true?"Howa":"Yok"}</td>
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
          <Input
            addonBefore="Address tm"
            className="suruji-uytget--input"
            name="address_tm"
            value={address_tm}
            onChange={(e)=>setAddres_tm(e.target.value)}
          />
          <Input
            addonBefore="Address ru"
            name="address_ru"
            className="suruji-uytget--input"
            value={address_ru}
            onChange={(e)=>setAddres_ru(e.target.value)}
          />
          <Input
            addonBefore="Address en"
            name="address_en"
            className="suruji-uytget--input"
            value={address_en}
            onChange={(e)=>setAddres_en(e.target.value)}
          />
         
          <Input
            addonBefore="Description tm"
            name="description_tm"
            className="suruji-uytget--input"
            value={description_tm}
            onChange={(e)=>setDescription_tm(e.target.value)}
          />
          <Input
            addonBefore="Description ru "
            name="description_ru"
            className="suruji-uytget--input"
            value={description_ru}
            onChange={(e)=>setDescription_ru(e.target.value)}
          />
          <Input
            addonBefore="Description en"
            name="description_en"
            className="suruji-uytget--input"
            value={description_en}
            onChange={(e)=>setDescription_en(e.target.value)}
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
          {/* { maglumat.PhoneNumbers &&
            maglumat.PhoneNumbers.map((number,i)=>{
             return <Input
            addonBefore={`Telefon belgi-${i+1}`}
            name={`phoneNumber`}
            className="suruji-uytget--input"
            value={number && number.phoneNumber}
            onChange={inputChangeHandler}
          />
            })
            
          } */}
           
          {/* <Input
            addonBefore="Market Surat"
            name="surat"
            // type="file"
            className="suruji-uytget--input"
            value={maglumat && maglumat.surat}
            onChange={inputChangeHandler}
          />  */}
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

export default YolHatyTable;
