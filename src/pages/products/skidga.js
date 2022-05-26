import React,{useContext, useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';
import { SebedimContext } from '../../context/Sebedim';

const Option = {Select};

const EditingProduct =(props) =>{
    

  const {dil} = useContext(SebedimContext);
    const getProducts = props.getProducts;

    // const [data,setData]=useState(null);
    let maglumat = props.mag;
    console.log("maglumat",maglumat)

    const [sale_price,setSale_price] = useState(maglumat && maglumat.sale_price);
    const [is_sale, setIs_sale] = useState(false);
    const [sale_until, setSale_until] = useState(maglumat && maglumat.sale_until);
    const [loading, setLoading] = useState(false);

    

    // updating product
    const EditProduct = async()=>{
      setLoading(true);
        console.log("maglumatId",maglumat.id)
            
     await   axiosInstance.patch("/api/product/skidka/"+maglumat.id,{
         is_sale:true,
         sale_price:sale_price,
         sale_until:sale_until,
     }).then((data)=>{
          console.log(data.data);
          getProducts();
          message.success(data.data.msg);
          setSale_price();
          setSale_until();
          setLoading(false);
          
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
          message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
        })
    }

    const SkidkadanAyyr = async()=>{
      setLoading(true);
        console.log("maglumatId",maglumat.id)
            
     await   axiosInstance.patch("/api/product/skidka/"+maglumat.id,{
         is_sale:false,
         sale_price:null,
         sale_until:null,
     }).then((data)=>{
          console.log(data.data);
          getProducts();
          message.success(data.data.msg);
          setSale_price();
          setSale_until();
          setIs_sale();
          setLoading(false);
          
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
          message.warn(dil==="TM"?"Internet baglanşygyňyzy barlaň!":"Проверьте подключение к Интернету!")
        })
    }
    
   
      

      
      

      const ChangeCheckbox = ()=>{

        setIs_sale(!is_sale);
        console.log("skitga",is_sale)
      }

    return (
        <div
            className='suruji-yagdayy'>
            {!loading ?<form className='suruji-yagdayy--form' >
          
          <h2 style={{width:"90%"}}>{dil==="TM"?'baha':"цена" }: {maglumat && maglumat.price && maglumat.price}</h2>
           <Input style={{width:"90%"}} value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore={dil==="TM"?'Skidka baha':"цена со скидкой" } className='suruji-yagdayy--input' />
           <Input style={{width:"90%"}} value={sale_until && sale_until}  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore={dil==="TM"?'Haçana çenli':"До какого времени"}  className='suruji-yagdayy--input' />
           
                <div style={{width:"100%"}}>
                <Button style={{width:"40%"}} onClick={EditProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> {dil==="TM"?"Skidka et":"Сделать скидку"} </Button>
                <Button style={{width:"40%"}} onClick={SkidkadanAyyr} shape='round' danger type='primary' className='suruji-yagdayy--button'> {dil==="TM"?"Skidgadan aýyr":"Отменить скидку"} </Button>
                </div>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 210px"}} />
          }
        </div>
    );
};

export default EditingProduct;