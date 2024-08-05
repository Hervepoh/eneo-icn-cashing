"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { formatDateRange } from "@/lib/utils";

import { useGetSummary } from "@/features/summary/api/use-get-summay";
import { Chart, ChartLoading } from "@/components/chart";
import { Pie, PieLoading } from "@/components/graph";


export const DataCharts = () => {

  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <PieLoading />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart
          data={data?.days}
        />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <Pie
          data={data?.categories}
        />
      </div>
    </div>
  )
}
