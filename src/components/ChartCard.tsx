'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import { Card, CardContent, CardHeader, Skeleton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface ChartCardProps {
  title: string
  data: any[]
  chartType?: 'line' | 'bar' | 'pie'
  loading?: boolean
}

export default function ChartCard({ 
  title, 
  data, 
  chartType = 'line',
  loading = false 
}: ChartCardProps) {
  const theme = useTheme()
  
  // Custom colors for charts based on the theme
  const colors = {
    spend: theme.palette.primary.main,
    revenue: theme.palette.success.main,
    roas: theme.palette.warning.main,
    impressions: theme.palette.info.main,
    clicks: theme.palette.secondary.main
  }
  
  const pieColors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.secondary.main
  ]

  if (loading) {
    return (
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardHeader title={<Skeleton variant="text" width={150} />} />
        <CardContent>
          <Skeleton variant="rectangular" height={300} />
        </CardContent>
      </Card>
    )
  }

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
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
        )
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill={theme.palette.primary.main}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8
              }}
            />
          </PieChart>
        )
      default:
        return (
          <LineChart data={data}>
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
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke={colors.spend} 
              activeDot={{ r: 6 }}
              name="Spend" 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke={colors.revenue} 
              activeDot={{ r: 6 }}
              name="Revenue" 
            />
            <Line 
              type="monotone" 
              dataKey="roas" 
              stroke={colors.roas} 
              activeDot={{ r: 6 }}
              name="ROAS" 
            />
          </LineChart>
        )
    }
  }

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
  )
}
