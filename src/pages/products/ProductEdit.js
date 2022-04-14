import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const EditingProduct =(props) =>{
    
    const getProducts = props.getProducts;

    // const [data,setData]=useState(null);
    let maglumat = props.mag;
    console.log("maglumat",maglumat)

    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [name_en,setName_en] = useState(maglumat && maglumat.name_en);
    const [price,setPrice] = useState(maglumat && maglumat.price);
    const [gelenBaha,setGelenBaha] = useState(maglumat?.gelenBaha);
    const [product_code,setProduct_code] = useState(maglumat?.product_code);
    const [sale_price,setSale_price] = useState(maglumat && maglumat.sale_price);
    const [step,setStep] = useState(maglumat && maglumat.step);
    const [article_tm,setArticle_tm] = useState(maglumat && maglumat.article_tm);
    const [article_ru,setArticle_ru] = useState(maglumat && maglumat.article_ru);
    const [article_en,setArticle_en] = useState(maglumat && maglumat.article_en);
    const [description_tm,setDescription_tm] = useState(maglumat && maglumat.description_tm);
    const [description_ru,setDescription_ru] = useState(maglumat && maglumat.description_ru);
    const [description_en,setDescription_en] = useState(maglumat && maglumat.description_en);
    const [sale_until,setSale_until] = useState(maglumat && maglumat.sale_until);
    const [total_amount,setTotal_amount] = useState(maglumat && maglumat.total_amount);
    const [is_valyuta,setIs_valyuta] = useState(false);
    const [search,setSearch] = useState(maglumat && maglumat.search);
    const [surat,setSurat] = useState(null);
    const [surat1,setSurat1] = useState(null);
    const [surat2,setSurat2] = useState(null);
    const [surat3,setSurat3] = useState(null);
    const [loading, setLoading] = useState(false);
    
useEffect(()=>{
          setName_tm(maglumat.name_tm);
          setName_ru(maglumat.name_ru);
          setName_en(maglumat.name_en);
          setPrice(maglumat.price);
          setSale_price(maglumat.sale_price);
          setStep(maglumat.step);
          setArticle_tm(maglumat.article_tm);
          setArticle_ru(maglumat.article_ru);
          setArticle_en(maglumat.article_en);
          setDescription_tm(maglumat.description_tm);
          setDescription_ru(maglumat.description_ru);
          setDescription_en(maglumat.description_en);
          setSale_until(maglumat.sale_until);
          setTotal_amount(maglumat.total_amount);
          setIs_valyuta(maglumat.is_valyuta);
          setSearch(maglumat.search);
},[])
    

    // updating product
    const EditProduct = async()=>{
      setLoading(true);
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            });
            let data;
                  data ={
                  name_tm:name_tm,
                  name_ru:name_ru,
                  name_en:name_en,
                  price:price,
                  product_code:product_code,
                  gelenBaha:gelenBaha,
                  sale_price:sale_price,
                  sale_until:sale_until,
                  step:step,
                  article_en:article_en,
                  article_ru:article_ru,
                  article_tm:article_tm,
                  description_en:description_en,
                  description_ru:description_ru,
                  description_tm:description_tm,
                  // is_sale:false,
                  // is_active:true,
                  total_amount:total_amount,
                  // view_count:0,
                  is_valyuta_price:is_valyuta,
                  search:search,
                  // MarketKategoriyaId:kategoriya_id,
                  // UnitId:unit_id,
                 }
                
                 if(surat1){
                  data.img_name1=surat1.name;
                  data.img1=await toBase64(surat1);
                  }
                  if(surat2){
                      data.img_name2=surat2.name;
                      data.img2=await toBase64(surat2);
                  }
                  if(surat3){
                      data.img_name3=surat3.name;
                      data.img3=await toBase64(surat3);
                  }
                  if(surat){
                      data.img_name=surat.name;
                      data.img=await toBase64(surat);
                  }
                  
                //  img_name:surat.name,
                //  img:await toBase64(surat),
      console.log("product id:",maglumat.id,data)
    
     await   axiosInstance.patch("/api/product/update/"+maglumat.id,{data}).then((data)=>{
          console.log(data.data);
          getProducts();
          message.success(data.data.msg);
          setName_tm();
          setName_ru();
          setName_en();
          setPrice();
          setGelenBaha()
          setSale_price();
          setStep();
          setArticle_tm();
          setArticle_ru();
          setArticle_en();
          setDescription_tm();
          setDescription_ru();
          setDescription_en();
          setSale_until();
          setTotal_amount();
          setIs_valyuta();
          setSearch();
          setLoading(false);
          
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
          message.warn("Internet baglanşygyňyzy barlaň!")
        })
    }

    /// geting data from Api
    
   
      

      
      

      const ChangeCheckbox = (value)=>{
        console.log(value)
        setIs_valyuta(value);
      }

      const onChangeBaha = (value)=>{
        let baha = (gelenBaha*value)/100;
        setPrice(parseInt(gelenBaha)+baha);
      }

    return (
        <div
            className='suruji-yagdayy'>
            {!loading ? <form className='suruji-yagdayy--form' >
            
           <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
           <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
           <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
           <Input value={product_code} onChange={(e)=>{setProduct_code(e.target.value)}} addonBefore='Haryt Code'  className='suruji-yagdayy--input' />
            <Input value={gelenBaha} onChange={(e)=>{setGelenBaha(e.target.value)}} addonBefore='Gelen baha'  className='suruji-yagdayy--input' />
            <Select
              className='suruji-yagdayy--input'
              // style={{ width: 200 }}
              placeholder="Satysh Baha %"
              onChange={onChangeBaha}
            >
              <Option value={5}>5%</Option>
              <Option value={10}>10%</Option>
              <Option value={15}>15%</Option>
              <Option value={20}>20%</Option>
              <Option value={25}>25%</Option>
              <Option value={30}>30%</Option>
            </Select>
           <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore='baha'  className='suruji-yagdayy--input' />
           <Input value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore='Satyş baha'  className='suruji-yagdayy--input' />
           {/* <Input value={step} onChange={(e)=>{setStep(e.target.value)}} addonBefore='Step'  className='suruji-yagdayy--input' />
           <Input value={article_tm} onChange={(e)=>{setArticle_tm(e.target.value)}} addonBefore='Article tm'  className='suruji-yagdayy--input' />
           <Input value={article_ru} onChange={(e)=>{setArticle_ru(e.target.value)}} addonBefore='Article ru'  className='suruji-yagdayy--input' />
           <Input value={article_en} onChange={(e)=>{setArticle_en(e.target.value)}} addonBefore='Article en'  className='suruji-yagdayy--input' /> */}
           <Input style={{width:"94%"}} value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore='Description tm'  className='suruji-yagdayy--input' />
           <Input style={{width:"94%"}} value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore='Description ru'  className='suruji-yagdayy--input' />
           <Input style={{width:"94%"}} value={description_en} onChange={(e)=>{setDescription_en(e.target.value)}} addonBefore='Description en'  className='suruji-yagdayy--input' />
           <Input  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore='Sale until'  className='suruji-yagdayy--input' />
           <Input value={total_amount} onChange={(e)=>{setTotal_amount(e.target.value)}} addonBefore='Ambardaky Sany'  className='suruji-yagdayy--input' />
           {/* <Input  onChange={()=>ChangeCheckbox()} type="checkbox" addonBefore='Valýutamy'  className='suruji-yagdayy--input' /> */}
           <Select
                            className='suruji-yagdayy--input'
                            placeholder="Haryt Walyuta gorami?"
                            optionFilterProp="children"
                            onChange={ChangeCheckbox}
                            >
                            <Option value={true}>Howwa</Option>
                            <Option value={false}>Yok</Option>
                        </Select>
           <Input value={search} onChange={(e)=>{setSearch(e.target.value)}} addonBefore='Gözleg söz'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}} onChange={(e)=>{setSurat(e.target.files[0])}} type="file" addonBefore='Haryt Surat'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat1(e.target.files[0])}} type="file" addonBefore='Haryt Surat 2'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat2(e.target.files[0])}} type="file" addonBefore='Haryt Surat 3'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat3(e.target.files[0])}} type="file" addonBefore='Haryt Surat 4'  className='suruji-yagdayy--input' />
           
                <div style={{width:"100%"}}>
                <Button style={{width:"40%"}} onClick={EditProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> Üýget </Button>
                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'> Goýbolsun </Button>
                </div>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
          }
        </div>
    );
};

export default EditingProduct;