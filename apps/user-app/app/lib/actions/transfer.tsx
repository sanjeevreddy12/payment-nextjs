"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { timeStamp } from "console";

export async function tranfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    console.log("from", from);

    if (!from) {
        return {
            success: false,
            message: "Not authenticated. Please login again."
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            success: false,
            message: "Recipient user does not exist"
        };
    }
    try {
        await prisma.$transaction(async (t) => {
            await t.$queryRaw`select * from "Balance" where "userId" = ${Number(from)} for update`;
            const frombalance = await t.balance.findUnique({
                where: {
                    userId: Number(from)
                }

            })
            if (!frombalance || frombalance.amount < amount) {
                alert("insufficiet balance")
                throw new Error("Insufficient Balance");
            }

            await t.balance.update({
                where: {
                    userId: Number(from)

                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })
            await t.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })
            await t.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date()

                }
            })
            console.log("transaction completed")
        })
        return {
            success: true,
            message: "Money sent successfully"
        };
    }
    catch (error: any) {
        console.error("Transfer error:", error);
        return {
            success: false,
            message: error.message || "Transfer failed. Please try again."
        };

    }

} 