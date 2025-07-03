"use client"
import { useRouter } from "next/navigation";

export function QuickActions() {
    const router = useRouter();
    
    return (
        <div className="flex gap-4 mt-4">
            <button 
                onClick={() => router.push("/transfer")}
                className="bg-white text-purple-800 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
                Send Money
            </button>
            <button 
                onClick={() => router.push("/transactions")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition-colors border border-purple-400"
            >
                View Transactions
            </button>
        </div>
    );
}