"use client";

import * as React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface BudgetBarChartProps {
  data: { budget: string; count: number }[];
}

const colors = ["#818cf8", "#6366f1", "#4f46e5", "#10b981"];

export function BudgetBarChart({ data }: BudgetBarChartProps) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="budget"
            stroke="#64748b"
            fontSize={11}
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
            }}
          />
          <Bar dataKey="count" name="Leads" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
