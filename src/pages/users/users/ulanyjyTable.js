import React,{useState,useEffect} from 'react';
import {Table,Button,Space,Modal,Input, Drawer,Tabs,Select, message ,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './ulanyjyTable.css';
import { axiosInstance } from '../../../utils/axiosIntance';

const { TabPane } =Tabs;
const {Option}=Select;
const UlanyjyTable = (props)=>{
    const [data,setData]=props.data;
    const [select,setSelect]=useState(null);
    const [loading, setLoading] = useState(false);
    const userTypes=props.userTypes;
    const GetData=props.GetData;


    const Cancel=()=>{
    }
    const Confirm=(record)=>{
      DeleteUser(record);
    }

    const columns = [
      {
        title:"Ulanyjy Id",
        dataIndex:"id",
     },
        {
           title:"Ady ",
           dataIndex:"fname",
        },
        {
          title:"Familýasy",
          dataIndex:"lastname",
       },
        {
            title:"Telofon belgi",
            dataIndex:"phoneNumber",
        },
        {
            title:"Ulanyjy Görnüş",
            dataIndex:"createdAt",
            render:(text,record)=>(
              <Space>
                {record.UserType && record.UserType.type_tm}
                {/* {JSON.stringify(record.createdAt).substr(1,10)+" ("+JSON.stringify(record.createdAt).substr(12,8)+")"} */}
              </Space>
            )
            
        },
        {
          title:"Ulanyjy Salgy",
          render:(text,record)=>(
            <Space>
              {record.Addresses.map((addres)=>{
                return <p>{addres.rec_address}</p>
              })}
              {/* {JSON.stringify(record.createdAt).substr(1,10)+" ("+JSON.stringify(record.createdAt).substr(12,8)+")"} */}
            </Space>
          )
          
      },
        {
            title:"Goşmaça maglumat we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowModal2(record)} ><EditOutlined /></Button>
                    <Popconfirm 
                    title="Çyndan öçürmek isleýärsiňmi?"
                    onConfirm={()=>Confirm(record)}
                    onCancel={()=>Cancel()}
                    >
                    <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>
                    </Popconfirm>
                  
                </Space>
              ),
        }
    ];
    const [visible,setVisible]=useState(false);
    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    console.log("maglumat",maglumat);
    const [password2,setPasword2]=useState();
    const [password1,setPasword1]=useState();

    const DeleteUser = (event)=>{
     axiosInstance.delete("/api/user/delete/"+event.id).then((data)=>{
       console.log(data.data)
       message.success(data.data.msg);
       GetData();
     }).catch((err)=>{
       console.log(err);
     })
  }
  const ShowModal = (event)=>{
    setVisible(true);
    // console.log( "goshmaça:",event.user_type.type);
    setMaglumat(event);
}
const ShowModalClose=(event)=>{
  setVisible(false);
 setMaglumat([]);
}
const ShowModal2 =(event)=>{
    setEdit(true);
    // console.log(event);
    setMaglumat(event);
    setPasword1(null);
    setPasword2(null);
    
  }
  const ShowModal2Close=(even)=>{
    setEdit(false);
     setMaglumat([]);
  }
  const inputChangeHandler=(event)=>{
    // console.log(event.target.name);
    let name=event.target.name;
    let value=event.target.value;
  
    setMaglumat({
        ...maglumat,
        [name]:value
    })            
  };
  const onSubmit=(event)=>{
    setLoading(true);
    event.preventDefault();
    console.log("ulanujy uytget:",event.target);
    let fname=event.target.fname.value;
    let password=event.target.password.value;
    let password2=event.target.password2.value;
    let lastname=event.target.lastname.value;
    let id=event.target.fname.id;
if(password===password2){

    axiosInstance.post("/api/user/update/"+id,{
        
            fname:fname,
            lastname:lastname,
            password:password,
            typeID:select
        
    }).then((data)=>{
        message.success(data.data.msg);
        GetData();
        setLoading(false);
    }).catch((err)=>{
        console.log(err);
        setLoading(false);
        message.warn("Internet baglanşygyňyzy barlaň!")
    });
    ShowModal2Close()
    console.log("data",data);
}else{
    message.error("Password dogry girizmeli!");
}
  }
  

    return(
        <div className='ulanyjyTable'>
            <Drawer
                width={400}
                className='ulanyjylar-table--drawer'
                title="Goşmaça Maglumat"
                placement="right"
                onClose={()=>ShowModalClose()}
                visible={visible}>
            {maglumat.user_type &&
              <ul className="Goshmacha--ul">
                <li className='modalLi'  key={maglumat.name+"1"}><b>Ady: </b>{maglumat.name}</li>
                <li className='modalLi'  key={maglumat.login}><b>Ulanyjy Ady: </b>{maglumat.login}</li>
                <li className='modalLi'  key={maglumat.password}><b>Ulanyjy Görnüş: </b>{ maglumat.user_type.type}</li>
                <li className='modalLi'  key={maglumat.createdAt}><b>Doredilen wagty: <br></br></b>{JSON.stringify(maglumat.createdAt).substr(1,10)+" ("+JSON.stringify(maglumat.createdAt).substr(12,8)+")"}</li>
                <li className='modalLi'  key={maglumat.createdAt}><b>Üýtgedilen wagty: <br></br></b>{JSON.stringify(maglumat.createdAt).substr(1,10)+" ("+JSON.stringify(maglumat.createdAt).substr(12,8)+")"}</li>
              </ul>
            }
          </Drawer>
          <Drawer
                width={400}
                className='ulanyjylar-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowModal2Close()}
                visible={edit}>
                  {(maglumat && !loading) ? <form className='ulanyjylar--form' onSubmit={onSubmit}>
                          <Input addonBefore="Ady:" name='fname' id={maglumat.id} className='ulanyjy-uytget--input' value={maglumat.fname}  onChange={inputChangeHandler}/>
                          <Input addonBefore='Familýasy:' id="lastname" className='ulanyjy-uytget--input' name='lastname' value={maglumat.lastname} onChange={inputChangeHandler}  />
                          <Input addonBefore="Password" id="password" className='ulanyjy-uytget--input'name='password' value={password1} onChange={(e)=>setPasword1(e.target.value)} />
                          <Input addonBefore="Password" id="password2" className='ulanyjy-uytget--input'name='password2' value={password2} onChange={(e)=>setPasword2(e.target.value)} />
                          <Select
                            placeholder='Status Saýlaň!'
                            showSearch
                            label="Status" onChange={(e)=>{setSelect(e)}}
                            name='typeID'  className='ulanyjylar-gosh--input' id="typeID" value={maglumat.UserTypeId}
                            >
                               {
                                  userTypes.map((userType)=>{
                                      return(
                                      <Option value={userType.id} >{userType.type_tm}</Option>
                                      )
                                      })
                                }

                            </Select>
                            <div className='ulanyjylar-table--buttons'>
                              <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='ulanyjylar-table--button'>Üýget</Button>
                              <Button onClick={ShowModal2Close} shape='round' danger type='primary' className='ulanyjylar-table--button'>Cancel</Button>
                            </div>
                            </form>
                            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
                          
                    }
               </Drawer>
            <Table columns={columns} dataSource={data} />
        
        </div>
    );
};

export default UlanyjyTable;