
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type StatusCount = {
  name: string;
  value: number;
  color: string;
};

type StatusChartProps = {
  data: StatusCount[];
};

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} Applications`, 'Count']}
            contentStyle={{ 
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
