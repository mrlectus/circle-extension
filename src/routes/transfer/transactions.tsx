import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatAddress } from "@/lib/utils";
import { T } from "@/services/api/transactions/schema";
import { ArrowDown, ArrowUp } from "lucide-react";
import { match } from "ts-pattern";

export const Transactions = ({ transaction }: { transaction: T }) => {
  return (
    <Card className="bg-[#262628] text-xs flex flex-col justify-center">
      <CardContent className="flex flex-col mt-2 gap-1">
        {match(transaction.state)
          .with("COMPLETE", () => (
            <Badge className="w-fit h-4 text-[#008339] bg-[#E2FDF2]">
              Complete
            </Badge>
          ))
          .with("FAILED", () => (
            <Badge className="w-fit h-4 text-[#BC0016] bg-[#BC0016]/30">
              Failed
            </Badge>
          ))
          .with("CONFIRMED", () => (
            <Badge className="w-fit h-4  text-[#007363] bg-[#0073C3]/30">
              Confirmed
            </Badge>
          ))
          .with("INITIATED", () => (
            <Badge className="w-fit h-4">Initiated</Badge>
          ))
          .otherwise(() => null)}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div>
              {match(transaction.transactionType)
                .with("OUTBOUND", () => (
                  <div className="flex items-center  gap-1">
                    <ArrowUp className="w-4 h-4 bg-red-600 rounded-full" />
                    <div>
                      <p>Transfer Outbound</p>
                      <p>To: {formatAddress(transaction.destinationAddress)}</p>
                    </div>
                  </div>
                ))
                .with("INBOUND", () => (
                  <div className="flex items-center  gap-1">
                    <ArrowDown className="w-4 h-4 bg-green-600 rounded-full" />
                    <div>
                      <p>Transfer Inbound</p>
                      <p>
                        From: {formatAddress(transaction.destinationAddress)}
                      </p>
                    </div>
                  </div>
                ))
                .otherwise(() => null)}
            </div>
          </div>
          <div>{transaction.amounts[0]} USD</div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex flex-row justify-between gap-10">
          <span>Network Fee</span>
          <span>{Number(transaction.networkFee).toFixed(6)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
