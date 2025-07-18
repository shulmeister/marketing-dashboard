'use client'
// Fixed TypeScript display prop error - moved to sx prop

import { useEffect, useState } from 'react'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import { 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  Box,
  Chip,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CheckCircle, AlertCircle, Clock, AlertTriangle } from 'lucide-react'

interface ApiStatus {
  mailchimp: { status: 'connected' | 'error' | 'loading'; message?: string }
  facebook: { status: 'connected' | 'error' | 'partial' | 'loading'; message?: string }
}

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    mailchimp: { status: 'loading' },
    facebook: { status: 'loading' }
  })
  const theme = useTheme()

  useEffect(() => {
    const checkApiStatus = async () => {
      // Check Mailchimp status
      try {
        const mailchimpResponse = await fetch('/api/mailchimp')
        if (mailchimpResponse.ok) {
          setApiStatus(prev => ({ ...prev, mailchimp: { status: 'connected' } }))
        } else {
          setApiStatus(prev => ({ ...prev, mailchimp: { status: 'error', message: 'Failed to connect' } }))
        }
      } catch (error) {
        setApiStatus(prev => ({ ...prev, mailchimp: { status: 'error', message: 'Connection failed' } }))
      }

      // Check Facebook status
      try {
        const facebookResponse = await fetch('/api/facebook')
        const facebookData = await facebookResponse.json()
        
        if (facebookResponse.ok) {
          setApiStatus(prev => ({ ...prev, facebook: { status: 'connected' } }))
        } else if (facebookData.status === 'partial_access') {
          setApiStatus(prev => ({ 
            ...prev, 
            facebook: { 
              status: 'partial', 
              message: 'Missing ads_read permission. Add Marketing API to your Facebook app.' 
            } 
          }))
        } else {
          setApiStatus(prev => ({ ...prev, facebook: { status: 'error', message: facebookData.error || 'Failed to connect' } }))
        }
      } catch (error) {
        setApiStatus(prev => ({ ...prev, facebook: { status: 'error', message: 'Connection failed' } }))
      }
    }

    checkApiStatus()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return theme.palette.success
      case 'partial': return theme.palette.warning
      case 'error': return theme.palette.error
      case 'loading': return theme.palette.info
      default: return theme.palette.grey
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} />
      case 'partial': return <AlertTriangle size={16} />
      case 'error': return <AlertCircle size={16} />
      case 'loading': return <Clock size={16} />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected'
      case 'partial': return 'Partial Access'
      case 'error': return 'Error'
      case 'loading': return 'Checking...'
      default: return 'Unknown'
    }
  }

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardHeader 
        title={
          <MDTypography variant="h6" fontWeight="medium">
            API Connection Status
          </MDTypography>
        }
      />
      
      <CardContent>
        <List disablePadding>
          {/* Mailchimp API Status */}
          <ListItem 
            sx={{ 
              mb: 1, 
              p: 2, 
              borderRadius: 2, 
              border: `1px solid ${getStatusColor(apiStatus.mailchimp.status).main}20`,
              bgcolor: `${getStatusColor(apiStatus.mailchimp.status).main}10`
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(apiStatus.mailchimp.status).main,
                  mr: 1.5
                }}
              />
              <MDTypography variant="body2" fontWeight="medium">
                Mailchimp API
              </MDTypography>
            </MDBox>
            
            <Chip
              size="small"
              icon={apiStatus.mailchimp.status === 'loading' 
                ? <CircularProgress size={12} color="inherit" /> 
                : getStatusIcon(apiStatus.mailchimp.status) || undefined
              }
              label={getStatusText(apiStatus.mailchimp.status)}
              sx={{ 
                color: getStatusColor(apiStatus.mailchimp.status).main,
                bgcolor: `${getStatusColor(apiStatus.mailchimp.status).main}20` 
              }}
            />
          </ListItem>
          
          {/* Facebook API Status */}
          <ListItem 
            sx={{ 
              mb: 1, 
              p: 2, 
              borderRadius: 2, 
              border: `1px solid ${getStatusColor(apiStatus.facebook.status).main}20`,
              bgcolor: `${getStatusColor(apiStatus.facebook.status).main}10`
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(apiStatus.facebook.status).main,
                  mr: 1.5
                }}
              />
              <MDTypography variant="body2" fontWeight="medium">
                Facebook Ads API
              </MDTypography>
            </MDBox>
            
            <MDBox textAlign="right">
              <Chip
                size="small"
                icon={apiStatus.facebook.status === 'loading' 
                  ? <CircularProgress size={12} color="inherit" /> 
                  : getStatusIcon(apiStatus.facebook.status) || undefined
                }
                label={getStatusText(apiStatus.facebook.status)}
                sx={{ 
                  color: getStatusColor(apiStatus.facebook.status).main,
                  bgcolor: `${getStatusColor(apiStatus.facebook.status).main}20` 
                }}
              />
              
              {apiStatus.facebook.message && (
                <MDTypography 
                  variant="caption" 
                  sx={{ 
                    display: "block",
                    mt: 0.5, 
                    color: getStatusColor(apiStatus.facebook.status).main 
                  }}
                >
                  {apiStatus.facebook.message}
                </MDTypography>
              )}
            </MDBox>
          </ListItem>
          
          {/* Google Ads API Status - Coming Soon */}
          <ListItem 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.action.hover
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: theme.palette.grey[500],
                  mr: 1.5
                }}
              />
              <MDTypography variant="body2" fontWeight="medium">
                Google Ads API
              </MDTypography>
            </MDBox>
            
            <Chip
              size="small"
              label="Coming Soon"
              sx={{ 
                color: theme.palette.text.secondary,
                bgcolor: theme.palette.action.selected
              }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
