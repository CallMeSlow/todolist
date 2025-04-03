import {useCounterContext} from "@/context/CounterContext";



export function AddCount(){
    const {countIncrease} = useCounterContext();

    return(
        // <button onClick ={()=>countIncrease()}>增加计数</button>
        <button onClick ={countIncrease}>增加计数</button>
    )
}