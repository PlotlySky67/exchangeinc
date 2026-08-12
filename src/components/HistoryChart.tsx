"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { HistoryPoint } from "@/lib/bnr";

export default function HistoryChart({ points }: { points: HistoryPoint[] }) {
  const values = points.map((p) => p.rate);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.1 || max * 0.02;

  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={points} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          minTickGap={40}
        />
        <YAxis
          domain={[min - pad, max + pad]}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickFormatter={(value: number) => value.toFixed(3)}
          width={60}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--muted)" }}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="var(--brand)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
