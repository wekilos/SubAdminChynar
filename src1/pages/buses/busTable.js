import React, { useState } from "react";
import { Table, Button, Space, Modal, Input, Drawer } from "antd";
import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";

import "./busTable.css";

const BusTable = (props) => {
  const [data, setData] = props.data;
  const columns = [
    {
      title: "Döwlet No",
      dataIndex: "number",
    },
    {
      title: "Ugur No",
      dataIndex: "ugurNo",
      render:(text,record)=>(
        <div>
          { record.BusNumber && record.BusNumber.no }
        </div>
      )
    },
    {
      title: "Ugur Ady",
      dataIndex: "departure",
      render:(text,record)=>(
        <div>
          {record.BusNumber && record.BusNumber.departure+"-"+record.BusNumber.arrival}
        </div>
      )
    },
    {
      title: "Model",
      dataIndex: "type",
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
            onClick={() => ShowModal2(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            danger
            onClick={() => DeleteUser(record.surujiNo)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const DeleteUser = (event) => {
    console.log(event);
  };
  const ShowModal = (event) => {
    console.log("goshmacha maglumat",event)
    setVisible(!visible);
    setMaglumat(event);
  };
  const ShowModalClose=()=>{
    setVisible(false);
    setMaglumat([]);
  }
  const ShowModal2 = (event) => {
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
    setData([...data, maglumat]);
    setEdit(false);
  };


  const OnEdit = (event)=>{
    event.preventDefault()
  }

  return (
    <div className="busTable">
      <Drawer
        width={400}
        className="bus-table--drawer"
        title="Goşmaça Maglumat"
        placement="right"
        onClose={() => ShowModalClose()}
        visible={visible}
      >
        {maglumat && (
          <table border="1" className="Goshmacha--ul">
            <tr className="modalLi" key={maglumat && maglumat.number}>
              <td>Döwlet No </td>
              <td>{maglumat && maglumat.number}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.type}>
              <td>Kysmy </td>
              <td>{maglumat && maglumat.type}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.year}>
              <td>Ýyly </td>
              <td>{maglumat && maglumat.year}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.BusNumber.no}>
              <td>Ugur No </td>
              <td>{maglumat && maglumat.BusNumber.no}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.BusNumber.departure}>
              <td>Ugur Ady </td>
              <td>{maglumat && maglumat.BusNumber.departure+"-"+maglumat.BusNumber.arrival}</td>
            </tr>
            
          </table>
        )}
      </Drawer>
      <Drawer
        width={400}
        className="bus-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowModal2()}
        visible={edit}
        
      >
        {maglumat && (
          <form onSubmit={OnEdit}>
          <div>
            <Input
              addonBefore="DowletNo"
              name="dowletNo"
              className="bus-uytget--input"
              value={maglumat.number}
              onChange={inputChangeHandler}
            />
            <Input
              addonBefore="Kysmy"
              className="bus-uytget--input"
              name="kysmy"
              value={maglumat.type}
              onChange={inputChangeHandler}
            />
            <Input
              addonBefore="Ýyly"
              className="bus-uytget--input"
              name="yyly"
              value={maglumat.year}
              onChange={inputChangeHandler}
            />
            <Input
              addonBefore="UgurNo"
              className="bus-uytget--input"
              name="ugurNo"
              value={maglumat.BusNumber.no}
              onChange={inputChangeHandler}
            />
            <Input
              addonBefore="UgurAdy"
              className="bus-uytget--input"
              name="ugurAdy"
              value={maglumat.BusNumber.departure+"-"+maglumat.BusNumber.arrival}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="bus-table--buttons">
          <Button
            icon={<PlusCircleFilled />}
            shape="round"
            type="primary"
            htmlType="submit"
            className="bus-table--button"
          >
            Hasaba al
          </Button>
          <Button
            onClick={ShowModal2}
            shape="round"
            danger
            type="primary"
            className="bus-table--button"
          >
            Cancel
          </Button>
        </div>
        </form>
        )}
      </Drawer>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BusTable;
