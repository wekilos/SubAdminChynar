import React, { useEffect, useState } from "react";
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

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderDemo =(props)=> {
  
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
                <span className="menuitem ">Zakazlar</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()} className="menuitem menuitem2" key="63">
              <Link to="canceledOrders">Täze Zakazlar</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="1">
              <Link to="orders">Zakazlar</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="2">
              <Link to="orderStatus">Zakazyň Statusy</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()} className="menuitem menuitem2" key="3">
              <Link to="archiveOrders">Gowşurlan Zakazlar</Link>
            </Menu.Item>
            
          </SubMenu>

          <SubMenu
            key="sub8"
            title={
              <span className="menuitem">
                <MediumOutlined />
                <span>Marketler</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="17">
            <Link to="/markets">Marketler</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="18">
            <Link to="/marketCategory"> Kategoryalar</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="1888">
            <Link to="/marketSubCategories"> SubKategoryalar</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub222"
            title={
              <span className="menuitem">
                <CopyrightOutlined />
                <span>Brendler</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="115">
            <Link to="brendKategory">Brend Kategoriya</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="165">
            <Link to="brendler">Brendler</Link>
            </Menu.Item>
            
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span className="menuitem">
                <InboxOutlined />
                <span>Harytlar</span>
              </span>
            }
          >
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="5">
            <Link to="products">Harytlar</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="65">
            <Link to="hideProducts">Gizli Harytlar</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>props.close()}  className="menuitem menuitem2" key="4">
            <Link to="unit">Harytlaryň Uniti</Link>
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