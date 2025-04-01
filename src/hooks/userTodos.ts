import type { Todo } from "@/types/todo";
import { useState, useEffect } from "react";
import { saveTodosToStorage, getTodosFromStorage } from "@/utils/storage";


export function userTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const stored = getTodosFromStorage()
        setTodos(stored)
    }, []);

    useEffect(() => {
        saveTodosToStorage(todos)
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text: text,
            completed: false,
        }
        setTodos(prev => [...prev, newTodo])
    };

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    };

    const clearAll = () => {
        setTodos([])
    };

    const updateTodo =(id:number,newText:string)=>{
        console.log('updateTodo',id,newText);
        setTodos(prev => prev.map(todo => todo.id===id? {...todo,text:newText}:todo))
    }

    return {todos,addTodo,toggleTodo,deleteTodo,clearAll,updateTodo}
}
