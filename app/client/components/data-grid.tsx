"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { DataCard, DataCardLoading } from "@/components/data-card";



export const DataGrid = () => {
  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  console.log("from", from, "to", to);

  const dateRangeLabel = formatDateRange({ from, to });

  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-2 mb-8">
        {
          [1, 2, 3 , 4].map((i) => <DataCardLoading key={i} />)
        }
      </div >
    )
  }

  const getdata = (status: string,objArr: {_id:string , count: number}[]) =>{
    if (objArr) {
      const matchObj = objArr.find(obj => obj._id === status)
       return matchObj ? matchObj.count : 0;
    }
    
  }
  console.log("requestCountByStatus",data?.requestCountByStatus)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-2 mb-8">
      <DataCard
        title="Initiated"
        value={getdata("initiated",data?.requestCountByStatus)}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />

      <DataCard
        title="Pending validation"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={MdPendingActions}
        variant="danger"
        dateRange={dateRangeLabel}
      />

      <DataCard
        title="Processing"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={dateRangeLabel}
      />

      <DataCard
        title="Treated"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={dateRangeLabel}
      />


    </div>
  )
}
