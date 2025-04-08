import type { Todo } from "@/types/todo";

export function useTodosApi() {
    const getTodos = async (): Promise<Todo[]> => {
        const res = await fetch("api/todos");
        if (!res.ok) throw new Error("获取 todos 失败");
        return res.json()
    };

    const addTodo = async (text: string): Promise<Todo> => {
        const res = await fetch("api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        })
        if (!res.ok) throw new Error("添加失败");
        const data = await res.json();
        console.log("添加数据后，返回的数据是：",data)
        return data;
    }

    const deleteTodo = async (id: number): Promise<void> => {
        console.log("罗列删除数据：",id)
        const res = await fetch(`api/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("删除失败");
    }


    const updateTodo = async (id: number, content: string): Promise<Todo> => {
        const res = await fetch(`api/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        })
        if (!res.ok) throw new Error("更新失败");
        return res.json()
    }

    const toggleTodo = async (id: number,completed:boolean): Promise<Todo> => {
        const res = await fetch(`api/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });

        if (!res.ok) throw new Error("完成失败");
        return res.json();
    }

    const clearAll = async (): Promise<void> => {
        const res = await fetch("api/todos/clear", { method: "DELETE" });
        if (!res.ok) throw new Error("清空失败")
    }

    return { getTodos, addTodo, deleteTodo, updateTodo, toggleTodo, clearAll }

}