import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Space, Select, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import { useSizeComponents } from "../../components/sizeComponent";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";
import { SebedimContext } from "../../context/Sebedim";
const {Option} = Select;

const YolHatyTable = (props) => {
  
  const [width,height] = useSizeComponents();
  const {dil} = useContext(SebedimContext);
// geting all data from database with api
  const [data, setData] = props.data;
  const getData = props.getData;

  const columns = width>850?[
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: dil==="TM"?"Market Ady":"Название Маркет",
      dataIndex: dil==="TM"?"name_tm":"name_ru",
    },
    {
      title: dil==="TM"?"Address":"Адрес",
      dataIndex: dil==="TM"?"address_tm":"address_ru",
      render:(text,record)=>(
        <Space>
          {record.MarketAddresses && record.MarketAddresses.map(address=>{
            return <div><h4>{dil==="TM"?address.name_tm:address.name_ru}</h4>
            </div>
          }) }
        </Space>
      )
    },
    {
      title: dil==="TM"?"Telefon No ":"Телефонный номер",
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
      title: dil==="TM"?"Market Surat":"Изображение маркета",
      dataIndex: "surat",
      render:(text,record)=>(
        <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Market Surat" />
      )
    },
    {
      title: dil==="TM"?"Goşmaça maglumat we Özgertmek":"Дополнительная информация и редактирование",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            {dil==="TM"?"Goşmaça":"Дополнительная"}
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
            onClick={() => ShowSurat(record)}
          >
             {dil==="TM"?'Surat':"Картина"} 
          </Button>
            <Popconfirm
            title={dil==="TM"?"Siz çyndan öçürmek isleýärsiňizmi?":"Вы действительно хотите удалить?"}
            onConfirm={() => DeleteMarket(record.id)}
            // onCancel={cancel}
            okText={dil==="TM"?"Hawa":"Да"}
            cancelText={dil==="TM"?"Ýok":"Нет"}
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
    {
      title: dil==="TM"?"Market Ady":"Имя/ Маркет",
      dataIndex: dil==="TM"?"name_tm":"name_ru",
    },
    {
      title: dil==="TM"?"Market Surat":"маркета",
      dataIndex: "surat",
      render:(text,record)=>(
        <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Market Surat" />
      )
    },
    {
      title: dil==="TM"?"Goşmaça maglumat we Özgertmek":"информация",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <div>
          <Button
            style={{width:"100px",marginBottom:"5px",padding:"0"}}
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            {dil==="TM"?"Goşmaça":"Дополнительная"}
          </Button><br></br>
          
          <Button
            style={{width:"100px",marginBottom:"5px"}}
            type="primary"
            shape="round"
            onClick={() => ShowSurat(record)}
          >
             {dil==="TM"?'Surat':"Картина"} 
          </Button><br></br>
          <Button
            style={{marginRight:"3px"}}
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
            <Popconfirm
            title={dil==="TM"?"Siz çyndan öçürmek isleýärsiňizmi?":"Вы действительно хотите удалить?"}
            onConfirm={() => DeleteMarket(record.id)}
            // onCancel={cancel}
            okText={dil==="TM"?"Hawa":"Да"}
            cancelText={dil==="TM"?"Ýok":"Нет"}
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
         
        </div>
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
  const [currency_exchange,setCurrency_exchange] = useState();
  const [ loading , setLoading ] = useState(false);
  const [cashBack, setCashBack] = useState(false);
  const [cashBackPrasent,setCashBackPrasent] = useState(null)
  const [telefon,setTelefon] = useState();
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
    sur && setLoading(true);
    !sur && message.warn(dil==="TM"?"Surat sayla!":" Выберите картинку!")
    console.log("eee::",e,sur)

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });

      let newImg = sur && {
            img_name:sur.name,
            img:await toBase64(sur)
          }
     sur && axiosInstance.patch("/api/markets/update/"+e,{surat:newImg}).then((data)=>{
        console.log(data.data);
        let oldmarket = market;
        oldmarket.surat = data.data.name;
        setMarket(oldmarket);
        getData();
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
        message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
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
      message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
    })
  }
  const ShowModal = (event) => {
    setVisible(!visible);
    console.log("goshmacha",event);
    setMaglumat([]);
    setMaglumat(event);
    setCashBack(event?.cashBack);
    setTelefon(event?.tel);
  };
  const ShowDrawer = (event) => {
    setEdit(!edit);
    setVisible(false);
    console.log("market",event);
    setMaglumat([]);
    setMaglumat(event);
    if(event){
    setAddres_tm(event.addres_tm);
    setAddres_ru(event.addres_ru);
    setAddres_en(event.addres_en);
    setDescription_tm(event.description_tm);
    setDescription_ru(event.description_ru);
    setDescription_en(event.description_en);
    setStartI(event.dastawkaStartI);
    setEndI(event.dastawkaEndI);
    setStartII(event.dastawkaStartII);
    setEndII(event.dastawkaEndII);
    setDastawkaPrice(event.dastawkaPrice);
    setIs_cart(event.is_cart);
    setCurrency_exchange(event.currency_exchange);
    setCashBackPrasent(event.cashBackPrasent)
    setTelefon(event?.tel);
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
      currency_exchange:currency_exchange,
      cashBack:cashBack,
      cashBackPrasent:cashBackPrasent,
      description_tm:description_tm,
      description_ru:description_ru,
      description_en:description_en
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
        message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
      })
      
    }).catch((err)=>{
      console.log(err);
    })
  };

  const IsCart = (value)=>{
    setIs_cart(value);
  }

  const Cashback = (value)=>{
    setCashBack(value);
  }

  return (
    <div className="yolHatyTable">
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title={dil==="TM"?"Goşmaça maglumat":"Дополнительная информация"}
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
              <td style={{height:"40px"}}>{dil==="TM"?"Ady tm":"Название тм"} </td>
              {maglumat && maglumat.name_tm}
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_ru}>
              <td style={{height:"40px"}}>{dil==="TM"?"Ady ru":"Название ru"} </td>
              <td>{maglumat && maglumat.name_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_en}>
              <td style={{height:"40px"}}>{dil==="TM"?"Ady en":"Название en"} </td>
              <td>{maglumat && maglumat.name_en}</td>
            </tr>

            <tr className="modalLi" key={maglumat && maglumat.dastawkaStartI}>
              <td style={{height:"40px"}}>{dil==="TM"?"dostawka I":"доставка I"} </td>
              <td>{maglumat && maglumat.dastawkaStartI && maglumat.dastawkaStartI.slice(0,5)}-{maglumat && maglumat.dastawkaEndI && maglumat.dastawkaEndI.slice(0,5)}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.dastawkaStartII}>
              <td style={{height:"40px"}}>{dil==="TM"?"dostawka II":"доставка II"} </td>
              <td>{maglumat && maglumat.dastawkaStartII && maglumat.dastawkaStartII.slice(0,5)}-{maglumat && maglumat.dastawkaEndII && maglumat.dastawkaEndII.slice(0,5)}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.dastawkaPrice}>
              <td style={{height:"40px"}}>{dil==="TM"?"dostawka baha":"цена доставки"} </td>
              <td>{maglumat && maglumat.dastawkaPrice}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.currency_exchange}>
              <td style={{height:"40px"}}>{dil==="TM"?"Walyuta baha":"Цены на валюту"} </td>
              <td> <b> {maglumat && maglumat.currency_exchange} </b> </td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.is_cart}>
              <td style={{height:"40px"}}>{dil==="TM"?"Kartdan Sowda etyarmi?":"Вы продаете по карте?"} </td>
              <td>{maglumat && maglumat.is_cart===true?"Howa":"Yok"}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.cashBackPrasent}>
              <td style={{height:"40px"}}>{dil==="TM"?"Market CashBack söwda edýärmi?":"Есть ли в вашем маркете система кэшбэка?"} </td>
              <td>{maglumat && maglumat.cashBack===true?"Howa ":"Yok " + (maglumat.cashBack? maglumat?.cashBackPrasent+"%":"")}</td>
            </tr>

              {maglumat.MarketAddresses &&
                maglumat.MarketAddresses.map((address)=>{
                  return <React.Fragment>
                    <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Address tm":"Адрес тм"} </td>
                      <td>
                        {address.name_tm}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Address ru":"Адрес ru"} </td>
                      <td>
                        {address.name_ru}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Address en":"Адрес en"} </td>
                      <td>
                        {address.name_en}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Description tm":"Описание тм"}</td>
                      <td>
                        {address.description_tm}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Description ru":"Описание ru"}</td>
                      <td>
                        {address.description_ru}
                      </td>
                      </tr>
                      <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Description en":"Описание en"}</td>
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
                      <td style={{height:"40px"}}>{dil==="TM"?"Telefon":"Телефонный"} No-{i+1} </td>
                      <td>
                        {number.phoneNumber}
                      </td>
                      </tr>
                      </React.Fragment>
                })
              }
             <tr className="modalLi">
                      <td style={{height:"40px"}}>{dil==="TM"?"Surat":"Картина"}</td>
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
        title={dil==="TM"?"Üýtgetmeler":"Изменения"}
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
              {dil==="TM"?"Goý bolsun":"Отмена"}
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              {dil==="TM"?"Üýtget":"Редактировать"} <EditOutlined />
            </Button>
          </div>
        }
      >
       {!loading ? <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ marginRight: "20px" }}
            addonBefore={dil=="TM"?"Name tm":"Название тм"}
            className="suruji-uytget--input"
            type="text"
            name="name_tm"
            value={maglumat && maglumat.name_tm}
            onChange={inputChangeHandler}
          />
          <Input
            addonBefore={dil=="TM"?"Name ru":"Название ru"}
            className="suruji-uytget--input"
            name="name_ru"
            value={maglumat && maglumat.name_ru}
            onChange={inputChangeHandler}
          />
          <Input
            addonBefore={dil=="TM"?"Name en":"Название en"}
            className="suruji-uytget--input"
            name="name_en"
            value={maglumat && maglumat.name_en}
            onChange={inputChangeHandler}
          />
          <Input
            addonBefore={dil==="TM"?"Address tm":"Адрес тм"}
            className="suruji-uytget--input"
            name="address_tm"
            value={address_tm}
            onChange={(e)=>setAddres_tm(e.target.value)}
          />
          <Input
            addonBefore={dil==="TM"?"Address ru":"Адрес ru"}
            name="address_ru"
            className="suruji-uytget--input"
            value={address_ru}
            onChange={(e)=>setAddres_ru(e.target.value)}
          />
          <Input
            addonBefore={dil==="TM"?"Address en":"Адрес en"}
            name="address_en"
            className="suruji-uytget--input"
            value={address_en}
            onChange={(e)=>setAddres_en(e.target.value)}
          />
         
          <Input
            addonBefore={dil==="TM"?"Description tm":"Описание тм"}
            name="description_tm"
            className="suruji-uytget--input"
            value={description_tm}
            onChange={(e)=>setDescription_tm(e.target.value)}
          />
          <Input
            addonBefore={dil==="TM"?"Description ru":"Описание ru"}
            name="description_ru"
            className="suruji-uytget--input"
            value={description_ru}
            onChange={(e)=>setDescription_ru(e.target.value)}
          />
          
          <Input
            addonBefore={dil==="TM"?"Description en":"Описание en"}
            name="description_en"
            className="suruji-uytget--input"
            value={description_en}
            onChange={(e)=>setDescription_en(e.target.value)}
          />
          <Input
            addonBefore={dil==="TM"?"Telefon":"Телефон"}
            name="description_ru"
            className="suruji-uytget--input"
            value={telefon}
            onChange={(e)=>setTelefon(e.target.value)}
          />
              <Input
                addonBefore={dil==="TM"?"I bashlayan":"I Начало"}
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={startI}
                onChange={(e)=>setStartI(e.target.value)}
              />
              <Input
                addonBefore={dil==="TM"?"I gutaryan":"I заканчивать"}
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={endI}
                onChange={(e)=>setEndI(e.target.value)}
              />
              <Input
                addonBefore={dil==="TM"?"II bashlayan":"II Начало"}
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={startII}
                onChange={(e)=>setStartII(e.target.value)}
              />
              <Input
                addonBefore={dil==="TM"?"II gutaryan":"II заканчивать"}
                type="time"
                name="Istart"
                style={{width:"50%"}}
                className="suruji-uytget--input"
                value={endII}
                onChange={(e)=>setEndII(e.target.value)}
              />
            <Input
            addonBefore={dil==="TM"?"Dostawka baha":"цена доставки"}
            name="description_en"
            className="suruji-uytget--input"
            value={dastawkaPrice}
            onChange={(e)=>setDastawkaPrice(e.target.value)}
          />
          <Input
              style={{marginTop:"5px"}}
                addonBefore={dil==="TM"?"Walyuta baha":"Цены на валюту"}
                name="description_en"
                className="suruji-uytget--input"
                value={currency_exchange}
                onChange={(e)=>setCurrency_exchange(e.target.value)}
              />
          <Select
          style={{width:"100%"}}
          placeholder={dil==="TM"?"Market kartdan söwda edýärmi?":"Вы продаете по карте?"}
          onChange={IsCart}>
            <Option value={true}>Howa</Option>
            <Option value={false}>Ýok</Option>
          </Select>
          <Select
          style={{width:"100%"}}
          placeholder={dil==="TM"?"Market CashBack söwda edýärmi?":"Есть ли в вашем маркете система кэшбэка?"}
          onChange={Cashback}>
            <Option value={true}>Howa</Option>
            <Option value={false}>Ýok</Option>
          </Select>
          <Input
              style={{marginTop:"5px"}}
                addonBefore={dil==="TM"?"CashBack Prasent":"процент CashBack"}
                name="CashBack Prasent"
                className="suruji-uytget--input"
                value={cashBackPrasent}
                onChange={(e)=>setCashBackPrasent(e.target.value)}
              />
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
        title={dil==="TM"?"Üýtgetmeler":"Изменения"}
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
              {dil==="TM"?"Gosh":"Добавлять"}
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
