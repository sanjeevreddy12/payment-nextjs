"use client"
import { Card } from "@repo/ui/card";
export const OnRamp= ({transactions} : {
    transactions : {
        time : Date,
        amount : number,
        status : string,
        provider : string
    }[]
})=>{
    if(!transactions.length){
        return(
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">


                </div>
            </Card>
        )

    }
    return(
        <Card title = "Recent Transactions">
            <div className="pt-2">
                {transactions.map(t=><div className="flex justify-between">
                    <div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}</div>
                            </div>
                             <div className="flex flex-col justify-center">
                                +Rs {t.amount/100}
                               
                                </div>
                                </div>)}
            </div>
        </Card>
    )


}