"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import { Center } from "@repo/ui/center";
import { useState } from "react";
import { tranfer } from "../app/lib/actions/transfer";

export function Sendmoney() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    const handleTransfer = async () => {
        // Clear previous messages
        setMessage("");
        
        // Validate input
        if (!number || !number.trim()) {
            setMessage("Please enter a valid phone number");
            setMessageType("error");
            return;
        }
        
        const amountValue = Number(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            setMessage("Please enter a valid amount greater than 0");
            setMessageType("error");
            return;
        }
        
        try {
            setIsLoading(true);
            const result = await tranfer(number, amountValue * 100);
            
            if (result.success) {
                setMessage(result.message || "Money sent successfully!");
                setMessageType("success");
                // Clear inputs on success
                setNumber("");
                setAmount("");
            } else {
                setMessage(result.message || "Failed to send money");
                setMessageType("error");
                
            }
        } catch (error:any) {
            setMessage("Error: " + (error.message || "Something went wrong"));
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[90vh] w-full">
            <Center>
                <Card title="Send Money">
                    {message && (
                        <div className={`mb-4 p-2 rounded ${
                            messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                            {message}
                        </div>
                    )}

                    <TextInput 
                        label="Number" 
                        placeholder="Phone Number" 
                        value={number}
                        onChange={setNumber}
                    />
                    
                    <TextInput 
                        label="Amount" 
                        placeholder="Amount in INR" 
                        value={amount}
                        onChange={setAmount}
                    />
                    
                    <div className="pt-4 flex justify-center">
                        <Button 
                            onClick={handleTransfer}
                            //@ts-ignore
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send"}
                        </Button>
                    </div>
                </Card>
            </Center>
        </div>
    );
}