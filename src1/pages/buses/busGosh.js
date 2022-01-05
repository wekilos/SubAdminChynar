import React, { useState } from "react";

import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

import "./busGosh.css";

const BusGosh = (props) => {
  const [data, setData] = props.data;
  const [busGosh, setBusGosh] = useState([]);
  const onSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      busGosh,
    });
    setBusGosh([]);
    console.log("data", data);
  };
  const InputHandler = (event) => {
    console.log(event.target.value);
    setBusGosh({ ...busGosh, [event.target.name]: event.target.value });
    console.log(busGosh);
  };

  return (
    <div className="bus-gosh">
      <form className="bus--form" onSubmit={onSubmit}>
        <Input
          addonBefore="Dowlet No"
          value={busGosh.dowletNo}
          name="dowletNo"
          onChange={InputHandler}
          className="bus-gosh--input"
        />
        <Input
          addonBefore="Kysmy"
          value={busGosh.kysmy}
          name="kysmy"
          onChange={InputHandler}
          className="bus-gosh--input"
        />
        <Input
          addonBefore="Ýyly"
          value={busGosh.yyly}
          name="yyly"
          onChange={InputHandler}
          className="bus-gosh--input"
        />
        <Input
          addonBefore="Ugur No"
          value={busGosh.ugurNo}
          name="ugurNo"
          onChange={InputHandler}
          className="bus-gosh--input"
        />
        <Input
          addonBefore="Ugurdaky No"
          value={busGosh.ugurdakyNo}
          name="ugurdakyNo"
          onChange={InputHandler}
          className="bus-gosh--input"
        />
      </form>
    </div>
  );
};

export default BusGosh;
