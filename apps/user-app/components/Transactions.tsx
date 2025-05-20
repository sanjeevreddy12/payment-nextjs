"use client"
import { Card } from "@repo/ui/card";

import React, { useState } from "react";


export const Transactions = ({
  transactions, id
}: {
  transactions: {
    amount: number;
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
  }[], id: Number
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };




  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Pagination Logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div>
        {displayedTransactions.map((t, index) => (
          <div
            className={`flex w-full justify-between my-2 p-3 rounded-lg ${t.toUserId === id ? "bg-green-50" : "bg-red-50"
              }`}
            key={index}
          >
            {t.toUserId === id ? (
              <div className="flex w-full justify-between my-2">
                <div>
                  <div className="text-sm font-medium">Received INR</div>
                  <div className="text-slate-600 text-xs">
                    {formatDate(t.timestamp)}
                  </div>
                </div>
                <div className="flex flex-col justify-center text-green-600 font-bold">
                  + ₹{(t.amount / 100).toFixed(2)}
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-between my-2">
                <div>
                  <div className="text-sm font-medium">Sent INR</div>
                  <div className="text-slate-600 text-xs">
                    {formatDate(t.timestamp)}
                  </div>
                </div>
                <div className="flex flex-col justify-center text-red-600 font-bold">
                  - ₹{(t.amount / 100).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
        >
          {"<"}
        </button>
        <span className="mx-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
        >
          {">"}
        </button>
      </div>
    </Card>
  );
};
