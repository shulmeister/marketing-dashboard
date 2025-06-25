// API utilities for Mailchimp integration

export interface MailchimpCampaignData {
  id: string
  webId: number
  type: string
  createTime: string
  archiveUrl: string
  longArchiveUrl: string
  status: string
  emailsSent: number
  sendTime: string
  contentType: string
  needsBlockRefresh: boolean
  resendable: boolean
  recipients: {
    listId: string
    listIsActive: boolean
    listName: string
    segmentText: string
    recipientCount: number
  }
  settings: {
    subjectLine: string
    title: string
    fromName: string
    replyTo: string
    useConversation: boolean
    toName: string
    folderId: string
    authenticate: boolean
    autoFooter: boolean
    inlineCss: boolean
    autoTweet: boolean
    dragAndDrop: boolean
    templateId: number
  }
  reportSummary: {
    opens: number
    uniqueOpens: number
    openRate: number
    clicks: number
    subscriberClicks: number
    clickRate: number
    unsubscribed: number
    bounced: number
    sent: number
    timesent: string
  }
}

export interface MailchimpListData {
  id: string
  webId: number
  name: string
  contact: any
  permissionReminder: string
  useArchiveBar: boolean
  campaignDefaults: any
  notifyOnSubscribe: string
  notifyOnUnsubscribe: string
  dateCreated: string
  listRating: number
  emailTypeOption: boolean
  subscribeUrlShort: string
  subscribeUrlLong: string
  beamerAddress: string
  visibility: string
  doubleOptin: boolean
  hasWelcome: boolean
  marketingPermissions: boolean
  modules: any[]
  stats: {
    memberCount: number
    totalContacts: number
    unsubscribeCount: number
    cleanedCount: number
    memberCountSinceSend: number
    unsubscribeCountSinceSend: number
    cleanedCountSinceSend: number
    campaignCount: number
    campaignLastSent: string
    mergeFieldCount: number
    avgSubRate: number
    avgUnsubRate: number
    targetSubRate: number
    openRate: number
    clickRate: number
    lastSubDate: string
    lastUnsubDate: string
  }
}

export interface MailchimpConfig {
  apiKey: string
  serverPrefix: string
}

export class MailchimpAPI {
  private config: MailchimpConfig

  constructor(config: MailchimpConfig) {
    this.config = config
  }

  async getCampaigns(): Promise<MailchimpCampaignData[]> {
    // In a real implementation, this would make API calls to Mailchimp API
    // For now, returning mock data
    return [
      {
        id: 'campaign_1',
        webId: 123456,
        type: 'regular',
        createTime: '2024-01-15T10:00:00Z',
        archiveUrl: '',
        longArchiveUrl: '',
        status: 'sent',
        emailsSent: 5000,
        sendTime: '2024-01-15T14:00:00Z',
        contentType: 'template',
        needsBlockRefresh: false,
        resendable: false,
        recipients: {
          listId: 'list_1',
          listIsActive: true,
          listName: 'Newsletter Subscribers',
          segmentText: '',
          recipientCount: 5000
        },
        settings: {
          subjectLine: 'Weekly Newsletter - Marketing Tips',
          title: 'Weekly Newsletter',
          fromName: 'Marketing Team',
          replyTo: 'marketing@company.com',
          useConversation: false,
          toName: '*|FNAME|*',
          folderId: '',
          authenticate: true,
          autoFooter: false,
          inlineCss: false,
          autoTweet: false,
          dragAndDrop: true,
          templateId: 0
        },
        reportSummary: {
          opens: 1225,
          uniqueOpens: 1180,
          openRate: 24.5,
          clicks: 160,
          subscriberClicks: 155,
          clickRate: 3.2,
          unsubscribed: 8,
          bounced: 12,
          sent: 5000,
          timesent: '2024-01-15T14:00:00Z'
        }
      }
    ]
  }

  async getLists(): Promise<MailchimpListData[]> {
    // Mock data for lists
    return [
      {
        id: 'list_1',
        webId: 789012,
        name: 'Newsletter Subscribers',
        contact: {},
        permissionReminder: 'You signed up for our newsletter',
        useArchiveBar: true,
        campaignDefaults: {},
        notifyOnSubscribe: '',
        notifyOnUnsubscribe: '',
        dateCreated: '2023-01-01T00:00:00Z',
        listRating: 4,
        emailTypeOption: false,
        subscribeUrlShort: '',
        subscribeUrlLong: '',
        beamerAddress: '',
        visibility: 'pub',
        doubleOptin: false,
        hasWelcome: true,
        marketingPermissions: false,
        modules: [],
        stats: {
          memberCount: 12500,
          totalContacts: 13000,
          unsubscribeCount: 350,
          cleanedCount: 150,
          memberCountSinceSend: 45,
          unsubscribeCountSinceSend: 8,
          cleanedCountSinceSend: 2,
          campaignCount: 24,
          campaignLastSent: '2024-01-15T14:00:00Z',
          mergeFieldCount: 4,
          avgSubRate: 2.3,
          avgUnsubRate: 0.8,
          targetSubRate: 3.0,
          openRate: 24.5,
          clickRate: 3.2,
          lastSubDate: '2024-01-14T16:30:00Z',
          lastUnsubDate: '2024-01-13T11:15:00Z'
        }
      }
    ]
  }

  async getReports(campaignId: string) {
    // Implementation would fetch detailed reports for a specific campaign
    return {
      opens: 1225,
      uniqueOpens: 1180,
      openRate: 24.5,
      clicks: 160,
      clickRate: 3.2,
      unsubscribed: 8,
      bounced: 12
    }
  }
}

export default MailchimpAPI
