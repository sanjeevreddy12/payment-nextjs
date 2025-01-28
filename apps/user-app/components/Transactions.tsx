"use client"
import { Card } from "@repo/ui/card";

import React, { useState } from "react";


export const Transactions =  ({
  transactions, id 
}: {
  transactions: {
    amount: number;
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
  }[], id: Number
}) => {
  
  

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
          <div className="flex w-full justify-between my-2" key={index}>
            {t.toUserId=== id ? (
              <div className="flex w-full justify-between my-2">
                <div>
                  <div className="text-sm">Received INR</div>
                  <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  + Rs {t.amount / 100}
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-between my-2">
                <div>
                  <div className="text-sm">Sent INR</div>
                  <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  - Rs {t.amount / 100}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
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
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          {">"}
        </button>
      </div>
    </Card>
  );
};
