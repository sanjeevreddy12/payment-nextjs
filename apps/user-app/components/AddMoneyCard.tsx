"use client"
import { Button } from "@repo/ui/button";
import { Card} from "@repo/ui/card";
import {Center} from "@repo/ui/center";
import {Select} from "@repo/ui/select";
import {TextInput} from "@repo/ui/textInput"

import { useState } from "react";
import { createOnRamp } from "../app/lib/actions/createOnRamptransaction";

const Banks = [{
    name:"HDFC Bank",
    redirectUrl :"https://netbanking.hdfcbank.com"
},{
    name:"Axis Bank",
    redirectUrl : "https://www.axisbank.com/"
}];

export const Addmoney=()=>{
    const [redirectUrl,setrediredtUrl] = useState(Banks[0]?.redirectUrl);
    const [amount , setAmount] = useState(0);
    const [provider,setprovider] = useState(Banks[0]?.name || "");
    return<Card title = "Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder="Amount" onChange={(value)=>{
                setAmount(Number(value))
            }}/>
                <div className="py-4 text-left"> Bank</div>
                <Select onSelect={(value)=>{setrediredtUrl(Banks.find(x=>x.name===value)?.redirectUrl || "")
                    setprovider(Banks.find(x=>x.name===value)?.name||"")
                }} options = {Banks.map(x=>({
                    key: x.name,
                    value : x.name
                }))}></Select>
               
                <div className="flex justify-center pt-4">
                    <Button onClick={ async ()=>{
                       await createOnRamp(provider, amount*100);
                        window.location.href = redirectUrl || "";
                    }}>
                        Add Money
                    </Button>

                </div>
                

        </div>
    </Card>
}


