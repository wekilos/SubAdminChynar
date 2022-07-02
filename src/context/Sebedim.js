import React ,{ useState, useEffect,createContext} from "react";


import { axiosInstance } from "../utils/axiosIntance";
import sound from "../img/sound.wav";
import {message} from "antd"

export const SebedimContext = createContext();
const SebedimContextProvider = (props)=>{
    
   
    let [dil,setDil]=useState("RU");
    const [audio] = useState(new Audio(sound));
    
    const [gorulen,setGorulen] = useState(0);
    const [taze,setTaze] = useState(0);
    const [bool, setBool] = useState(false);
    const [bool2, setBool2] = useState(false);
    const [newOrder,setNewOrder] = useState(0);

    useEffect(()=>{
            let dilData = localStorage.getItem("chynarSubAdminDil");
        if(dilData){
            setDil(JSON.parse(dilData));
        }else{
            setDil("RU");
        }
    },[])

    useEffect(()=>{ 
        let localGorulen = localStorage.getItem("gorulenler")
        let localTaze = localStorage.getItem("taze");
    

    if(localGorulen){
        setGorulen(localGorulen);
    }
    if(localTaze){
        setTaze(localTaze);
    }
},[])

    const ChangeDil = (event)=>{
            setDil(event);
            localStorage.setItem("chynarSubAdminDil",JSON.stringify(event));
    }

    const ChangeGorulen = (event)=>{
        setGorulen(event);
        setNewOrder(0);
    }

    const ChangeTaze = (event)=>{
        setTaze(event);
    }

    useEffect(()=>{
        const time = setTimeout(() => {
        //   BatchNumber();
          getOrders();
          
          audio.pause()
          }, 1000*5*60);
        return ()=> clearTimeout(time);
      },[bool2]);

    const BatchNumber = async(tazes,gorulenn)=>{
      
        if(tazes-gorulenn>0){
          setNewOrder(tazes-gorulenn);
          audio.play();
        }
        
        setBool2(!bool2);
}

    const getOrders = ()=>{
        let MarketId = localStorage.getItem("SubMarketId");
        axiosInstance.get("/api/orders/new",{
            params:{ 
                MarketId:MarketId,
            }
        }).then((data)=>{
            console.log(data.data.length);
            localStorage.setItem("taze",data.data.length);
            let gorulenler = localStorage.getItem("gorulenler");
            setTaze(data?.data?.length);
            BatchNumber(data.data.length,gorulenler);
            if(data.data.length-gorulenler>0){
              message.success(`${data.data.length-gorulenler} sany taze sargyt bar!`)
              audio.play();
            }
            // audio.play();
            setBool(!bool);
        }).catch((err)=>{
            console.log(err);
        })
         
    }

    return(
        <SebedimContext.Provider value={{dil,newOrder,ChangeDil,ChangeTaze, ChangeGorulen,getOrders}}>
            {props.children}
        </SebedimContext.Provider>
    );
};
 

export default SebedimContextProvider;