import prisma from "@repo/db/client";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Transactions } from "../../../components/Transactions";


const transaction = async () => {
  const session = await getServerSession(authOptions);
  console.log("hiiiiiiiiiiiiiii")
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
};

export default async function () {
  const transactions = await transaction();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  
  return (
    <div className="flex justify-center items-center w-[80vw] gap-20">
      
      <div className="w-[60%]">
        <Transactions transactions={transactions} id = {userId}/>
      </div>
    </div>
  );
}