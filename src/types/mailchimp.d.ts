declare module '@mailchimp/mailchimp_marketing' {
  interface Config {
    apiKey: string;
    server: string;
  }

  interface Campaign {
    id: string;
    web_id: number;
    type: string;
    create_time: string;
    archive_url: string;
    long_archive_url: string;
    status: string;
    emails_sent: number;
    send_time: string;
    content_type: string;
    needs_block_refresh: boolean;
    resendable: boolean;
    recipients: {
      list_id: string;
      list_is_active: boolean;
      list_name: string;
      segment_text: string;
      recipient_count: number;
    };
    settings: {
      subject_line: string;
      preview_text: string;
      title: string;
      from_name: string;
      reply_to: string;
      use_conversation: boolean;
      to_name: string;
      folder_id: string;
      authenticate: boolean;
      auto_footer: boolean;
      inline_css: boolean;
      auto_tweet: boolean;
      fb_comments: boolean;
      timewarp: boolean;
      template_id: number;
      drag_and_drop: boolean;
    };
    tracking: {
      opens: boolean;
      html_clicks: boolean;
      text_clicks: boolean;
      goal_tracking: boolean;
      ecomm360: boolean;
      google_analytics: string;
      clicktale: string;
    };
  }

  interface CampaignList {
    campaigns: Campaign[];
    total_items: number;
  }

  interface ListOptions {
    count?: number;
    offset?: number;
    sort_field?: string;
    sort_dir?: 'ASC' | 'DESC';
    status?: string;
  }

  interface ReportSummary {
    campaign_id: string;
    emails_sent: number;
    abuse_reports: number;
    unsubscribed: number;
    hard_bounces: number;
    soft_bounces: number;
    syntax_errors: number;
    forwards: number;
    forwards_opens: number;
    opens: {
      opens_total: number;
      unique_opens: number;
      open_rate: number;
      last_open: string;
    };
    clicks: {
      clicks_total: number;
      unique_clicks: number;
      unique_subscriber_clicks: number;
      click_rate: number;
      last_click: string;
    };
    facebook_likes: {
      recipient_likes: number;
      unique_likes: number;
      facebook_likes: number;
    };
    industry_stats: {
      type: string;
      open_rate: number;
      click_rate: number;
      bounce_rate: number;
      unopen_rate: number;
      unsub_rate: number;
      abuse_rate: number;
    };
    list_stats: {
      sub_rate: number;
      unsub_rate: number;
      open_rate: number;
      click_rate: number;
    };
    timeseries: Array<{
      timestamp: string;
      emails_sent: number;
      unique_opens: number;
      recipients_clicks: number;
    }>;
  }

  interface List {
    id: string;
    web_id: number;
    name: string;
    contact: {
      company: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      phone: string;
    };
    permission_reminder: string;
    use_archive_bar: boolean;
    campaign_defaults: {
      from_name: string;
      from_email: string;
      subject: string;
      language: string;
    };
    notify_on_subscribe: string;
    notify_on_unsubscribe: string;
    date_created: string;
    list_rating: number;
    email_type_option: boolean;
    subscribe_url_short: string;
    subscribe_url_long: string;
    beamer_address: string;
    visibility: string;
    double_optin: boolean;
    has_welcome: boolean;
    marketing_permissions: boolean;
    modules: string[];
    stats: {
      member_count: number;
      unsubscribe_count: number;
      cleaned_count: number;
      member_count_since_send: number;
      unsubscribe_count_since_send: number;
      cleaned_count_since_send: number;
      campaign_count: number;
      campaign_last_sent: string;
      merge_field_count: number;
      avg_sub_rate: number;
      avg_unsub_rate: number;
      target_sub_rate: number;
      open_rate: number;
      click_rate: number;
      last_sub_date: string;
      last_unsub_date: string;
    };
  }

  interface ListsResponse {
    lists: List[];
    total_items: number;
  }

  interface Member {
    id: string;
    email_address: string;
    unique_email_id: string;
    contact_id: string;
    full_name: string;
    web_id: number;
    email_type: string;
    status: string;
    unsubscribe_reason: string;
    consents_to_one_to_one_messaging: boolean;
    merge_fields: Record<string, any>;
    interests: Record<string, boolean>;
    stats: {
      avg_open_rate: number;
      avg_click_rate: number;
      ecommerce_data: {
        total_revenue: number;
        number_of_orders: number;
        currency_code: string;
      };
    };
    ip_signup: string;
    timestamp_signup: string;
    ip_opt: string;
    timestamp_opt: string;
    member_rating: number;
    last_changed: string;
    language: string;
    vip: boolean;
    email_client: string;
    location: {
      latitude: number;
      longitude: number;
      gmtoff: number;
      dstoff: number;
      country_code: string;
      timezone: string;
      region: string;
    };
    marketing_permissions: Array<{
      marketing_permission_id: string;
      text: string;
      enabled: boolean;
    }>;
    last_note: {
      note_id: number;
      created_at: string;
      created_by: string;
      note: string;
    };
    source: string;
    tags_count: number;
    tags: Array<{
      id: number;
      name: string;
    }>;
    list_id: string;
  }

  interface MembersResponse {
    members: Member[];
    list_id: string;
    total_items: number;
  }

  interface MembersOptions {
    count?: number;
    offset?: number;
    email_type?: string;
    status?: string;
    since_timestamp_opt?: string;
    before_timestamp_opt?: string;
    since_last_changed?: string;
    before_last_changed?: string;
    unique_email_id?: string;
    vip_only?: boolean;
    interest_category_id?: string;
    interest_ids?: string;
    interest_match?: string;
    sort_field?: string;
    sort_dir?: 'ASC' | 'DESC';
    since_last_campaign?: string;
    unsubscribed_since?: string;
  }

  export function setConfig(config: Config): void;

  export const campaigns: {
    list(options?: ListOptions): Promise<CampaignList>;
  };

  export const reports: {
    getSummary(campaignId: string): Promise<ReportSummary>;
  };

  export const lists: {
    getAllLists(options?: { count?: number; offset?: number }): Promise<ListsResponse>;
    getListMembersInfo(listId: string, options?: MembersOptions): Promise<MembersResponse>;
  };

  const mailchimp: {
    setConfig: typeof setConfig;
    campaigns: typeof campaigns;
    reports: typeof reports;
    lists: typeof lists;
  };

  export default mailchimp;
}
