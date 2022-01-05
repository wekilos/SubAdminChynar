import React, { useEffect,useState } from 'react';
import { Button,Input,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import SurujiGosh from './surujiGosh';
import SurujiGozle from './surujiGozle';
import SurujiTable from './surujiTable';
import  './surujiler.css';

const Surujiler = props =>{
   
    const [Gosh,setGosh]=useState(false);
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }

   

    return(
        <div className='surujiler'>
            {/* <div className='surujiler--top'>
                <h2 className="surujiler--header">Sürüjiler</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji--gosh'> Sürüji Goş </Button>
            </div> */}
           {/* {Gosh && <SurujiGosh onClick={GoshButton}/>} */}
           <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Sürüji Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <SurujiGosh onClick={GoshButton}/>

            </Drawer>

            <div className='surujiler--gozleg'>
                <SurujiGozle GoshButton={GoshButton}/>

            </div>
            <div className='surujiler-Table'>
                <SurujiTable/>
            </div>
        </div>
    );
};

export default Surujiler; 