"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import { Center} from "@repo/ui/center";
import { useState } from "react";
import { tranfer } from "../app/lib/actions/transfer";

export function Sendmoney(){
    const [ number,setNumber] = useState("");
    const [amount,setAmount] = useState("");
    return(
        <div className="h-[90vh] w-full ">
            <Center>
                <Card title="Send Money">
                    <TextInput label="Number" placeholder="Number" onChange={(v)=>{
                        setNumber(v);
                    }}>
                        

                    </TextInput>
                    <TextInput label="Amount" placeholder="Amount" onChange={(v)=>{
                        setAmount(v);
                    }}>

                    </TextInput>
                    <div className="pt-4 flex justify-center">
                        
                        <Button onClick={ async()=>{
                            await tranfer(number , Number(amount)*100)

                        }}>
                            
                        
                            Send
                        </Button>
                    </div>

                </Card>
            </Center>

        </div>
    )
}
