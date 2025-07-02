'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MDBox from './MDBox'
import { useTheme } from '@mui/material/styles'
import MaterialUIControllerProvider, { useMaterialUIController } from '@/context/MaterialUIContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme()
  const controller = useMaterialUIController()
  const { darkMode } = controller.state
  
  return (
    <MDBox 
      display="flex" 
      height="100vh" 
      bgcolor={theme.palette.background.default}
    >
      <Sidebar />
      <MDBox 
        display="flex" 
        flexDirection="column" 
        flexGrow={1} 
        overflow="hidden"
      >
        <Header />
        <MDBox 
          component="main" 
          flexGrow={1} 
          overflow="auto" 
          p={3}
        >
          {children}
        </MDBox>
      </MDBox>
    </MDBox>
  )
}
