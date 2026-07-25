"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface MonthlyLeadsChartProps {
  data: { month: string; leads: number; closed: number }[];
}

export function MonthlyLeadsChart({ data }: MonthlyLeadsChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="closedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#1e293b" }}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#1e293b" }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "#1e293b",
              borderRadius: "12px",
              color: "#f8fafc",
              fontSize: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            }}
          />
          <Area
            type="monotone"
            dataKey="leads"
            name="Total Leads"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#leadsGradient)"
          />
          <Area
            type="monotone"
            dataKey="closed"
            name="Closed Deals"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#closedGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
