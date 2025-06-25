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
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Facebook Ads', href: '/facebook-ads', icon: BarChart3 },
  { name: 'Google Ads', href: '/google-ads', icon: MousePointer },
  { name: 'Mailchimp', href: '/mailchimp', icon: Mail },
  { name: 'Analytics', href: '/analytics', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
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
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
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
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary
                  }}>
                    <IconComponent size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400
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
