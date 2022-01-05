import React,{useState,useEffect} from 'react';
import { Button,Input,Drawer,Select, message } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import UlanyjyGozle from './ulanyjyGozle';
import UlanyjyTable from './ulanyjyTable';

import UlanyjyGosh from './ulanyjyGosh';
import './ulanyjylar.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';

const Option = {Select};

const Ulanyjylar =(props)=>{
    const [Gosh,setGosh]=useState(false);

    const [ulanyjyGosh,setUlanyjyGosh]=useState([]);
    const [data,setData]=useState([]);
    const [userTypes,setUserTypes]=useState([]);
    const [select,setSelect]=useState(null);
    const [all,setAll]=useState(null);
    const [ulanyjyAdy,setUlanyjyAdy]=useState(null);

    // useEffect(()=>{
    //     GetData();
    //     GetTypes();
    // },[]);

    useEffect(()=>{
     const time= setTimeout(() => {
            
     GetDataWithFilter();
     GetTypes();

    }, 500);

    return ()=> clearTimeout(time);
        
       
    },[select,all])
    
    const GetDataWithFilter= async ()=>{
        await axiosInstance.get("/api/users",{
            params:{
                all:all,
                typeId:select
            }
        }).then((data)=>{
            let User = JSON.parse(localStorage.getItem("SubProfile"))
            let newData = data.data.filter(user=>{
                return user.id === User.id
            })
            setData(newData);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const GetTypes= async (event)=>{
        await axiosInstance.get("/api/user/type").then((data)=>{
            setUserTypes(data.data);
            console.log("user type",data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const GetData=()=>{
        axiosInstance.get("/api/users").then((data)=>{
            console.log("get.user_list:",data.data);
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    const GoshButtonClose=(event)=>{
        setGosh(false);
        console.log(event);
        setUlanyjyGosh([]);
    }
    const GoshButton = event=>{
        setGosh(true);
    }
    const InputHandler=(event)=>{
        console.log(event.target.value);
        setUlanyjyGosh(
            {   ...ulanyjyGosh,
                [event.target.name]:event.target.value
            }
        );
        console.log("typing:",ulanyjyGosh);
    }
    return(
        <div className='ulanyjylar'>
            {/* <div className='ulanyjylar--top'>
                <h2 className="ulanyjylar--header">Ulanyjylar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ulanyjylar--gosh'> Ulanyjy Goş </Button>
            </div> */}
            {/* {Gosh && <UlanyjyGosh data={[data,setData]} onClick={GoshButton} />} */}
            <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Ulanyjy Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButtonClose()}
                visible={Gosh}
            >
                     <UlanyjyGosh data={[data,setData]} onClick={GoshButtonClose} userTypes={userTypes} GetData={GetDataWithFilter} InputHandler={InputHandler} ulanyjyGosh={ulanyjyGosh} />

            </Drawer>
            <div className='ulanyjylar--gozleg'>
            <div className='ulanyjy-gozle'>
            <form className='ulanyjy-gozle--form'>
                <div>
                {/* <Input className='ulanyjy-gozle--input' addonBefore='Umumy' value={all} onChange={(e)=>setAll(e.target.value)}/> */}
                {/* <Select
                    placeholder='Status Saýlaň!'
                    showSearch
                 element='select'
                 label="Status"
                 defaultOption='Statusy saýlaň!' name='status'  className='ulanyjy-gozle--input' value={select} onChange={(e)=>{setSelect(e)}}
                >
                    <Option value={null}>Ählisi</Option>
                  {  userTypes.map((userType)=>{
                      return(
                          <Option value={userType.id}>{userType.type_tm}</Option>
                      )
                  })
                }

               </Select> */}
               </div>
               {/* <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ulanyjy-gozle--button'> Ulanyjy Goş </Button> */}
            </form>
        </div>
            </div>
            <div className='ulanyjylar-Table'>
                <UlanyjyTable data={[data,setData]} userTypes={userTypes} GetData={GetDataWithFilter}/>
            </div>

        </div>
    );
};

export default Ulanyjylar;