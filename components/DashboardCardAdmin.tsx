import React from "react";
import LineChart01 from "./LineChart";

interface DashboardCardProps {
  icon: any;
  title: string;
  desc: string;
  total: number;
  percent: string;
  labels: Array<string>;
  data: Array<number>;
}

function DashboardCard({
  icon,
  title,
  desc,
  total,
  percent,
  labels,
  data,
}: DashboardCardProps) {
  const rever1 = total !== 0 ? total : 10;
  const rever2 = total !== 0 ? total - 1 : 12;
  const rever3 = total !== 0 ? total + 1 : 11;
  const rever4 = total !== 0 ? total + 2 : 10;
  const rever5 = total !== 0 ? total + 4 : 8;
  const rever6 = total !== 0 ? total + 6 : 6;
  const rever7 = total !== 0 ? total + 8 : 4;
  const rever8 = total !== 0 ? total + 10 : 2;
  const rever9 = total !== 0 ? total + 11 : 1;
  const rever10 = total !== 0 ? total + 12 : 1;

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          rever1,
          rever2,
          rever2,
          rever4,
          rever4,
          rever7,
          rever7,
          rever7,
          rever8,
          rever8,
          rever10,
          rever10,
        ],
        fill: true,
        backgroundColor: "#3b3b3b",
        borderColor: "#fff",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 0,
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#A1A1A1",
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className='flex flex-col bg-[#1f1f1f] overflow-hidden text-white shadow-lg rounded-lg border'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between items-start mb-2'>
          <div className='text-4xl'>{icon}</div>
        </header>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <div className='text-xs font-semibold uppercase mb-1'>{desc}</div>
        <div className='flex items-start'>
          <div className='text-3xl font-bold mr-2'>
            {total}{" "}
            {title === "Refferal" ? (
              <span className='text-base'>members</span>
            ) : (
              ""
            )}
          </div>
          <div className='text-sm font-semibold  px-1.5 bg-emerald-500 rounded-full'>
            {percent}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className='grow max-sm:max-h-[128px] xl:max-h-[128px]'>
        {/* Change the height attribute to adjust the chart height */}
        <LineChart01 data={chartData} width={400} height={120} />
      </div>
    </div>
  );
}

export default DashboardCard;
