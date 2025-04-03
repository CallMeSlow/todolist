import {useCounterContext} from "@/context/CounterContext";


export function CounterStatus(){
    const {showCount} = useCounterContext();
    return(
        <div>
            <p>当前计数：{showCount()}</p>
        </div>
    )
}