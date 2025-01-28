import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Addmoney } from "../../../components/AddMoneyCard";
import { Balance } from "../../../components/BalanceCard";
import { OnRamp } from "../../../components/OnRampTransactions";

 async function getBalace(){
    const session = await getServerSession(authOptions);
    const balance  = await prisma.balance.findFirst({
        where:{
            userId : Number(session?.user?.id)
        }
    });
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
 }
 async function getOnRampTransactions(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session?.user?.id)
        }
    });
    return txns.map((t)=>({
        time : t.startTime,
        amount : t.amount,
        status : t.status,
        provider :  t.provider


    }))
 }
export default async function(){
    const balance  = await getBalace();
    const txns = await getOnRampTransactions();
   
    return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-6">
        <div>
            <Addmoney />
        </div>
        <div>
            <Balance amount={balance.amount} locked={balance.locked} />
            <div className="pt-4">
                <OnRamp transactions={txns} />
            </div>
        </div>
    </div>
</div>
}


