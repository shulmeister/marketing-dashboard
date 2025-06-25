'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { ExternalLink, CheckCircle, AlertCircle, Copy } from 'lucide-react'

export default function GoogleAnalyticsSetup() {
  const [step, setStep] = useState(1)
  const [credentials, setCredentials] = useState({
    clientId: '',
    clientSecret: '',
    propertyId: ''
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const redirectUri = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/google/callback`

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Google Analytics Setup</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Connect Google Analytics to get real website conversion data and revenue tracking
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                  {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
            <span>Cloud Console</span>
            <span>OAuth Setup</span>
            <span>GA4 Property</span>
            <span>Connect</span>
          </div>
        </div>

        {/* Step 1: Google Cloud Console */}
        {step === 1 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
              Enable Google Analytics APIs
            </h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Required APIs to Enable:</h3>
                <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Google Analytics Reporting API
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Google Analytics Data API
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://console.cloud.google.com/apis/library/analyticsreporting.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enable Reporting API
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enable Data API
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                APIs Enabled - Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OAuth Credentials */}
        {step === 2 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
              Create OAuth 2.0 Credentials
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Redirect URI to Add:</h3>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm flex-1">
                    {redirectUri}
                  </code>
                  <button
                    onClick={() => copyToClipboard(redirectUri)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Go to Google Cloud Console → Credentials</li>
                <li>Click "Create Credentials" → "OAuth 2.0 Client ID"</li>
                <li>Choose "Web application"</li>
                <li>Add the redirect URI above to "Authorized redirect URIs"</li>
                <li>Download the credentials JSON file</li>
              </ol>

              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit"
              >
                Open Google Cloud Credentials
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client ID
                  </label>
                  <input
                    type="text"
                    value={credentials.clientId}
                    onChange={(e) => setCredentials({...credentials, clientId: e.target.value})}
                    placeholder="123456789.apps.googleusercontent.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client Secret
                  </label>
                  <input
                    type="password"
                    value={credentials.clientSecret}
                    onChange={(e) => setCredentials({...credentials, clientSecret: e.target.value})}
                    placeholder="GOCSPX-..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!credentials.clientId || !credentials.clientSecret}
                className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Credentials Added - Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: GA4 Property ID */}
        {step === 3 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
              Get GA4 Property ID
            </h2>
            
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Go to Google Analytics</li>
                <li>Select your GA4 property</li>
                <li>Click Admin (gear icon)</li>
                <li>Under Property, click "Property Settings"</li>
                <li>Copy your Property ID (format: 123456789)</li>
              </ol>

              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit"
              >
                Open Google Analytics
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GA4 Property ID
                </label>
                <input
                  type="text"
                  value={credentials.propertyId}
                  onChange={(e) => setCredentials({...credentials, propertyId: e.target.value})}
                  placeholder="123456789"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={() => setStep(4)}
                disabled={!credentials.propertyId}
                className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Property ID Added - Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Environment Variables */}
        {step === 4 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
              Update Environment Variables
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Add these to your .env.local file:</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`# Google Analytics Integration
GOOGLE_ANALYTICS_CLIENT_ID=${credentials.clientId}
GOOGLE_ANALYTICS_CLIENT_SECRET=${credentials.clientSecret}
GOOGLE_ANALYTICS_PROPERTY_ID=${credentials.propertyId}`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`# Google Analytics Integration
GOOGLE_ANALYTICS_CLIENT_ID=${credentials.clientId}
GOOGLE_ANALYTICS_CLIENT_SECRET=${credentials.clientSecret}
GOOGLE_ANALYTICS_PROPERTY_ID=${credentials.propertyId}`)}
                  className="mt-2 flex items-center text-sm text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy to clipboard
                </button>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Next: OAuth Authorization</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  After adding the environment variables, restart your dev server and visit the Google Analytics OAuth page to authorize access.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Restart & Authorize
                </button>
                <a
                  href="/api/auth/google"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start OAuth Flow
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
