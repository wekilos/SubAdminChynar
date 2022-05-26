import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  RiseOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HeartFilled,
  ScheduleOutlined,
  CarOutlined,
  ToolOutlined,
  FileTextOutlined,CalculatorOutlined,HomeOutlined,MediumOutlined,CopyrightOutlined,InboxOutlined
} from "@ant-design/icons";


import { useSizeComponents } from "./sizeComponent";
import { SebedimContext } from "../context/Sebedim";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderDemo =(props)=> {
  
  const { dil } = useContext(SebedimContext);
  const [width,height] = useSizeComponents();
  const  [collapsed,setCollapsed]= useState(false)
  

  

 const  toggle = () => {
  setCollapsed(!collapsed)
  };

 
    return (
      <div>
      
      <Sider
        style={{
          overflow: "auto",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        className="Sider"
        width={"100%"}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        
    
         <Menu
          mode="inline"
          defaultOpenKeys={["sub1"]}
          className="sidebar-left"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <DashboardOutlined />
                <span className="menuitem ">{dil==="TM"?"Zakazlar":"Заказы"}</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()} className="menuitem menuitem2" key="63">
              <Link to="canceledOrders">{dil==="TM"?"Täze Zakazlar":"Новые заказы"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="1">
              <Link to="orders">{dil==="TM"?"Zakazlar":"Заказы"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="2">
              <Link to="orderStatus">{dil==="TM"?"Zakazyň Statusy":"Статус заказа"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()} className="menuitem menuitem2" key="3">
              <Link to="archiveOrders">{dil==="TM"?"Gowşurlan Zakazlar":"Доставленные заказы"}  </Link>
            </Menu.Item>
            
          </SubMenu>

          <SubMenu
            key="sub8"
            title={
              <span className="menuitem">
                <MediumOutlined />
                <span>{dil==="TM"?"Marketler":"Mаркеты"}</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="17">
            <Link to="/markets">{dil==="TM"?"Marketler":"Mаркеты"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="18">
            <Link to="/marketCategory"> {dil==="TM"?"Kategoryalar":"Категории"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="1888">
            <Link to="/marketSubCategories"> {dil==="TM"?"SubKategoryalar":"Подкатегории"}</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub222"
            title={
              <span className="menuitem">
                <CopyrightOutlined />
                <span>{dil==="TM"?"Brendler":"Бренды"}</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="115">
            <Link to="/brendKategory">{dil==="TM"?"Brend Kategoriya":"Категория бренда"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="165">
            <Link to="brendler">{dil==="TM"?"Brendler":"Бренды"}</Link>
            </Menu.Item>
            
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span className="menuitem">
                <InboxOutlined />
                <span>{dil==="TM"?"Harytlar":"Товары"}</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="5">
            <Link to="products">{dil==="TM"?"Harytlar":"Товары"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="65">
            <Link to="hideProducts">{dil==="TM"?"Gizli Harytlar":"Скрытые товары"}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="4">
            <Link to="unit">{dil==="TM"?"Harytlaryň Uniti":"Товарное Унити"}</Link>
            </Menu.Item>            
          </SubMenu>

          {false && <SubMenu
            key="sub3"
            title={
              <span className="menuitem">
                {/* <CarOutlined /> */}
                <span>Sliderler</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="6">
              <Link to="/sliders" >Sliderler</Link>
            </Menu.Item>
            
          </SubMenu>}


          {false && <SubMenu
            key="sub9"
            title={
              <span className="menuitem">
               {/* <HomeOutlined /> */}
                <span>Config</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="19">
            <Link to="posts">Posts</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="20">
            <Link to="config">Config</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="21">
            <Link to="/notifications">Notification</Link>
            </Menu.Item>
          </SubMenu>}

         

        {false && <SubMenu
          key="sub7"
          title={
            <span>
              <SettingOutlined />
              <span className="menuitem">Sazlamalar</span>
            </span>
          }
        >
          
          <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="13">
            <Link to="/users">Users</Link>
          </Menu.Item>
          
        </SubMenu>}
        </Menu>
        

       <div className="admin-footer">
          <center style={{ fontSize: 12, color: "#C0C0C0", fontWeight: 600 }}>
            Developed by:
            <br /> WB programmer team
          </center>
        </div>
      </Sider>
      </div>
    );
  
}

export default  SiderDemo;