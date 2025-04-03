
import type { Todo } from "@/types/todo"


const STORAGE_KEY = "todos";

export function saveTodosToStorage(todos: Todo[]) {
    console.log("保存todos到本地存储", todos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem(STORAGE_KEY);
    console.log("从本地存储获取todos", todos);
    return todos ? JSON.parse(todos) : []
}