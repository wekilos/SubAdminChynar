import React,{useState,useEffect} from 'react';
import { Button,Input,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntance';

import './welayatlar.css';
import WelayatTable from './welayatTable';
import WelayatGosh from './welayatGosh';
import WelayatGozle from './welayatGozle';

const Welayatlar = prop =>{

    const [Gosh,setGosh]=useState(false);
    const [sany,setSany] = useState(0);
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }    
    const [data, setData] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/api/welayatlar").then((data)=>{
        console.log(data.data);
        setData(data.data);
        setSany(data.data.length);
      }).catch((err)=>{
        console.log(err);
      })
    }

    return(
        <div className='yolHaty'>
            {/* <div className='yolHaty--top'>
                <h2 className="yolHaty--header">Ýol Hatlar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji--gosh'>Ýol Haty Döret</Button>
            </div> */}
            {/* {Gosh && <YolHatyGosh onClick={GoshButton}/>} */}
            <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Welayat Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <WelayatGosh getData={getData} onClick={GoshButton}/>

            </Drawer>
            <div className='yolHaty--gozleg'>
                <WelayatGozle sany={sany} GoshButton={GoshButton}/>
            </div>
            <div className='yolHaty-Table'>
                <WelayatTable getData={getData} data={[data,setData]}/>
            </div>
        </div>
    );
};

export default Welayatlar;