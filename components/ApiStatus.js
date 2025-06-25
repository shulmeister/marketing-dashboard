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
    mailchimp,
    facebook
  })
  const theme = useTheme()

  useEffect(() => {
    const checkApiStatus = async () => {
      // Check Mailchimp status
      try {
        const mailchimpResponse = await fetch('/api/mailchimp')
        if (mailchimpResponse.ok) {
          setApiStatus(prev => ({ ...prev, mailchimp }))
        } else {
          setApiStatus(prev => ({ ...prev, mailchimp }))
        }
      } catch (error) {
        setApiStatus(prev => ({ ...prev, mailchimp }))
      }

      // Check Facebook status
      try {
        const facebookResponse = await fetch('/api/facebook')
        const facebookData = await facebookResponse.json()
        
        if (facebookResponse.ok) {
          setApiStatus(prev => ({ ...prev, facebook }))
        } else if (facebookData.status === 'partial_access') {
          setApiStatus(prev => ({ 
            ...prev, 
            facebook 
          }))
        } else {
          setApiStatus(prev => ({ ...prev, facebook }))
        }
      } catch (error) {
        setApiStatus(prev => ({ ...prev, facebook }))
      }
    }

    checkApiStatus()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected' theme.palette.success
      case 'partial' theme.palette.warning
      case 'error' theme.palette.error
      case 'loading' theme.palette.info
      default theme.palette.grey
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected' <CheckCircle size={16} />
      case 'partial' <AlertTriangle size={16} />
      case 'error' <AlertCircle size={16} />
      case 'loading' <Clock size={16} />
      default null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'connected' 'Connected'
      case 'partial' 'Partial Access'
      case 'error' 'Error'
      case 'loading' 'Checking...'
      default 'Unknown'
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
                  bgcolor(apiStatus.mailchimp.status).main,
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
                (apiStatus.mailchimp.status) || undefined
              }
              label={getStatusText(apiStatus.mailchimp.status)}
              sx={{ 
                color(apiStatus.mailchimp.status).main,
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
                  bgcolor(apiStatus.facebook.status).main,
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
                  (apiStatus.facebook.status) || undefined
                }
                label={getStatusText(apiStatus.facebook.status)}
                sx={{ 
                  color(apiStatus.facebook.status).main,
                  bgcolor: `${getStatusColor(apiStatus.facebook.status).main}20` 
                }}
              />
              
              {apiStatus.facebook.message && (
                <MDTypography 
                  variant="caption" 
                  display="block" 
                  sx={{ 
                    mt: 0.5, 
                    color(apiStatus.facebook.status).main 
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
              bgcolor.palette.action.hover
            }}
          >
            <MDBox display="flex" alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor.palette.grey[500],
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
                color.palette.text.secondary,
                bgcolor.palette.action.selected
              }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
