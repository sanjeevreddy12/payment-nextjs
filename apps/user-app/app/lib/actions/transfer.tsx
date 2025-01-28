"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { timeStamp } from "console";


export async function tranfer( to : string , amount : number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return{
            message : "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where:{
            number : to
        }

    });
    if(!toUser){
        return {
            message : "User not existed"
        }
    }
    await prisma.$transaction(async (t)=>{
        await t.$queryRaw`select * from "Balance" where "userId" = ${Number(from)} for update`;
        const frombalance = await t.balance.findUnique({
            where : {
                userId : Number(from)
            }

        })
        if(!frombalance || frombalance.amount < amount){
            throw new Error("Insufficient Balance");
        }
        
        await t.balance.update({
            where : {
                userId : Number(from)

            },
            data : {amount:{
                decrement:amount
            }}
        })
        await t.balance.update({
            where:{
                userId : toUser.id
            },
            data:{
                amount : {
                    increment : amount
                }
            }
        })
        await t.p2pTransfer.create({
            data:{
                fromUserId : Number(from),
                toUserId:toUser.id,
                amount,
                timestamp : new Date()

            }
    })
    })

} 