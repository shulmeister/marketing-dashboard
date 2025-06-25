export default function SimpleGoogleAnalyticsSetup() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Analytics Setup</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Step 1: Enable APIs</h2>
          <p className="text-gray-600 mb-4">
            You need to enable Google Analytics APIs in Google Cloud Console:
          </p>
          <div className="space-y-2">
            <a 
              href="https://console.cloud.google.com/apis/library/analyticsreporting.googleapis.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enable Analytics Reporting API →
            </a>
            <a 
              href="https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enable Analytics Data API →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Step 2: Create OAuth Credentials</h2>
          <p className="text-gray-600 mb-4">
            Create OAuth 2.0 credentials in Google Cloud Console:
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
            <p className="font-medium text-yellow-800 mb-2">Redirect URI to add:</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              http://localhost:3000/api/auth/google/callback
            </code>
          </div>
          <a 
            href="https://console.cloud.google.com/apis/credentials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open Google Cloud Credentials →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Step 3: Get GA4 Property ID</h2>
          <p className="text-gray-600 mb-4">
            Get your Google Analytics 4 Property ID:
          </p>
          <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">
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
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open Google Analytics →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Step 4: Add Environment Variables</h2>
          <p className="text-gray-600 mb-4">
            Add these to your .env.local file with your actual values:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`# Google Analytics Integration
GOOGLE_ANALYTICS_CLIENT_ID=your_client_id_here
GOOGLE_ANALYTICS_CLIENT_SECRET=your_client_secret_here
GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id_here`}
          </pre>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-medium mb-2">Once you add the environment variables:</p>
            <ol className="list-decimal list-inside text-green-700 space-y-1">
              <li>Restart your development server</li>
              <li>Visit <a href="/api/auth/google" className="underline">/api/auth/google</a> to start OAuth</li>
              <li>Complete the authorization flow</li>
              <li>Test your integration at <a href="/api/google-analytics" className="underline">/api/google-analytics</a></li>
            </ol>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
