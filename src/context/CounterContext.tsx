import React,{createContext,useContext,ReactNode} from "react";

import  {useCounter} from "@/hooks/useCounter";


const CounterContext = createContext<ReturnType<typeof useCounter> | undefined>(undefined);


export function CounterProvider({children}:{children:ReactNode}){
   const counterData = useCounter();
 
   return(
     <CounterContext.Provider value ={counterData}>
        {children}
     </CounterContext.Provider>
   )

}
export function useCounterContext(){
    const context = useContext(CounterContext);
    if(context===undefined){
        throw new Error('useCounterContext必须在CounterProvider内使用');
    }
    return context;
}