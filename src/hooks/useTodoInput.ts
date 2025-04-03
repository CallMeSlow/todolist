import { useState } from "react"


export function useTodoInput(initialValue:string="") {
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);


    const clearInput = () => setInputValue("");

    return {inputValue,onChange,clearInput};
}
