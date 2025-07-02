# Marketing Dashboard

A comprehensive marketing analytics dashboard built with Next.js that integrates with multiple marketing platforms including Facebook Ads, Mailchimp, Google Ads, and Google Analytics.

**🚀 Latest Updates:**
- ✅ All TypeScript Errors Resolved
- ✅ All Import/Export Issues Fixed
- ✅ MaterialUI Context Integration Complete
- ✅ Enhanced Dashboard Components
- ✅ Dark/Light Mode Toggle
- ✅ Responsive Design Improvements
- ✅ Ready for Production Deployment

## Deployment Notes

This project is deployed on Vercel. When deploying, ensure:

1. All Material UI dependencies are correctly installed:
   - @mui/material
   - @mui/icons-material
   - @emotion/react
   - @emotion/styled

2. The Next.js configuration is set to transpile Material UI packages:
   ```js
   // next.config.js
   transpilePackages: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled']
   ```

3. Make sure to check `/src/types/material-ui.d.ts` for proper Material UI type declarations if you encounter type errors.

4. For build issues on Vercel, check the deployment logs and verify import paths, especially with Material UI components.

## Features

- **Multi-Platform Integration**: Connect and monitor Facebook Ads, Mailchimp, Google Ads, and Google Analytics
- **Real-time Metrics**: Live dashboard with key performance indicators
- **Interactive Charts**: Beautiful data visualizations using Recharts
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd marketing-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API credentials:
   ```env
   # Facebook Ads API
   FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
   FACEBOOK_AD_ACCOUNT_ID=your_ad_account_id
   FACEBOOK_APP_ID=your_app_id
   FACEBOOK_APP_SECRET=your_app_secret

   # Mailchimp API
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_SERVER_PREFIX=your_server_prefix

   # Google Ads API (Future)
   GOOGLE_ADS_CLIENT_ID=your_google_ads_client_id
   GOOGLE_ADS_CLIENT_SECRET=your_google_ads_client_secret

   # Google Analytics API (Future)
   GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home page
├── components/            # React components
│   ├── ChartCard.tsx     # Chart visualization component
│   ├── DashboardLayout.tsx # Main layout wrapper
│   ├── Header.tsx        # Top navigation header
│   ├── MetricCard.tsx    # Metric display card
│   └── Sidebar.tsx       # Side navigation
└── lib/                  # Utility functions and API clients
    ├── facebook-ads.ts   # Facebook Ads API integration
    └── mailchimp.ts      # Mailchimp API integration
```

## API Integrations

### Facebook Ads API

The dashboard integrates with the Facebook Marketing API to fetch:
- Campaign performance metrics
- Ad spend and budget information
- Impressions, clicks, and conversions
- Cost per mille (CPM) and click-through rates (CTR)

### Mailchimp API

Integration with Mailchimp's API provides:
- Email campaign performance
- Subscriber growth and engagement
- Open rates and click rates
- List statistics and segmentation data

### Future Integrations

- **Google Ads API**: Campaign performance, keyword data, and conversion tracking
- **Google Analytics API**: Website traffic, user behavior, and conversion funnels

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `FACEBOOK_ACCESS_TOKEN` | Facebook Marketing API access token | Yes |
| `FACEBOOK_AD_ACCOUNT_ID` | Your Facebook Ad Account ID | Yes |
| `MAILCHIMP_API_KEY` | Mailchimp API key | Yes |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp server prefix (e.g., us1, us2) | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
