import React,{useState,useEffect} from 'react';
import { Input,Button,Select, message } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './ulanyjyGosh.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';

const UlanyjyGosh = (props)=>{
    const ulanyjyGosh=props.ulanyjyGosh;
    const Close=props.onClick;
    const [typeId ,setTypeId] = useState(null)
    const { Option } = Select;
    const [data,setData]=props.data;
    const [select,setSelect]=useState();
    const userTypes=props.userTypes;
    console.log("user type:",userTypes);
    const GetData=props.GetData;

    const [loading, setLoading] = useState(false);
  

    const onSubmit=(event)=>{
        setLoading(true);
        event.preventDefault();

        !typeId && message.warn("User Görnüş saýla!");
        console.log("ulanujy gosh:",event);
        let fname=event.target.fname.value;
        let password=event.target.password.value;
        let password2=event.target.password2.value;
        let lastname=event.target.lastname.value;
        let phoneNumber = event.target.phoneNumber.value;
        let address = event.target.address.value;
   if(password===password2){
    
      typeId !=null ? (axiosInstance.post("/api/user/create",{
            fname:fname, 
            lastname:lastname,
            phoneNumber:phoneNumber,
            password:password,
            UserTypeId:typeId,
            rec_name:fname,
            rec_address:address,
            rec_number:phoneNumber
        }).then((data)=>{
            message.success(data.data.msg);
            GetData();
            setLoading(false);
            setTypeId(null)
            Close();
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
            message.warn("Internet baglanşygyňyzy barlaň!")
        }))
        :setLoading(false);
        

             

        console.log("data",data);
    }else{
        message.error("Password dogry girizmeli!");
    }
    }
    const InputHandler=props.InputHandler;

    return(
        <div className='ulanyjyGosh'>
            {!loading ?<form className='ulanyjylar--form' onSubmit={onSubmit}>
                <Input addonBefore='Ady' value={ulanyjyGosh.fname} name='fname' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore='Familýasy' value={ulanyjyGosh.lastname} name='lastname' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore='Salgysy' value={ulanyjyGosh.address} name='address' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore='Telefon belgi' value={ulanyjyGosh.phoneNumber} name='phoneNumber' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore='password'value={ulanyjyGosh.password} name='password' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Input addonBefore='password'value={ulanyjyGosh.password2} name='password2' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Select
                    placeholder='Status Saýlaň!'
                    showSearch
                 element='select'
                 label="Status" 
                 onChange={(value)=> setTypeId(value)}
                 defaultOption='Statusy saýlaň!' name='typeID' id="typeID" className='ulanyjylar-gosh--input'
                >
                    {
                        userTypes.map((userType)=>{
                            return(
                            <Option name="typeIDOption" value={userType.id} >{userType.type_tm}</Option>
                            )
                        })
                    }

               </Select>
                <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='ulanyjylar-gosh--button'>Hasaba al</Button>
                <Button onClick={()=>Close()} shape='round' danger type='primary' className='ulanyjylar-gosh--button'>Cancel</Button>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 150px"}} />
        }
        </div>
    );
};

export default UlanyjyGosh;