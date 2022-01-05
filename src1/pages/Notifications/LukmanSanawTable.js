import React,{useState} from 'react';

import {Button,Space,message,Table,Input,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import StatusEdit from './SurujiYagdayy';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getStatuses = props.getStatuses;
    
    const columns = [
        {
            title:"Notification No",
            dataIndex:"id"
        },
        {
            title:"Notification Ady tm",
            dataIndex:"name_tm",
            
        },
        // {
        //     title:"Notification Ady ru",
        //     dataIndex:"name_ru",
            
        // },
        // {
        //     title:"Notification Ady en",
        //     dataIndex:"name_en",
            
        // },
        {
            title:"Notification Text tm",
            dataIndex:"text_tm",
            
        },
        // {
        //     title:"Notification Text ru",
        //     dataIndex:"text_ru",
        // },
        // {
        //     title:"Notification Text en",
        //     dataIndex:"text_en"
        // },
        {
            title:"Link",
            dataIndex:"link",
        },
        {
            title:"Slider Surat",
            dataIndex:"photo_url",
            render:(text,record)=>(
                <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.image} alt="Notification surat"/>
            )
        },
        {
            title:"Üýtgetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                   <Button type='primary'shape='round'onClick={()=>ShowGoshmacha(record)} >Goşmaça</Button>

                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const [goshmacha,setGoshmacha]=useState(false);

    const [name_tm,setName_tm]=useState();
    const [name_ru,setName_ru]=useState();
    const [name_en,setName_en]=useState();
    const [text_tm,setText_tm]=useState();
    const [text_ru,setText_ru]=useState();
    const [text_en,setText_en]=useState();
    const [link, setLink] = useState();
    const [photo_url, setPhoto_url] = useState();
    const [loading, setLoading] = useState(false);

    const ShowGoshmacha = (e)=>{
        console.log(e)
        setGoshmacha(!goshmacha);
        setMaglumat(e)
    }
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/notification/delete/"+event.id).then((data)=>{
            console.log(data.data);
            message.success("Notification öçürildi!");
            getStatuses()
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    const MoreInformation = async(event)=>{
        console.log("maglummat",event);
        setShowInfo(!showInfo);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    await setMaglumat(event);
    if(event){
        setName_en(event && event.name_en)
      setName_ru(event && event.name_ru)
      setName_tm(event && event.name_tm)
      setText_en(event && event.text_en);
        setText_tm(event && event.text_tm);
        setText_ru(event && event.text_ru);
      setLink(event && event.link)
    }
}

const saveData = (event)=>{
    setData([
        ...data,
        maglumat
    ]);
    setEdit(false);
};

const EditStatus = async()=>{
    setLoading(true);

    let formData = new FormData();
    if(photo_url){
      formData.append("image",photo_url)
    }
      formData.append("name_tm",name_tm)
    
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
    
console.log(maglumat.id)
    axiosInstance.patch("/api/notification/update/"+maglumat.id,formData)
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
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      setLoading(false);
      message.warn("Internet baglanşygyňyzy barlaň!")
    })
  }
    return(
        <div className='LukmanTable'>
            <Drawer
                width={600}
                className='lukman-table--drawer'
                title="Goşmaça"
                placement="right"
                onClose={()=>ShowGoshmacha()}
                visible={goshmacha}>
                  { maglumat && <div>
                        <div style={{border:"solid 1px",padding:"10px",borderRadius:"15px"}}>
                            <h1>{maglumat.name_tm}</h1>
                            <h1>{maglumat.name_ru}</h1>
                            <h1>{maglumat.name_en}</h1>
                        </div>
                        <div style={{border:"solid 1px",padding:"10px",borderRadius:"15px",marginTop:"15px"}}>
                            <h2>Text tm</h2>
                            <p>{maglumat.text_tm}</p>
                            <h2>Text ru</h2>
                            <p>{maglumat.text_ru}</p>
                            <h2>Text en</h2>
                            <p>{maglumat.text_en}</p>
                        </div>
                    </div>}
                </Drawer>

                <Drawer
                width={600}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <div
                className='suruji-yagdayy'>
                {!loading ?<form className='suruji-yagdayy--form' >
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
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
        }
        </div>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;