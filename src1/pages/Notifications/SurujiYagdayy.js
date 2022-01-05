import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

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
    const [text_tm,setText_tm]=useState();
    const [text_ru,setText_ru]=useState();
    const [text_en,setText_en]=useState();
    const [link, setLink] = useState();
    const [photo_url, setPhoto_url] = useState();
    
    useEffect(()=>{
      setName_en(maglumat && maglumat.name_en)
      setName_ru(maglumat && maglumat.name_ru)
      setName_tm(maglumat && maglumat.name_tm)
      setText_en(maglumat && maglumat.text_en);
        setText_tm(maglumat && maglumat.text_tm);
        setText_ru(maglumat && maglumat.text_ru);
      setLink(maglumat && maglumat.link)
      setPhoto_url(null);
    },[maglumat])
    
    const EditStatus = async()=>{

      let formData = new FormData();
      if(photo_url){
        formData.append("image",photo_url)
      }
      if(name_tm){
        formData.append("name_tm",name_tm)
      }
      if(name_ru){
        formData.append("name_ru",name_ru)
      }
      if(name_en){
        formData.append("name_en",name_en)
      }
      if(text_tm){
        formData.append("text_tm",text_tm)
      }
      if(text_ru){
        formData.append("text_ru",text_ru)
      }
      if(text_en){
        formData.append("text_en",text_en)
      }
      if(link){
        formData.append("link",link)
      }
      

      axiosInstance.post("/api/notification/update/"+maglumat.id,formData)
      .then((data)=>{
        console.log(data.data);
        message.success("Notification üýtgedildi!");
        getStatuses();
        setName_tm();
        setName_ru();
        setName_en();
        setText_en();
        setText_tm();
        setText_ru();
        setLink();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='Slider Text tm'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='Slider Text ru'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='Slider Text en'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={text_tm} onChange={(e)=>{setText_tm(e.target.value)}} addonBefore='Notification text tm'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={text_ru} onChange={(e)=>{setText_ru(e.target.value)}} addonBefore='Notification text ru'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={text_en} onChange={(e)=>{setText_en(e.target.value)}} addonBefore='Notification text en'  className='suruji-yagdayy--input' />
            
            <Input style={{width:"90%"}} value={link} onChange={(e)=>{setLink(e.target.value)}} addonBefore='Slider Link'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} type="file" onChange={(e)=>{setPhoto_url(e.target.files[0])}} addonBefore='Slider Surat'  className='suruji-yagdayy--input' />
           
                
                <Button onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;