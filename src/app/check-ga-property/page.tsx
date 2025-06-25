export default function CheckGAPropertyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 Google Analytics Property ID Checker</h1>
      
      <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-yellow-800">Your Current Property ID: 317522534</h3>
        <p className="text-yellow-700">This is what's currently configured in your .env.local file.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">How to Verify Your Property ID:</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Step 1: Open Google Analytics</h3>
          <p>Go to <a href="https://analytics.google.com" target="_blank" className="text-blue-600 hover:underline">https://analytics.google.com</a></p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Step 2: Select Your Property</h3>
          <p>Make sure you're viewing the correct website property in the dropdown at the top left.</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Step 3: Go to Admin Settings</h3>
          <p>Click the gear icon (⚙️) in the bottom left to access Admin settings.</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Step 4: Check Property Settings</h3>
          <p>In the Property column (middle), click "Property Settings"</p>
          <p>You'll see the <strong>Property ID</strong> displayed - it should look like a number (e.g., 317522534)</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Step 5: Verify Account Access</h3>
          <p>Make sure the Google account you used for OAuth (jason@coloradocareassist.com) has at least <strong>Viewer</strong> access to this property.</p>
          <p>In Admin → Property → Property Access Management, check if your email is listed with appropriate permissions.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Common Issues:</h2>
      <ul className="list-disc list-inside space-y-2 bg-red-50 p-4 rounded-lg">
        <li><strong>Wrong Property ID:</strong> The number doesn't match what's shown in GA settings</li>
        <li><strong>No Access:</strong> Your email account doesn't have access to this property</li>
        <li><strong>Wrong Account:</strong> You signed in with a different Google account during OAuth</li>
        <li><strong>GA4 vs Universal:</strong> Make sure you're using a GA4 property (not the old Universal Analytics)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">If You Need to Update the Property ID:</h2>
      <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono">
        <p># Edit your .env.local file and update this line:</p>
        <p>GOOGLE_ANALYTICS_PROPERTY_ID=YOUR_CORRECT_PROPERTY_ID</p>
      </div>
      <p className="mt-2">Then restart your development server: <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Quick Test:</h2>
      <p>After verifying/updating the property ID, test the API:</p>
      <a 
        href="/api/google-analytics" 
        target="_blank"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Test Google Analytics API
      </a>
    </div>
  )
}
