import React from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import {
  PlusCircleFilled,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import "./kategoryGozle.css";

const WelayatGozle = (props) => {
  const GoshButton = props.GoshButton;
  let sany=false;
console.log(props.sany)
if(props.sany<=3){sany=true}else{sany=false}
  return (
    <div className="yolHaty-gozle">
      <form  className=" welayatGozleg">
        <div>
        <h2 >Admin Welayatlar page</h2>
          {/* <Input
            className="yolHaty-gozle--input"
            placeholder="Id No"
            addonAfter={<SearchOutlined />}
          />
          <Input
            className="yolHaty-gozle--input"
            placeholder="Umumy Gözleg"
            addonAfter={<SearchOutlined />}
          /> */}
        </div>
        <div>
          {true && <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            Welayat Döret
          </Button>}
        </div>
      </form>
    </div>
  );
};

export default WelayatGozle;
