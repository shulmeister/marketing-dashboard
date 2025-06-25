'use client'

import { BarChart3, Users, Mail, MousePointer, Settings, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'

const navigation = [
  { name: 'Dashboard', href: '/', icon },
  { name: 'Facebook Ads', href: '/facebook-ads', icon },
  { name: 'Google Ads', href: '/google-ads', icon },
  { name: 'Mailchimp', href: '/mailchimp', icon },
  { name: 'Analytics', href: '/analytics', icon },
  { name: 'Settings', href: '/settings', icon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper'`}}}
    >
      <MDBox p={3} display="flex" alignItems="center">
        <MDTypography variant="h5" fontWeight="bold">
          Marketing Hub
        </MDTypography>
      </MDBox>
      
      <Divider />
      
      <List component="nav" sx={{ px: 2 }}>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = item.icon
          
          return (
            <ListItem key={item.name} disablePadding>
              <Link href={item.href} style={{ width: '100%', textDecoration: 'none' }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    color ? theme.palette.primary.main .palette.text.secondary,
                    backgroundColor ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&'
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color ? theme.palette.primary.main .palette.text.secondary
                  }}>
                    <IconComponent size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight ? 600 : 400
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
