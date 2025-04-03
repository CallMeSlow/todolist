import type { Todo } from "@/types/todo";
import { useEffect, useMemo, useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";

export function useTodos() {

    const [todos, setTodos] = useState<Todo[]>([])

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
        const res = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!res.ok) {
            console.error("添加todo失败", res.statusText);
            return;
        }

        const newTodo: Todo = await res.json();

        setTodos(prev => [...prev, newTodo])
    }


    // const toggleTodo = (id: number) => {
    //     setTodos(prev =>
    //         prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    // };


    const toggleTodo = async (id: number) => {
        try {
            const res = await fetch("api/todos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                console.log("更新已完成失败");
                return;
            }

            const updatedTodo = await res.json();

            setTodos(prev =>
                prev.map(todo => todo.id === id ? updatedTodo : todo)
            );

        } catch (error) {
            console.log("网络错误：", error);
        }


    }



    // const deleteTodo = (id: number) => {
    //     setTodos(prev => prev.filter(todo => todo.id !== id))
    // };

    const deleteTodo = async (id: number) => {
        try {
            const res = await fetch("api/todos", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                console.error("删除失败");
                return;
            }

            setTodos((prev) => {
                return prev.filter(todo => todo.id !== id)
            });

        } catch (error) {
            console.error("网络错误：", error);
        }
    }

    // const clearAll = () => {
    //     setTodos([])
    // };

    const clearAll = async () => {
        try {
            const res = await fetch("api/todos?all=true", {
                method: "DELETE",
            });

            if (!res.ok) {
                console.log("清空失败");
                return;
            }
            setTodos([])
        } catch (error) {
            console.log("网络错误")
        }

    }



    // const updateTodo = (id: number, newText: string) => {
    //     console.log('updateTodo', id, newText);
    //     setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
    // };


    const updateTodo = async (id: number, newText: string) => {
        console.log("更新值为：",newText)
        const updateTodo = todos.find(todo => todo.id == id)
        if (updateTodo == undefined) {
            return;
        }

        try {
            const res = await fetch("api/todos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id,text:newText })
            })

            if (!res.ok) {
                console.log("更新失败")
                return;
            }
           
            setTodos((prev) => {
                return prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo)
            });

        } catch (error) {
            console.log("网络错误")
        }

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
