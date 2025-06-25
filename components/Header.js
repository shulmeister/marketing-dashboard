'use client'

import { Bell, Search, Sun, Moon, User } from 'lucide-react'
import MDBox from './MDBox'
import MDTypography from './MDTypography'
import MDButton from './MDButton'
import { AppBar, Toolbar, InputBase, IconButton, Avatar, Badge, Tooltip } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useMaterialUIController } from '@/context/MaterialUIContext'

export default function Header() {
  const theme = useTheme()
  const controller = useMaterialUIController()
  const { darkMode } = controller.state
  const toggleColorMode = () => {
    controller.dispatch({ type: "DARKMODE", value: !darkMode })
  }
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        <MDBox 
          display="flex" 
          alignItems="center" 
          sx={{
            position: 'relative',
            bgcolor: alpha(theme.palette.common.black, 0.05),
            borderRadius: 2,
            p: '0 16px',
            maxWidth: 400,
            width: '100%',
            mr: 2
          }}
        >
          <Search className="h-5 w-5 text-gray-400" />
          <InputBase
            placeholder="Search campaigns, metrics..."
            sx={{
              ml: 2,
              flex: 1,
              py: 1,
              '& .MuiInputBase-input': {}
            }}
          />
        </MDBox>
        <MDBox flexGrow={1} />
        <MDBox display="flex" alignItems="center" gap={2}>
          <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>
          <MDBox display="flex" alignItems="center" gap={2}>
            <MDBox display="flex" flexDirection="column" alignItems="flex-end">
              <MDTypography variant="body2" fontWeight="medium">John Doe</MDTypography>
              <MDTypography variant="caption" color="textSecondary">Marketing Manager</MDTypography>
            </MDBox>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <User size={18} />
            </Avatar>
          </MDBox>
        </MDBox>
      </Toolbar>
    </AppBar>
  )
}
