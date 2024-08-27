"use client";

import { Chart, ChartLoading } from "@/components/chart";
import { Pie, PieLoading } from "@/components/graph";
import { useGetSummary } from "@/features/summary/api/use-get-summary";


export const DataCharts = () => {

  // const { data, isLoading } = useGetSummary();
  const isLoading = true;
  const data = {
    days: [],
    categories: [],
  };
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
