
import type { Todo } from "@/types/todo"


const STORAGE_KEY = "todos";

export function saveTodosToStorage(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : []
}