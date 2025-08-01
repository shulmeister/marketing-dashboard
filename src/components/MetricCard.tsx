'use client'

import { LucideIcon } from 'lucide-react'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import { Card, CardContent, Skeleton } from '@mui/material'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useTheme } from '@mui/material/styles'

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  loading?: boolean
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  loading = false 
}: MetricCardProps) {
  const theme = useTheme()
  
  const changeColor = {
    positive: theme.palette.success.main,
    negative: theme.palette.error.main,
    neutral: theme.palette.text.secondary
  }[changeType]
  
  const ChangeIcon = changeType === 'positive' ? TrendingUp : 
                   changeType === 'negative' ? TrendingDown : null

  if (loading) {
    return (
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <MDBox display="flex" justifyContent="space-between" mb={2}>
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="circular" width={24} height={24} />
          </MDBox>
          <Skeleton variant="text" width={120} height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={80} height={20} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <MDTypography variant="body2" color="textSecondary" fontWeight="medium">
            {title}
          </MDTypography>
          <Icon size={20} color={theme.palette.text.secondary} />
        </MDBox>
        
        <MDTypography variant="h4" fontWeight="bold" mb={0.5}>
          {value}
        </MDTypography>
        
        <MDBox display="flex" alignItems="center">
          {ChangeIcon && (
            <ChangeIcon size={16} color={changeColor} style={{ marginRight: 4 }} />
          )}
          <MDTypography variant="caption" fontWeight="medium" sx={{ color: changeColor }}>
            {change} from last month
          </MDTypography>
        </MDBox>
      </CardContent>
    </Card>
  )
}
