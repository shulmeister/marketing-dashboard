<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Marketing Dashboard Project Instructions

This is a Next.js marketing dashboard application that integrates with multiple marketing platforms:

## Project Overview
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Icons**: Lucide React

## Platform Integrations
- **Facebook Ads API**: For campaign performance, spend, and metrics
- **Mailchimp API**: For email marketing analytics and subscriber data
- **Google Ads API**: For Google advertising performance (future implementation)
- **Google Analytics API**: For website analytics and conversion tracking (future implementation)

## Key Features
- Real-time marketing metrics dashboard
- Interactive charts and data visualizations
- Responsive design for desktop and mobile
- Dark/light mode support
- Platform-specific performance breakdowns

## Code Style Guidelines
- Use TypeScript for all components and utilities
- Follow React functional component patterns with hooks
- Use Tailwind CSS classes for styling
- Implement proper error handling for API calls
- Use proper TypeScript interfaces for data structures
- Follow Next.js App Router conventions

## API Integration Notes
- All API integrations should use secure environment variables
- Implement proper error handling and loading states
- Use React Query or similar for data fetching and caching
- Follow OAuth 2.0 patterns for authentication where required

## Component Structure
- Keep components modular and reusable
- Use proper prop typing with TypeScript interfaces
- Implement loading and error states for all data-dependent components
- Follow accessibility best practices
