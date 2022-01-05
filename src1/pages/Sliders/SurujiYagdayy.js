import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    
    const getStatuses = props.getStatuses;
    const [maglumat,setMaglumat] = props.mag;
    console.log(maglumat)
    const [name_tm,setName_tm]=useState();
    const [name_ru,setName_ru]=useState();
    const [name_en,setName_en]=useState();
    const [link, setLink] = useState();
    const [photo_url, setPhoto_url] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
      setName_en(null)
      setName_ru(null)
      setName_tm(null)
      setLink(maglumat && maglumat.link)
      setPhoto_url(null);
    },[maglumat])
    
    const EditStatus = async()=>{
      setLoading(true);

      
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });

        let data={};
        if(name_tm || name_ru || name_en){
          console.log(name_tm,name_ru,name_en)
          
        if(name_tm){
          data.img_name_tm=name_tm.name;
          data.img_tm=await toBase64(name_tm);
        }
        if(name_ru){
          data.img_name_ru= name_ru.name;
           data.img_ru=await toBase64(name_ru);
        }
        if(name_en){
          data.img_name_en= name_en.name;
          data.img_en=await toBase64(name_en);
        }
        data.link=link;
      }else{
        data ={
          // title_tm:name_tm,
          // title_ru:name_ru,
          // title_en:name_en,
          link:link,
        }
      }


    await axiosInstance.patch("/api/slider/update/"+maglumat.id,{
        data
      }).then((data)=>{
        console.log(data.data);
        message.success(data.data.msg);
        getStatuses();
        // setName_tm();
        // setName_ru();
        // setName_en();
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
        message.warn("Internet baglanşygyňyzy barlaň!")
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            {!loading ?<form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} type="file" onChange={(e)=>{setName_tm(e.target.files[0])}} addonBefore='Slider Surat tm'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} type="file" onChange={(e)=>{setName_ru(e.target.files[0])}} addonBefore='Slider Surat ru'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} type="file" onChange={(e)=>{setName_en(e.target.files[0])}} addonBefore='Slider Surat en'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={link} onChange={(e)=>{setLink(e.target.value)}} addonBefore='KategoryyaId'  className='suruji-yagdayy--input' />
           
                
                <Button onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
          }
        </div>
    );
};

export default SurujiYagdayy;