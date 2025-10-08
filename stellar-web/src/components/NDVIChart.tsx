import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const mockNDVIData = [
  { month: "Jul", ndvi: 0.45 },
  { month: "Aug", ndvi: 0.62 },
  { month: "Sep", ndvi: 0.75 },
  { month: "Oct", ndvi: 0.82 },
  { month: "Nov", ndvi: 0.78 },
  { month: "Dec", ndvi: 0.68 },
];

const NDVIChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={mockNDVIData}>
        <defs>
          <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px', fontFamily: 'Space Mono' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          domain={[0, 1]}
          style={{ fontSize: '12px', fontFamily: 'Space Mono' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontFamily: 'Space Mono',
          }}
        />
        <Area 
          type="monotone" 
          dataKey="ndvi" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          fill="url(#ndviGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NDVIChart;
