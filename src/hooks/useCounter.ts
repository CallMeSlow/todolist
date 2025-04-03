import {useState} from 'react'

export function useCounter(){
    const [count,setCount]= useState<number>(0);


    const showCount = ()=> count;

    const  countIncrease=()=> {
        setCount(count+1);
    }

    const countDecrease=()=> {
        setCount(count-1);
    }

    const countReset=()=> {
        return 0;
    };
    
    return {showCount,countIncrease,countDecrease,countReset};
}