import React from "react";

import { Input, Button, Tabs } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import Ugrat from "./ugrat";
import KabulEt from "./kabulEt";
import Yolda from "./yolda";

import "./mehanik.css";
const { TabPane } = Tabs;
const Mehanik = (props) => {
  return (
    <div className="mehanik">
      <Tabs type="line">
        <TabPane tab="Awtobuslary ýola ugratmak" key="1">
          <Ugrat />
        </TabPane>
        <TabPane tab="Awtobuslary Kabul etmek" key="2">
          <KabulEt />
        </TabPane>
        <TabPane tab="Tehniki we başga sebäpler boýunça bökdenmegi" key="3">
          <Yolda />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Mehanik;
