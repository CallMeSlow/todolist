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
        return res.json();
    }

    const deleteTodo = async (id: number): Promise<void> => {
        const res = await fetch("api/todos", {
            method: "DELETE",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("删除失败");
    }


    const updateTodo = async (id: number, text: string): Promise<Todo> => {
        const res = await fetch("api/todos", {
            method: "PUT",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ id, text }),
        })
        if (!res.ok) throw new Error("更新失败");
        return res.json()
    }

    const toggleTodo = async (id: number): Promise<Todo> => {
        const res = await fetch("api/todos", {
            method: "PUT",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("完成失败");
        return res.json();
    }

    const clearAll = async (): Promise<void> => {
        const res = await fetch("api/todos?all=true", { method: "DELETE" });
        if (!res.ok) throw new Error("清空失败")
    }

    return { getTodos, addTodo, deleteTodo, updateTodo, toggleTodo, clearAll }

}