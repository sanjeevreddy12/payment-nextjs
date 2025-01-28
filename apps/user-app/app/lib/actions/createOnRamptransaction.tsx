"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async  function createOnRamp (provider: string,  amount : number){

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token= Math.random().toString();
    if(!userId){
        return{
            message : "User not logged In"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
           userId : Number(userId),
           amount: amount,
           status : "processing",
           startTime : new Date(),
           provider,
           token : token


        }
    })
    return ({
        message : "On ramp Transaction added"
    })

}