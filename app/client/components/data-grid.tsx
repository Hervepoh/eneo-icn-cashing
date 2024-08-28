"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { DataCard, DataCardLoading } from "@/components/data-card";
import { Suspense } from "react";



export const DataGrid= () => {

   const { data, isLoading } = useGetSummary();
   console.log(data)
  // const isLoading = true;
  // const data = {
  //   transactions: {initiated:0 , pending:0 , processing:0 , treated:0},
  //   incomeChange:0,
  //   expensesChange:0,
  //   remainingChange: 0,
  //   dateRangeLabel: "",
  // };
  // if (isLoading) {
  //   return (
  //     <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-2 mb-8">
  //       {
  //         [1, 2, 3 , 4].map((i) => <DataCardLoading key={i} />)
  //       }
  //     </div >
  //   )
  // }
  // console.log(data)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-2 mb-8">
      <DataCard
        title= "RequestCount"//"Initiated"
        value={data?.transactions.initiated || 0}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={data?.dateRangeLabel}
      />

      <DataCard
        title="TotalRequest"//"Pending validation"
        value={data?.transactions.pending || 0}
        percentageChange={data?.remainingChange}
        icon={MdPendingActions}
        variant="danger"
        dateRange={data?.dateRangeLabel}
      />

      <DataCard
        title="Amount"//"Processing"
        value={data?.transactions.processing || 0}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={data?.dateRangeLabel}
      />

      <DataCard
        title="Treated"
        value={data?.transactions.treated || 0}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={data?.dateRangeLabel}
      />


    </div>
  )
}

 