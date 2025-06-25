'use client'

import DashboardLayout from '@/components/DashboardLayout'
import MetricCard from '@/components/MetricCard'
import ChartCard from '@/components/ChartCard'
import { Mail, Users, MousePointer, TrendingUp, Send, UserX, RefreshCw, AlertCircle } from 'lucide-react'
import { useMailchimpData } from '@/hooks/useApiData'
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

export default function MailchimpPage() {
  const { data, loading, error, refetch } = useMailchimpData({ type: 'overview' })
  const { data: campaignsData, loading: campaignsLoading } = useMailchimpData({ type: 'campaigns' })

  // Process data with fallbacks
  const overview = data?.overview || {
    totalSubscribers: 0,
    totalCampaigns: 0,
    avgOpenRate: 0,
    avgClickRate: 0,
    totalLists: 0
  }

  const campaigns = campaignsData?.campaigns || []

  // Mock chart data for visualization (you can enhance this with real time-series data)
  const chartData = [
    { name: 'Week 1', opens: 1250, clicks: 185, subscribers: 125 },
    { name: 'Week 2', opens: 1180, clicks: 210, subscribers: 98 },
    { name: 'Week 3', opens: 1320, clicks: 195, subscribers: 142 },
    { name: 'Week 4', opens: 1404, clicks: 281, subscribers: 156 }
  ]

  const audienceGrowth = [
    { name: 'Jan', subscribers: Math.max(0, overview.totalSubscribers - 700), newSubscribers: 245, unsubscribes: 32 },
    { name: 'Feb', subscribers: Math.max(0, overview.totalSubscribers - 400), newSubscribers: 312, unsubscribes: 28 },
    { name: 'Mar', subscribers: Math.max(0, overview.totalSubscribers - 150), newSubscribers: 278, unsubscribes: 35 },
    { name: 'Apr', subscribers: overview.totalSubscribers, newSubscribers: 189, unsubscribes: 24 }
  ]

  return (
    <DashboardLayout>
      <MDBox p={4}>
        <MDTypography variant="h2" fontWeight="bold" color="primary" gutterBottom>
          🎨 MATERIAL DASHBOARD TEST 🎨
        </MDTypography>
        <MDTypography variant="body1" color="secondary" mb={2}>
          Monitor your email marketing performance and subscriber engagement
        </MDTypography>
      </MDBox>

      <div className="p-6">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <MetricCard
            title="Total Subscribers"
            value={overview.totalSubscribers.toLocaleString()}
            change="+5.3%"
            changeType="positive"
            icon={Users}
            loading={loading}
          />
          <MetricCard
            title="Campaigns Sent"
            value={overview.totalCampaigns.toString()}
            change="+12"
            changeType="positive"
            icon={Send}
            loading={loading}
          />
          <MetricCard
            title="Avg Open Rate"
            value={`${overview.avgOpenRate.toFixed(1)}%`}
            change="+2.1%"
            changeType="positive"
            icon={Mail}
            loading={loading}
          />
          <MetricCard
            title="Avg Click Rate"
            value={`${overview.avgClickRate.toFixed(1)}%`}
            change="+0.3%"
            changeType="positive"
            icon={MousePointer}
            loading={loading}
          />
          <MetricCard
            title="Unsubscribe Rate"
            value="0.5%"
            change="-0.2%"
            changeType="positive"
            icon={UserX}
            loading={loading}
          />
          <MetricCard
            title="Bounce Rate"
            value="2.1%"
            change="-0.5%"
            changeType="positive"
            icon={TrendingUp}
            loading={loading}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title="Weekly Email Performance"
            data={chartData}
            loading={loading}
          />
          <ChartCard
            title="Audience Growth"
            data={audienceGrowth.map(item => ({
              name: item.name,
              subscribers: item.subscribers,
              newSubscribers: item.newSubscribers,
              unsubscribes: item.unsubscribes
            }))}
            chartType="line"
            loading={loading}
          />
        </div>

        {/* Campaign Performance Table */}
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject Line
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sent Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Opens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Click Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Unsubscribes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                        {campaign.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(campaign.sentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.recipients.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.opens.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.openRate > 25 
                          ? 'bg-green-100 text-green-800' 
                          : campaign.openRate > 20 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.openRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.clickRate > 4 
                          ? 'bg-green-100 text-green-800' 
                          : campaign.clickRate > 2 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.clickRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.unsubscribes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
