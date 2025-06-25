'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { ExternalLink, Copy, CheckCircle, AlertCircle } from 'lucide-react'

export default function QuickBooksSetup() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)

  const redirectUri = 'http://localhost:3000/api/auth/quickbooks/callback'

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            QuickBooks Integration Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect your QuickBooks account to get real revenue data and accurate ROAS calculations.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`flex items-center ${
                  stepNum < 3 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Configure App</span>
            <span>Authorize</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Step 1: Configure QuickBooks App */}
        {step === 1 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Configure Your QuickBooks App
            </h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Important: Configure Redirect URI
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      You need to add the redirect URI to your QuickBooks app before proceeding.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Redirect URI (copy this):
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={redirectUri}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(redirectUri)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Steps to configure:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to <a href="https://developer.intuit.com/app/developer/myapps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Intuit Developer Dashboard <ExternalLink className="h-3 w-3 ml-1" /></a></li>
                  <li>Select your app or create a new one</li>
                  <li>Go to "Keys & OAuth" section</li>
                  <li>Under "Redirect URIs", click "Add URI"</li>
                  <li>Paste the redirect URI from above: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{redirectUri}</code></li>
                  <li>Save the changes</li>
                </ol>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                I've configured the redirect URI
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Authorize */}
        {step === 2 && (
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Authorize QuickBooks Access
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Now we'll connect to your QuickBooks account to get permission to access your financial data.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  What happens next:
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• You'll be redirected to QuickBooks to sign in</li>
                  <li>• Choose the company you want to connect</li>
                  <li>• Grant permission for the Marketing Dashboard to access your data</li>
                  <li>• You'll be redirected back with your access credentials</li>
                </ul>
              </div>

              <a
                href="/api/auth/quickbooks"
                className="inline-block w-full text-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Connect to QuickBooks
              </a>

              <button
                onClick={() => setStep(1)}
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Step 1
              </button>
            </div>
          </div>
        )}

        {/* Current Configuration */}
        <div className="mt-8 dashboard-card p-6">
          <h3 className="text-lg font-semibold mb-4">Current Configuration</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Client ID:</span>
              <span className="font-mono text-xs">AB4U10o9X8fAjQ0buAwtHJ0DgIeUX9qjHnSYlWyEllMz7RV83W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Environment:</span>
              <span className="text-yellow-600">Sandbox</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Redirect URI:</span>
              <span className="font-mono text-xs">{redirectUri}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
