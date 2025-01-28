import { Addmoney } from "../../../components/AddMoneyCard";
import { Balance } from "../../../components/BalanceCard";

export default function(){
    return (<div className="grid grid-cols-2 gap-10 p-2 h-full">
       <Addmoney/>
       <Balance  amount={50} locked={50}/>
      
    </div>

    )
}