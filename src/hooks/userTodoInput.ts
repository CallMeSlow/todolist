import { useState } from "react"


export function userTodoInput(initialValue:string="") {
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);


    const clearInput = () => setInputValue("");

    return {inputValue,onChange,clearInput};
}
