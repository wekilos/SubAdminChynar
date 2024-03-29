import React,{useContext, useEffect, useState} from 'react';

import { useSizeComponents } from "../../components/sizeComponent";
import {Drawer} from 'antd';
import "antd/dist/antd.css";

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './LukmanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';

const Lukman = () =>{

    const { dil } = useContext(SebedimContext);
    const [width,height] = useSizeComponents();
    const [units,setUnits] = useState([]);

    useEffect(()=>{
        getUnits();
    },[]);

    const getUnits = ()=>{
        axiosInstance.get("/api/units",{
            params:{
                active:true,
                deleted:false
            }
        }).then((data)=>{
            console.log(data.data);
            setUnits(data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={width>850?400:320}
            className='lukman-gosh--drawer'
            title={dil==="TM"?"Unit Goş":"добавить тип продукта"}
            placement="right"
            // closable={true}
            onClose={()=>Close()}
            visible={state}
            style={{zIndex:"100"}}
            >
              <UnitGosh getUnits={getUnits}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                <LukmanGozleg  GoshButton={GoshButton}/>
            </div>
            <div className='lukman-Table'>
                <LukmanTable getUnits={getUnits}  data={[units,setUnits]}/>
            </div>
        </div>
    );
};

export default Lukman; 