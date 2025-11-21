
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
  descKey: string;
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
