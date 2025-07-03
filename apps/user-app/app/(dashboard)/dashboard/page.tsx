import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Balance } from "../../../components/BalanceCard";
import { OnRamp } from "../../../components/OnRampTransactions";
import { Addmoney } from "../../../components/AddMoneyCard";
import { QuickActions } from "../../../components/QuickActions";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}


async function getQuickStats() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    
    
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyTransactions = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ],
            timestamp: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth
            }
        }
    });

    
    const allReceivedTransactions = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: userId
        }
    });

   
    const monthlySent = monthlyTransactions
        .filter(t => t.fromUserId === userId)
        .reduce((sum, t) => sum + t.amount, 0);

   
    const totalReceived = allReceivedTransactions
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        monthlySent,
        totalReceived
    };
}

async function getRecentOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: "desc"
        },
        take: 5 
    });
    return txns.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

export default async function HomePage() {
    const balance = await getBalance();
    const quickStats = await getQuickStats();
    const recentTransactions = await getRecentOnRampTransactions();

    return (
        <div className="flex flex-col px-4 py-6 h-full w-full max-w-6xl mx-auto">
            
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-xl p-6 mb-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-2">Welcome to MoneyTransfer</h1>
                <p className="opacity-90">Securely send and receive money with ease</p>
                
             
                <QuickActions />
            </div>
            
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div className="flex flex-col gap-6">
                    <Balance amount={balance.amount} locked={balance.locked} />
                    <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                        <h2 className="text-lg font-bold mb-3">Quick Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-600">This Month Sent</div>
                                <div className="text-xl font-bold">₹{(quickStats.monthlySent / 100).toFixed(2)}</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-600">Total Received</div>
                                <div className="text-xl font-bold">₹{(quickStats.totalReceived / 100).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
               
                <div className="flex flex-col gap-6">
                    <Addmoney />
                   
                    <OnRamp transactions={recentTransactions} />
                </div>
            </div>
        </div>
    );
}