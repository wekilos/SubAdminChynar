import React,{useContext, useEffect, useState} from "react";
import "./header.css";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover, message, Select,Button, Drawer } from "antd";

import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../utils/index";
import { axiosInstance } from "../utils/axiosIntance";
import { Link, useHistory } from "react-router-dom";
import { SebedimContext } from "../context/Sebedim";

import { useSizeComponents } from "./sizeComponent";
import SiderDemo from "./sidebarMenu";

const { Search } = Input;

const { Header } = Layout;
const profile_menu = (
  <Menu>
    <Menu.Item>
      {/* <a target="_blank" rel="noopener noreferrer">
        <UserOutlined /> Profile
      </a> */}
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> Logout
      </a>
    </Menu.Item>
  </Menu>
);

 const  Headers =()=> {

  const [width,height] = useSizeComponents();
  const history = useHistory();
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false); 
  const [menu,setMenu] = useState(false);
  const { ChangeDil, dil ,newOrder} = useContext(SebedimContext)
  const [baydak,setBaydak] = useState(dil=="TM"?"🇹🇲":"🇷🇺");
   

useEffect(()=>{
  console.log("width",width)
},[width])

const content = (
  <div>
    <Link to="/canceledOrders"  style={{cursor:"pointer"}}>{dil==="TM"?"Täze Zakazlar":"Новые заказы"}</Link>
  </div>
);

const profile_menu = (
  <Menu>
    <Menu.Item>
      {/* <a target="_blank" rel="noopener noreferrer">
        <UserOutlined /> Profile
      </a> */}
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> {dil==="TM"?"Logout":"Выйти"}
      </a>
    </Menu.Item>
  </Menu>
);

// ,{
//     params: {
//       all: all,
//       statusId:statusId
//     }
//   }



const LogOUT = ()=>{
  logout();
  history.push("/")
}

const handleLanguage = (value)=>{
  if(value==="🇷🇺"){
    ChangeDil("RU");
    setBaydak("🇷🇺");
  }else{
    setBaydak("🇹🇲");
    ChangeDil("TM");
  }
  // ChangeDil(value)
}
    return (
      <Header
        className="site-layout-background header"
        style={{ position: "fixed" }}
      >
        {/* <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          className="search"
        /> */}
       {width>850 && <div className="App-title">
          Cynar Market
        </div>}
        {
          width<850 && <div style={{marginLeft:"10px"}}>
            <Button onClick={()=>setMenu(true)}>Menu</Button>
          </div>
        }
        <div className="profile">
          <Dropdown overlay={profile_menu}>
            <div
              className="ant-dropdown-link"
              onClick={()=>LogOUT()}
            >
              <UserOutlined />
            </div>
          </Dropdown>
        </div>

        <div className="notify">
          <Popover
            placement="bottom"
            title="Notification"
            content={content}
            trigger="click"
          >
            <Badge count={newOrder}>
              <BellOutlined style={{ fontSize: 22 }} />
            </Badge>
          </Popover>
        </div>
        <div className="notify2">
          <Select 
            defaultValue={baydak} 
            // value={baydak}
            onChange={handleLanguage}>
              <option value="🇹🇲" > 🇹🇲 </option>

              <option value="🇷🇺" > 🇷🇺 </option>
          </Select>
        </div>
        <div className="headerDrawer">
        <Drawer
          width={320}
          className='lukman-table--drawer'
          title="Menu"
          placement="left"
          onClose={()=>setMenu(false)}
          visible={menu}

        >
          <SiderDemo close={()=>setMenu(false)}/>
        </Drawer>
        </div>
      </Header>
    );
  
}
export default  Headers;