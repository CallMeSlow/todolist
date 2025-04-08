
import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'



export async function PUT(request:Request,{params}:{params:{id:string}}){
    const {content,completed} = await request.json()
    console.log('更新的数据是：',content+"   "+ completed)
    const updatedTodo = await prisma.todo.update({
        where:{id:params.id},
        data:{
            ...(content!==undefined &&{content}),
            ...(completed !==undefined &&{completed})
        },
    });
    return NextResponse.json(updatedTodo);
}

export async function DELETE(_:Request,{params}:{params:{id:string}}){
    await prisma.todo.delete({
        where: {id:params.id},
    });
    return NextResponse.json({message:"删除成功"})
}