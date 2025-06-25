# QuickBooks App Security & Compliance Documentation

## Application Overview
**App Name**: Marketing Dashboard  
**Purpose**: Marketing analytics dashboard that integrates QuickBooks revenue data with Facebook Ads and Mailchimp for ROI calculations  
**Environment**: Production-ready with proper error handling and logging

## Intuit Production App Requirements Compliance

### ✅ 1. Intuit TID Capture
**Question**: Does your app capture the value of the intuit_tid field from response headers?  
**Answer**: YES

**Implementation**:
- We capture `intuit_tid` from all QuickBooks API response headers
- Store it in application logs for troubleshooting purposes
- Include it in error responses for support team reference
- Location: `/src/app/api/quickbooks/route.ts` lines 45-50

```typescript
const intuitTid = salesResponse.headers.get('intuit_tid')
console.log('QuickBooks API Request:', {
  intuit_tid: intuitTid,
  status: salesResponse.status,
  timestamp: new Date().toISOString()
})
```

### ✅ 2. Error Information Logging
**Question**: Does your app have a mechanism for storing all error information in logs that can be shared for troubleshooting purposes?  
**Answer**: YES

**Implementation**:
- Comprehensive error logging with timestamps
- Structured log format for easy analysis
- Captures API errors, network issues, and application errors
- Logs include intuit_tid for correlation with Intuit support
- Location: `/src/app/api/quickbooks/route.ts` throughout the file

```typescript
console.error('QuickBooks API Error:', {
  intuit_tid: intuitTid,
  status: salesResponse.status,
  error: errorData,
  timestamp: new Date().toISOString()
})
```

### ✅ 3. Error Storage Mechanism
**Question**: Error logging mechanism type?  
**Answer**: Application logs

**Details**:
- Server-side console logging (accessible via deployment logs)
- Structured JSON format for easy parsing
- Includes all necessary debugging information
- Can be easily exported and shared with support teams

## Security Features

### Data Handling
- **No Data Storage**: We don't store QuickBooks data persistently
- **API-Only Access**: Real-time data fetching without caching sensitive information
- **Secure Credentials**: Environment variables for all sensitive data
- **HTTPS Only**: All API communications use secure protocols

### Access Control
- **OAuth 2.0**: Proper OAuth flow for user authorization
- **Limited Scope**: Only request necessary permissions (accounting read access)
- **Token Security**: Access tokens stored securely in environment variables
- **Company Isolation**: Each user can only access their own QuickBooks company data

### Privacy Compliance
- **Minimal Data**: Only fetch revenue and transaction data needed for analytics
- **No Personal Info**: Don't access customer personal information
- **Purpose-Limited**: Data used only for marketing ROI calculations
- **User Control**: Users can disconnect integration at any time

## API Usage Patterns

### Read-Only Operations
- Fetch sales receipts for revenue calculation
- Fetch invoices for complete revenue picture
- Query data within user-specified date ranges
- No write operations or data modifications

### Rate Limiting Compliance
- Respect QuickBooks API rate limits
- Implement exponential backoff for retries
- Cache results appropriately to minimize API calls
- Monitor usage to stay within quotas

### Error Handling
- Graceful degradation when QuickBooks is unavailable
- User-friendly error messages
- Detailed logging for troubleshooting
- Proper HTTP status codes

## Data Security

### In Transit
- All API calls use HTTPS/TLS encryption
- Secure header-based authentication
- No sensitive data in URL parameters

### At Rest
- No persistent storage of QuickBooks data
- Environment variables for credentials
- No caching of sensitive information

### Access Logging
- All API requests logged with timestamps
- Error tracking with intuit_tid correlation
- No logging of sensitive data values
- Audit trail for troubleshooting

## Production Readiness

### Monitoring
- Error rate monitoring
- API response time tracking
- Success/failure metrics
- intuit_tid correlation for support

### Scalability
- Stateless architecture
- Efficient API usage
- Minimal resource footprint
- Handles multiple concurrent users

### Reliability
- Comprehensive error handling
- Graceful failure modes
- Retry logic for transient errors
- Fallback options when APIs unavailable

## Contact Information

**Developer**: Marketing Dashboard Team  
**Support Email**: [Your support email]  
**Documentation**: Available in codebase and setup guides  
**Troubleshooting**: Full logging with intuit_tid capture for Intuit support correlation

## Compliance Checklist

- [x] Captures intuit_tid from response headers
- [x] Comprehensive error logging mechanism
- [x] Structured application logs for troubleshooting
- [x] Secure OAuth 2.0 implementation
- [x] Read-only data access
- [x] No persistent storage of sensitive data
- [x] HTTPS-only communications
- [x] Rate limiting compliance
- [x] Graceful error handling
- [x] User privacy protection
- [x] Production-ready monitoring
