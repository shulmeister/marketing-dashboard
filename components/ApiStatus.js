'use client'

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

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState({
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
            facebook: { status: 'partial', message: 'Missing ads_read permission. Add Marketing API to your Facebook app.' }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return theme.palette.success.main
      case 'partial':
        return theme.palette.warning.main
      case 'error':
        return theme.palette.error.main
      case 'loading':
        return theme.palette.info.main
      default:
        return theme.palette.grey[500]
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <CheckCircle size={16} />
      case 'partial':
        return <AlertTriangle size={16} />
      case 'error':
        return <AlertCircle size={16} />
      case 'loading':
        return <Clock size={16} />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'partial':
        return 'Partial Access'
      case 'error':
        return 'Error'
      case 'loading':
        return 'Checking...'
      default:
        return 'Unknown'
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
              border: `1px solid ${getStatusColor(apiStatus.mailchimp.status)}20`,
              bgcolor: `${getStatusColor(apiStatus.mailchimp.status)}10`
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(apiStatus.mailchimp.status),
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
                : getStatusIcon(apiStatus.mailchimp.status)
              }
              label={getStatusText(apiStatus.mailchimp.status)}
              sx={{ 
                color: getStatusColor(apiStatus.mailchimp.status),
                bgcolor: `${getStatusColor(apiStatus.mailchimp.status)}20` 
              }}
            />
          </ListItem>
          {/* Facebook API Status */}
          <ListItem 
            sx={{ 
              mb: 1, 
              p: 2, 
              borderRadius: 2, 
              border: `1px solid ${getStatusColor(apiStatus.facebook.status)}20`,
              bgcolor: `${getStatusColor(apiStatus.facebook.status)}10`
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(apiStatus.facebook.status),
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
                  : getStatusIcon(apiStatus.facebook.status)
                }
                label={getStatusText(apiStatus.facebook.status)}
                sx={{ 
                  color: getStatusColor(apiStatus.facebook.status),
                  bgcolor: `${getStatusColor(apiStatus.facebook.status)}20` 
                }}
              />
              {apiStatus.facebook.message && (
                <MDTypography 
                  variant="caption" 
                  display="block" 
                  sx={{ 
                    mt: 0.5, 
                    color: getStatusColor(apiStatus.facebook.status) 
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
