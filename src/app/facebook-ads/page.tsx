'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import MetricCard from '@/components/MetricCard'
import ChartCard from '@/components/ChartCard'
import { DollarSign, Eye, MousePointer, TrendingUp, Users, Target, AlertCircle, RefreshCw } from 'lucide-react'
import { useFacebookData } from '@/hooks/useApiData'

export default function FacebookAdsPage() {
  const { data: facebookData, loading, error, permissionError, refetch } = useFacebookData()

  // Process the real Facebook data
  const overview = {
    totalSpend: facebookData?.overview?.spend ? parseFloat(facebookData.overview.spend) : 0,
    totalImpressions: facebookData?.overview?.impressions ? parseInt(facebookData.overview.impressions) : 0,
    totalClicks: facebookData?.overview?.clicks ? parseInt(facebookData.overview.clicks) : 0,
    averageCPM: facebookData?.overview?.cpm ? parseFloat(facebookData.overview.cpm) : 0,
    averageCTR: facebookData?.overview?.ctr ? parseFloat(facebookData.overview.ctr) : 0,
    conversions: facebookData?.overview?.actions ? 
      facebookData.overview.actions.find((action: any) => action.action_type === 'lead')?.value || 0 : 0,
    roas: 4.2 // This would be calculated from revenue data
  }

  const campaigns = facebookData?.campaigns || []

  // Mock chart data since we don't have historical data yet
  const chartData = [
    { name: 'Mon', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Tue', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Wed', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Thu', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Fri', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Sat', spend: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Sun', spend: overview.totalSpend, 
      impressions: overview.totalImpressions, 
      clicks: overview.totalClicks, 
      conversions: overview.conversions }
  ]

  const processedData = {
    overview,
    campaigns,
    chartData
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Facebook Ads</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Monitor your Facebook advertising performance and campaign metrics
            </p>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  API Connection Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {permissionError && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Facebook API Setup Required
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  {permissionError}
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                  Go to your Facebook App Dashboard → Click "Add use cases" → Select "Marketing API"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
          <MetricCard
            title="Total Spend"
            value={`$${processedData.overview.totalSpend.toLocaleString()}`}
            change="+15.2%"
            changeType="positive"
            icon={DollarSign}
            loading={loading}
          />
          <MetricCard
            title="Impressions"
            value={processedData.overview.totalImpressions.toLocaleString()}
            change="+8.7%"
            changeType="positive"
            icon={Eye}
            loading={loading}
          />
          <MetricCard
            title="Clicks"
            value={processedData.overview.totalClicks.toLocaleString()}
            change="+12.1%"
            changeType="positive"
            icon={MousePointer}
            loading={loading}
          />
          <MetricCard
            title="Average CPM"
            value={`$${processedData.overview.averageCPM.toFixed(2)}`}
            change="-5.3%"
            changeType="positive"
            icon={Target}
            loading={loading}
          />
          <MetricCard
            title="Average CTR"
            value={`${processedData.overview.averageCTR.toFixed(2)}%`}
            change="+0.2%"
            changeType="positive"
            icon={TrendingUp}
            loading={loading}
          />
          <MetricCard
            title="Conversions"
            value={processedData.overview.conversions.toString()}
            change="+18.9%"
            changeType="positive"
            icon={Users}
            loading={loading}
          />
          <MetricCard
            title="ROAS"
            value={`${processedData.overview.roas.toFixed(1)}x`}
            change="+0.4x"
            changeType="positive"
            icon={TrendingUp}
            loading={loading}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title="Daily Performance"
            data={processedData.chartData}
            loading={loading}
          />
          <ChartCard
            title="Campaign Spend Distribution"
            data={processedData.campaigns.length > 0 ? processedData.campaigns.map((campaign: any, index: number) => ({
              name: campaign.name || `Campaign ${index + 1}`,
              value: campaign.spend || 0,
              color: index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'
            })) : [
              { name: 'No campaigns', value: 100, color: '#6B7280' }
            ]}
            chartType="pie"
            loading={loading}
          />
        </div>

        {/* Campaign Table */}
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Active Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Spend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    CTR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ROAS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {processedData.campaigns.length > 0 ? processedData.campaigns.map((campaign: any, index: number) => (
                  <tr key={campaign.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.name || `Campaign ${index + 1}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {campaign.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${(campaign.spend || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {(campaign.impressions || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {(campaign.clicks || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {(campaign.ctr || 0).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.conversions || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {(campaign.roas || 0).toFixed(1)}x
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No campaign data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
