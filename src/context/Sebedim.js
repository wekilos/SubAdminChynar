import React ,{ useState, useEffect,createContext} from "react";

export const SebedimContext = createContext();

const SebedimContextProvider = (props)=>{
    
   
    let [dil,setDil]=useState();
    useEffect(()=>{
            let dilData = localStorage.getItem("chynarDil");
        if(dilData){
            setDil(JSON.parse(dilData));
        }else{
            setDil("TM");
        }
    },[])

    const ChangeDil = (event)=>{
            setDil(event);
            localStorage.setItem("chynarSubAdminDil",JSON.stringify(event));
    }

    return(
        <SebedimContext.Provider value={{dil,ChangeDil}}>
            {props.children}
        </SebedimContext.Provider>
    );
};
 

export default SebedimContextProvider;