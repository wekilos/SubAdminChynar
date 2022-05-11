import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message, Popconfirm} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    
    const getProducts = props.getProducts

    const [data,setData]=useState();
    const [markets,setMarkets] = props.markets;
    const [welayatlar,setWelayatlar] = props.welayatlar;
    const [welayatId,setWelayatId] = useState(null);
    const [brands,setBrands] = props.brands;
    const [brandId,setBrandId] = useState(null);
    let market_Id = localStorage.getItem("SubMarketId");
    const [marketId,setMarketId] = useState(null);

    const [units,setUnits] = useState([]);
    const [ kategoriya, setKategoriya ] = useState([]);
    const [ subKategoriya, setSubKategoriya ] = useState([]);
    const [ market_id , setMarket_id ] = useState();
    const [ kategoriya_id, setKategoriya_id] = useState();
    const [ subKategoriya_id, setSubKategoriya_id] = useState();
    const [unit_id, setUnit_id]=useState();
    const [name_tm,setName_tm] = useState("");
    const [name_ru,setName_ru] = useState("");
    const [name_en,setName_en] = useState("");
    const [price,setPrice] = useState(0);
    const [sale_price,setSale_price] = useState();
    const [step,setStep] = useState();
    const [article_tm,setArticle_tm] = useState("");
    const [article_ru,setArticle_ru] = useState("");
    const [article_en,setArticle_en] = useState("");
    const [description_tm,setDescription_tm] = useState("");
    const [description_ru,setDescription_ru] = useState("");
    const [description_en,setDescription_en] = useState("");
    const [sale_until,setSale_until] = useState();
    const [total_amount,setTotal_amount] = useState(0);
    const [is_valyuta,setIs_valyuta] = useState(false);
    const [is_new, setIs_new] = useState(false);
    const [search,setSearch] = useState("");
    const [surat,setSurat] = useState();
    const [surat1,setSurat1] = useState();
    const [surat2,setSurat2] = useState();
    const [surat3,setSurat3] = useState();
    const [product_code,setProduct_code] = useState(0);
    const [gelenBaha,setGelenBaha] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [productId,setProductId] = useState();
    const [renkRazmer,setRenkRazmer]  = useState(false);
    const [razmerler,setRazmerler] = useState([]);
    const [renkler,setRenkler] = useState([]);
    const [name_tm2,setName_tm2] = useState();
    const [name_ru2,setName_ru2] = useState();
    const [name_en2,setName_en2] = useState();
    // creating product
    const CreateProduct = async()=>{
      setLoading(true);
      
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });
      let data={}
      
            data={
            name_tm:name_tm,
            name_ru:name_ru,
            name_en:name_en,
            price:price,
            product_code:product_code,
            gelenBaha:gelenBaha,
            // sale_price:sale_price,
            // sale_until:sale_until,
            step:step,
            article_en:article_en,
            article_ru:article_ru,
            article_tm:article_tm,
            description_en:description_en,
            description_ru:description_ru,
            description_tm:description_tm,
            is_sale:false,
            is_active:true,
            total_amount:total_amount,
            view_count:0,
            is_valyuta_price:is_valyuta,
            search:search,
            MarketKategoriyaId:kategoriya_id,
            MarketSubKategoriyaId:subKategoriya_id,
            UnitId:unit_id,
            BrandId:brandId,
            WelayatlarId:welayatId,
            ConfigId:1,
            is_new:true,
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
console.log("data",data)
        axiosInstance.post("/api/product/create/"+market_Id,{data}).then((data)=>{
          console.log(data.data);
          setProductId(data.data?.data?.id);
          setRenkRazmer(true);
          getRazmerler()
          getProducts();
          message.success(data.data.msg);
          setGelenBaha();
          setProduct_code()
          setName_tm();
          setName_ru();
          setName_en();
          setPrice();
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
          setIs_valyuta(false);
          setIs_new(false);
          setSearch();
          setLoading(false);
        }).catch((err)=>{
          console.log("Errorrr",err);
          setLoading(false);
          message.warn("Internet baglanşygyňyzy barlaň!")
        })
    }

    /// geting data from Api
    
  useEffect(()=>{
    getUnits();
    getKategoriyas();
    getMarket();
  },[])

      const getUnits = ()=>{
          axiosInstance.get("/api/units",{
            params:{
              active:true
            }
          }).then((data)=>{
              setUnits(data.data);
          }).catch((err)=>{
              console.log(err);
          })
      }  
      const getKategoriyas = (e)=>{
        axiosInstance.get("/api/market/kategoriya/"+market_Id,{
          active:true
        }).then((data)=>{
          console.log(data.data);
          setKategoriya(data.data);
        }).catch((err)=>{
          console.log(err);
        });
      }

      const getSubKategoriyas = (e)=>{
        axiosInstance.get("/api/market/subKategoriya/"+e,{
          active:true
        }).then((data)=>{
          console.log(data.data);
          setSubKategoriya(data.data);
        }).catch((err)=>{
          console.log(err);
        });
      }

      const getMarkets = (id)=>{
        axiosInstance.get("/api/markets",{
              params:{
                WelayatlarId:id,
                active:true,
                deleted:false
            }
          }).then((data)=>{
              console.log(data.data);
              setMarkets(data.data);

          }).catch((err)=>{
              console.log(err);
          })
      }

      const getBrands = (id)=>{
        axiosInstance.get("/api/brands",{
          params:{
            active:true,
            limit:999
          }
        }).then((data)=>{
              setBrands(data.data);
          }).catch((err)=>{
              console.log(err);
          })
      }
      const getMarket = ()=>{
        axiosInstance.get("/api/market/"+market_Id).then((data)=>{
          setWelayatId(data.data.WelayatlarId);
          }).catch((err)=>{
              console.log(err);
          }).catch((err)=>{
            console.log(err);
          })
      }
      const onChangeW = (value)=>{
        setWelayatId(value);
        getBrands(value);
        getMarkets(value);
      }

      const onChangeB = (value)=>{
        setBrandId(value);
      }
      function onChangeM(value) {
        console.log(`selected ${value}`);
        setMarket_id(value);
        getKategoriyas(value);
      }
      function onSearchM(val) {
        console.log('search:', val);
      }
      function onChangeK(value) {
        console.log(`selected ${value}`);
        setKategoriya_id(value);
        getSubKategoriyas(value);
      }
      function onChangeSubK(value) {
        console.log(`selected ${value}`);
        setSubKategoriya_id(value);
      }
      function onSearchK(val) {
        console.log('search:', val);
      }
      function onChangeU(value) {
        console.log(`selected ${value}`);
        setUnit_id(value);
      }
      function onSearchU(val) {
        console.log('search:', val);
      }

      const ChangeCheckbox = (value)=>{
        console.log(value)
        setIs_valyuta(value);
      }
      
      const getRazmerler = ()=>{
        axiosInstance.get("/api/razmerler/"+productId,{
          active:{
            active:true
          }
        })
        .then((data)=>{
          setRazmerler(data.data);
        }).catch((err)=>{
          console.log(err);
        })
      }

      const CreateRazmer = ()=>{
          setLoading(true)
          axiosInstance.post("/api/razmerler/create/"+productId,{
              name_tm:name_tm,
              name_ru:name_ru,
              name_en:name_en
          }).then((data)=>{
            message.success("successfully!");
            setName_en("");
            setName_ru("");
            setName_tm("");
            getRazmerler();
            setLoading(false);
          }).catch((err)=>{
            console.log(err);
            setLoading(false);
          })
      }

      const DeleteRazmer = (id)=>{
        setLoading(true)
        axiosInstance.delete("/api/razmerler/delete/"+id).then((data)=>{
          getRazmerler()
          setLoading(false);
          message.success("Deleted!")
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        })
      }

      const getRenkler = ()=>{
        axiosInstance.get("/api/renkler/"+productId,{
          params:{
            active:true
          }
        })
        .then((data)=>{
          setRenkler(data.data);
        }).catch((err)=>{
          console.log(err);
        })
      }

      const CreateRenk = ()=>{
        setLoading(true)
         axiosInstance.post("/api/renkler/create/"+productId,{
            name_en:name_en2,
            name_ru:name_ru2,
            name_tm:name_tm2
         }).then((data)=>{
          setLoading(false)
          getRenkler();
          setName_en2("");
          setName_ru2("");
          setName_tm2("");
         }).catch((err)=>{
          setLoading(false)
           console.log(err);
         })
      }

      const DeleteRenk = (id)=>{
        setLoading(true)
        axiosInstance.delete("/api/renkler/delete/"+id).then((data)=>{
          getRenkler()
          setLoading(false);
          message.success("Deleted!")
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        })
      }

      const onChangeBaha = (value)=>{
        let baha = (gelenBaha*value)/100;
        setPrice(parseInt(gelenBaha)+baha);
      }

    return (
      <React.Fragment>
        {!renkRazmer && <div
            className='suruji-yagdayy'>
            {!loading ? <form className='suruji-yagdayy--form' >
            
            {/* <Select
            className='suruji-yagdayy--input' 
            placeholder="Welayat Saýla"
            onChange={onChangeW}
          >
            {
              welayatlar.map((welayat)=>{
                return <Option value={welayat.id}>{welayat.name_tm}</Option>
              })
            }
          </Select> */}

          <Select
            className='suruji-yagdayy--input' 
            placeholder="Brand Saýla"
            onChange={onChangeB}
          >
            {
              brands?.map((brand)=>{
                return <Option value={brand.id}>{brand.name_tm}</Option>
              })
            }
          </Select>

            {/* <Select
            className='suruji-yagdayy--input' 
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder="Market Saýla"
            optionFilterProp="children"
            onChange={onChangeM}
            onSearch={onSearchM}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              markets.map((market)=>{
                return <Option key={market.name_tm} value={market.id}>{market.name_tm}</Option>
              })
            }
          </Select> */}
          <Select
           className='suruji-yagdayy--input'
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder="Market Kategoriýa Saýla"
            optionFilterProp="children"
            onChange={onChangeK}
            onSearch={onSearchK}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              kategoriya?.map((kategor)=>{
                return <Option value={kategor.id}>{kategor.name_tm}</Option>
              })
            }
          </Select>

          <Select
           className='suruji-yagdayy--input'
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder="Market SubKategoriýa Saýla"
            optionFilterProp="children"
            onChange={onChangeSubK}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              subKategoriya?.map((kategor)=>{
                return <Option value={kategor.id}>{kategor.name_tm}</Option>
              })
            }
          </Select>

          <Select
            // className="yolHaty-gozle--input"
            className='suruji-yagdayy--input'
            showSearch
            // style={{ width: 200 }}
            placeholder="Unit Saýla"
            optionFilterProp="children"
            onChange={onChangeU}
            onSearch={onSearchU}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              units?.map((unit)=>{
                return <Option value={unit.id}>{unit.name_tm}</Option>
              })
            }
          </Select>
           <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
           <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
           <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
           <Input value={product_code} type="number" onChange={(e)=>{setProduct_code(e.target.value)}} addonBefore='product code'  className='suruji-yagdayy--input' />
           <Input value={gelenBaha} type="number"  onChange={(e)=>{setGelenBaha(e.target.value)}} addonBefore='gelen baha'  className='suruji-yagdayy--input' />
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
           <Input value={price} type="number"  onChange={(e)=>{setPrice(e.target.value)}} addonBefore='baha'  className='suruji-yagdayy--input' />
           {/* <Input value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore='Satyş baha'  className='suruji-yagdayy--input' /> */}
           {/* <Input value={step} onChange={(e)=>{setStep(e.target.value)}} addonBefore='Step'  className='suruji-yagdayy--input' />
           <Input value={article_tm} onChange={(e)=>{setArticle_tm(e.target.value)}} addonBefore='Article tm'  className='suruji-yagdayy--input' />
           <Input value={article_ru} onChange={(e)=>{setArticle_ru(e.target.value)}} addonBefore='Article ru'  className='suruji-yagdayy--input' />
           <Input value={article_en} onChange={(e)=>{setArticle_en(e.target.value)}} addonBefore='Article en'  className='suruji-yagdayy--input' /> */}
          <Input value={total_amount} type="number"  onChange={(e)=>{setTotal_amount(e.target.value)}} addonBefore='Ambardaky Sany'  className='suruji-yagdayy--input' />

           <Input style={{width:"94%"}} value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore='Description tm'  className='suruji-yagdayy--input' />
           <Input style={{width:"94%"}} value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore='Description ru'  className='suruji-yagdayy--input' />
           <Input style={{width:"94%"}} value={description_en} onChange={(e)=>{setDescription_en(e.target.value)}} addonBefore='Description en'  className='suruji-yagdayy--input' />
           {/* <Input  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore='Sale until'  className='suruji-yagdayy--input' /> */}
           <Input style={{width:"94%"}} value={search} onChange={(e)=>{setSearch(e.target.value)}} addonBefore='Gözleg söz'  className='suruji-yagdayy--input' />
           {/* <Input  onChange={()=>ChangeCheckboxNew()} type="checkbox" addonBefore='Täzemi'  className='suruji-yagdayy--input' /> */}
           {/* <Input  onChange={} type="checkbox" addonBefore='Valýutamy'  className='suruji-yagdayy--input' /> */}
           <Select
            // className="yolHaty-gozle--input"
            className='suruji-yagdayy--input'
            showSearch
            style={{ width: "95%" }}
            placeholder="Haryt Walyuta gorami?"
            optionFilterProp="children"
            onChange={ChangeCheckbox}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
             <Option key={1} value={true}>Howwa</Option>
             <Option key={2} value={false}>Yok</Option>
          </Select>
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat(e.target.files[0])}} type="file" addonBefore='Haryt Surat 1'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat1(e.target.files[0])}} type="file" addonBefore='Haryt Surat 2'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat2(e.target.files[0])}} type="file" addonBefore='Haryt Surat 3'  className='suruji-yagdayy--input' />
           <Input style={{width:"95%"}}  onChange={(e)=>{setSurat3(e.target.files[0])}} type="file" addonBefore='Haryt Surat 4'  className='suruji-yagdayy--input' />
           
                
                <Button style={{width:"35%"}} onClick={CreateProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Hasaba al</Button>
                <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
            </form>
            :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
          }
        </div>}

        {
          renkRazmer && <div
              className='suruji-yagdayy'>
              {!loading ? <form className='suruji-yagdayy--form' >
                <h2 style={{width:"100%",marginTop:"-15px",marginBottom:"0px"}}>Razmerler</h2>
                <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
                <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
                <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
                <Button style={{width:"46%"}} onClick={CreateRazmer} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Razmer Gosh</Button>

                {/* <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly"}}>
                <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                </div> */}
                <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly",margin:"10px auto 20px",borderBottom:"2px solid black",padding:"10px",borderRadius:"3px"}}>
                      {razmerler?.map((razmer)=>{
                        return <Popconfirm
                        title="Siz çyndan ochurmek isleýärsinizmi?"
                        onConfirm={()=>DeleteRazmer(razmer.id)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                       <div style={{border:"1px solid grey",borderRadius:"6px",padding:"5px 8px",fontWeight:"bold",cursor:"pointer"}}>{razmer.name_tm}</div>

                    </Popconfirm>
                      })}
                </div>

               
                <h2 style={{width:"100%",marginTop:"-5px",marginBottom:"0px"}}>Renkler</h2>

                <Input value={name_tm2} onChange={(e)=>{setName_tm2(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
                <Input value={name_ru2} onChange={(e)=>{setName_ru2(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
                <Input value={name_en2} onChange={(e)=>{setName_en2(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
                <Button style={{width:"46%"}} onClick={CreateRenk} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Renk Gosh</Button>

                {/* <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly"}}>
                <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                </div> */}

                <div style={{width:"100%",display:"inline-flex",justifyContent:"space-evenly",margin:"10px auto 20px",borderBottom:"2px solid black",padding:"10px",borderRadius:"2px"}}>
                      {renkler?.map((renk)=>{
                        return <Popconfirm
                        title="Siz çyndan ochurmek isleýärsinizmi?"
                        onConfirm={()=>DeleteRenk(renk.id)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                       <div style={{border:"1px solid grey",borderRadius:"6px",padding:"5px 8px",fontWeight:"bold",cursor:"pointer"}}>{renk.name_tm}</div>

                    </Popconfirm>
                      })}
                </div>

              </form>
               :<LoadingOutlined style={{fontSize:"50px",textAlign:"center",width:"auto",margin:"50px 250px"}} />
              }
            <Button style={{width:"95%"}} onClick={()=>{setRenkRazmer(false);}} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>

          </div>
        }
        </React.Fragment>

    );
};

export default SurujiYagdayy;