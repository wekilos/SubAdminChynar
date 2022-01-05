import React,{useEffect, useState} from "react";
import "./header.css";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover, message } from "antd";

import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../utils/index";
import { axiosInstance } from "../utils/axiosIntance";
const { Search } = Input;
const content = (
  <div>
    <p>Notification 1</p>
    <p>Notification 2</p>
  </div>
);
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

  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [newOrder,setNewOrder] = useState();

  useEffect(()=>{
    const time = setTimeout(() => {
        getOrders();
      }, 1000*60*5);
    return ()=> clearTimeout(time);
},[bool]);

// ,{
//     params: {
//       all: all,
//       statusId:statusId
//     }
//   }

const getOrders = ()=>{
    axiosInstance.get("/api/orders/new").then((data)=>{
        console.log(data.data.length);
        localStorage.setItem("taze",data.data.length);
        let gorulenler = localStorage.getItem("gorulenler");
        if(data.data.length-gorulenler>0){
          message.success(`${data.data.length-gorulenler} sany taze sargyt bar!`)
        }
        setBool(!bool);
    }).catch((err)=>{
        console.log(err);
    })
}

useEffect(()=>{
  const time = setTimeout(() => {
    BatchNumber();
    }, 1000);
  return ()=> clearTimeout(time);
},[bool2]);

const BatchNumber = ()=>{
        let tazesi = localStorage.getItem("taze")
        let gorulenler = localStorage.getItem("gorulenler");
        if(tazesi-gorulenler>0){
          setNewOrder(tazesi-gorulenler);
        }
        
        setBool2(!bool2);
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
        <div className="App-title">
          Cynar Market
        </div>
        <div className="profile">
          <Dropdown overlay={profile_menu}>
            <div
              className="ant-dropdown-link"
              onClick={logout}
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
      </Header>
    );
  
}
export default  Headers;