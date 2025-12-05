
export type Language = 'ar' | 'en';

export interface TranslationDictionary {
  [key: string]: {
    [key: string]: string;
  };
}

export interface NewsItem {
  id: number;
  date: string;
  titleKey: string;
  titleAr?: string;
  titleEn?: string;
  descKey: string;
  descAr?: string;
  descEn?: string;
  image: string;
}

export interface Publication {
  id: number;
  type: 'pdf' | 'excel';
  titleKey: string;
  size: string;
}

export interface ServiceItem {
  icon: 'search' | 'balance' | 'bullhorn';
  titleKey: string;
  descKey: string;
}

export interface PriceItem {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  price: number;
  lastUpdated: string;
}

export interface RightGuideItem {
  id: string;
  questionKey: string;
  answerKey: string;
  icon: 'alert' | 'tag' | 'time' | 'invoice';
}

export interface DashboardStat {
  labelKey: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
}

export interface AppSettings {
  maintenanceMode: boolean;
  minVersion: string;
  latestVersion: string;
  announcementAr: string;
  announcementEn: string;
  apiEndpoint: string;
}

export interface ReportItem {
  id: number;
  productName: string;
  shopName: string;
  location: string;
  officialPrice: number;
  observedPrice: number;
  details: string;
  status: 'pending' | 'reviewed' | 'resolved';
  timestamp: string;
}

export interface TickerSettings {
  customTextAr: string;
  customTextEn: string;
  showPrices: boolean;
}
