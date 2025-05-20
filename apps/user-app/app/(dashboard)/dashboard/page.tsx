"use client"
import { Addmoney } from "../../../components/AddMoneyCard";
import { Balance } from "../../../components/BalanceCard";
import { OnRamp } from "../../../components/OnRampTransactions";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // This would need to be fetched from an API endpoint
  
  
  return (
    <div className="flex flex-col px-4 py-6 h-full w-full max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome to MoneyTransfer</h1>
        <p className="opacity-90">Securely send and receive money with ease</p>
        
        {/* Quick Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => window.location.href = "/dashboard/send"}
            className="bg-white text-purple-800 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Send Money
          </button>
          <button 
            onClick={() => window.location.href = "/dashboard/transactions"}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition-colors border border-purple-400"
          >
            View Transactions
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <Balance amount={50} locked={50} />
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <h2 className="text-lg font-bold mb-3">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">This Month</div>
                <div className="text-xl font-bold">₹0</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Received</div>
                <div className="text-xl font-bold">₹0</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <Addmoney />
        </div>
      </div>
      
      {/* Activity Feed */}
     
    </div>
  );
}