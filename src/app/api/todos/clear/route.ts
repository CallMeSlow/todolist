import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(){
    await prisma.todo.deleteMany();

    return NextResponse.json({message:"已清空所有的任务"})
}