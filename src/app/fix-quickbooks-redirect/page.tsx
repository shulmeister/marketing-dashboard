export default function QuickBooksRedirectFixPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔧 Fix QuickBooks Redirect URI</h1>
      
      <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-red-800">❌ Error: Invalid redirect_uri</h3>
        <p className="text-red-700">The redirect URI in your QuickBooks app doesn't match what the OAuth flow is using.</p>
      </div>

      <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-800">🎯 Required Redirect URI:</h3>
        <div className="bg-gray-800 text-green-400 p-3 rounded font-mono mt-2">
          http://localhost:3000/api/auth/quickbooks/callback
        </div>
        <p className="text-blue-700 text-sm mt-2">This needs to be added to your QuickBooks app's redirect URIs list.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">🛠️ Steps to Fix:</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg">Step 1: Open QuickBooks Developer Console</h3>
          <p className="mb-3">Go to your QuickBooks app settings</p>
          <a 
            href="https://developer.intuit.com/app/developer/myapps" 
            target="_blank"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open QuickBooks Apps
          </a>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-lg">Step 2: Find Your App</h3>
          <p>Look for your marketing dashboard app (the one with Client ID: AB4U10o9X8fAjQ0buAwtHJ0DgIeUX9qjHnSYlWyEllMz7RV83W)</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-semibold text-lg">Step 3: Edit App Settings</h3>
          <p>Click on your app, then go to "Keys & OAuth" or "App Settings"</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h3 className="font-semibold text-lg">Step 4: Add Redirect URI</h3>
          <p className="mb-2">In the "Redirect URIs" section, add:</p>
          <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">
            http://localhost:3000/api/auth/quickbooks/callback
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-semibold text-lg">Step 5: Save Changes</h3>
          <p>Save the app settings and wait a moment for changes to propagate</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-300 p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-green-800">✅ After Fixing:</h3>
        <p className="text-green-700 mb-3">Once you've added the redirect URI, try the OAuth flow again:</p>
        <a 
          href="/api/auth/quickbooks"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Retry QuickBooks OAuth
        </a>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-yellow-800">💡 Alternative: Use ngrok</h3>
        <p className="text-yellow-700 mb-2">If you want to use a public URL instead of localhost:</p>
        <ol className="list-decimal list-inside text-yellow-700 space-y-1">
          <li>Install ngrok: <code className="bg-yellow-200 px-1 rounded">brew install ngrok</code></li>
          <li>Run: <code className="bg-yellow-200 px-1 rounded">ngrok http 3000</code></li>
          <li>Use the ngrok URL as your redirect URI (e.g., https://abc123.ngrok.io/api/auth/quickbooks/callback)</li>
        </ol>
      </div>
    </div>
  )
}
