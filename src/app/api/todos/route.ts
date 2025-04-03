import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from "fs";
import { join } from "path";
import { Todo } from '@/types/todo';


// 定义JSON文件路径
const filePath = join(process.cwd(), "src/data/todos.json");

// 读书JSON文件
async function readTodos() {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

// 写入JSON文件
async function writeTodos(todos: any[]) {
    await fs.writeFile(filePath, JSON.stringify(todos, null, 2))
}



export async function GET() {
    const todos = await readTodos()
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const { text } = await req.json()
    const todos = await readTodos();
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
    }
    todos.push(newTodo);
    await writeTodos(todos);
    return NextResponse.json(newTodo, { status: 201 });
}


export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const deleteAll = url.searchParams.get("all") === "true"
    if (deleteAll) {
        await writeTodos([])
        return NextResponse.json({ success: true });
    }

    const { id } = await req.json();
    console.log("删除的数据id是：", id);

    const todos = await readTodos();
    const updates = todos.filter((todo: any) => todo.id !== id);
    console.log("删除后的数据是", updates)
    await writeTodos(updates)
    return NextResponse.json({ success: true })
}

export async function PUT(req: Request) {
    const { id, text } = await req.json();
    const todos = await readTodos();

    const updateTodos = todos.map((todo: any) => {
        if (todo.id === id) {
            return {
                ...todo,
                ...(text != undefined ? { text } : {}),
                completed: text === undefined ? !todo.completed : todo.completed,
            };
        } else {
            return todo;
        }
    });
    await writeTodos(updateTodos);
    const updateItem = updateTodos.find((todo: any) => todo.id === id);
    return NextResponse.json(updateItem);
}