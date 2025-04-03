import type { Todo } from "@/types/todo";
import { useEffect, useMemo, useState } from "react";
import { useTodosApi } from "@/hooks/useTodoApi";
import { useStorageState } from "@/hooks/useStorageState";

export function useTodos() {

    const [todos, setTodos] = useState<Todo[]>([])

    const { getTodos, addTodo: apiAdd, deleteTodo: apiDelete, updateTodo: apiUpdate, toggleTodo: apiToggle, clearAll: apiClear } = useTodosApi()

    useEffect(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(setTodos)
            .catch(err => console.error("获取todos失败", err))
    }, [])

    // const addTodo = (text: string) => {
    //     const newTodo: Todo = {
    //         id: Date.now(),
    //         text: text,
    //         completed: false,
    //     }
    //     setTodos(prev => [...prev, newTodo])
    // };



    const addTodo = async (text: string) => {
        const newTodo = await apiAdd(text)

        setTodos(prev => [...prev, newTodo])
    }


    // const toggleTodo = (id: number) => {
    //     setTodos(prev =>
    //         prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    // };


    const toggleTodo = async (id: number) => {
        const updatedTodo = await apiToggle(id)
        setTodos(prev =>
            prev.map(todo => todo.id === id ? updatedTodo : todo)
        );
    }



    // const deleteTodo = (id: number) => {
    //     setTodos(prev => prev.filter(todo => todo.id !== id))
    // };

    const deleteTodo = async (id: number) => {
        await apiDelete(id)
        setTodos((prev) => {
            return prev.filter(todo => todo.id !== id)
        });
    }

    // const clearAll = () => {
    //     setTodos([])
    // };

    const clearAll = async () => {
        await apiClear()
        setTodos([])
    }



    // const updateTodo = (id: number, newText: string) => {
    //     console.log('updateTodo', id, newText);
    //     setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
    // };


    const updateTodo = async (id: number, newText: string) => {
        await apiUpdate(id, newText)
        setTodos((prev) => {
            return prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo)
        });
    }




    const selector = useMemo(() => {
        console.log('selector,重新计算', todos);
        const all = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const active = all - completed;
        return { all, completed, active }
    }, [todos]);

    return { todos, addTodo, toggleTodo, deleteTodo, clearAll, updateTodo, selector }
}
