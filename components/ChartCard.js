'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import { Card, CardContent, CardHeader, Skeleton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function ChartCard({ 
  title, 
  data, 
  chartType = 'line',
  loading = false 
}) {
  const theme = useTheme()
  // Custom colors for charts based on the theme
  const colors = {
    spend: theme.palette.primary.main,
    revenue: theme.palette.success.main,
    roas: theme.palette.warning.main,
    impressions: theme.palette.info.main,
    clicks: theme.palette.secondary.main
  };
  const pieColors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.secondary.main
  ];
  if (loading) {
    return (
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardHeader title={<Skeleton variant="text" width={150} />} />
        <CardContent>
          <Skeleton variant="rectangular" height={300} />
        </CardContent>
      </Card>
    );
  }
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data} width={500} height={300}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: theme.palette.divider }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis 
              axisLine={{ stroke: theme.palette.divider }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8
              }} 
            />
            <Legend />
            <Bar dataKey="spend" fill={colors.spend} name="Spend" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill={colors.revenue} name="Revenue" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill={theme.palette.primary.main}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={data} width={500} height={300}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: theme.palette.divider }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis 
              axisLine={{ stroke: theme.palette.divider }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke={colors.spend} name="Spend" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke={colors.revenue} name="Revenue" strokeWidth={2} />
          </LineChart>
        );
    }
  };
  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardHeader 
        title={
          <MDTypography variant="h6" fontWeight="medium">
            {title}
          </MDTypography>
        }
      />
      <CardContent>
        <MDBox height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </MDBox>
      </CardContent>
    </Card>
  );
}
