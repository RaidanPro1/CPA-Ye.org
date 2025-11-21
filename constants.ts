
import { TranslationDictionary, NewsItem, Publication, ServiceItem, PriceItem, RightGuideItem, DashboardStat } from './types';

export const TRANSLATIONS: TranslationDictionary = {
  ar: {
    brandName: "جمعية حماية المستهلك",
    home: "الرئيسية",
    news: "الأخبار",
    library: "المكتبة",
    prices: "دليل الأسعار",
    report: "بلغ عن مخالفة",
    admin: "لوحة الإدارة",
    
    // Hero Slider
    heroTitle1: "معاً.. لسوق آمن ومستهلك محمي",
    heroSub1: "الجمعية الأولى في تعز للدفاع عن حقوقك ومحاربة الغش التجاري.",
    heroTitle2: "رقابة ميدانية مستمرة",
    heroSub2: "فرقنا متواجدة في الأسواق لضمان جودة السلع واستقرار الأسعار.",
    heroTitle3: "اعرف حقوقك القانونية",
    heroSub3: "القانون اليمني يكفل لك الحق في الأمان، الاختيار، والتعويض.",
    cta_report: "قدّم بلاغاً الآن",
    cta_prices: "قائمة الأسعار",

    // Services
    services_title: "خدماتنا ومهامنا",
    srv_1_title: "الرصد والرقابة",
    srv_1_desc: "نراقب الأسواق ونرصد مخالفات الأسعار.",
    srv_2_title: "الحماية القانونية",
    srv_2_desc: "نمثل صوتك أمام الجهات الرسمية.",
    srv_3_title: "التوعية الشاملة",
    srv_3_desc: "دليلك لمعرفة حقوقك الاستهلاكية.",

    // News
    news_title: "أخبار وأنشطة الجمعية",
    news_1_title: "انعقاد المؤتمر التأسيسي للجمعية",
    news_1_desc: "عقدت الجمعية العمومية اجتماعها الأول لانتخاب الهيئة الإدارية وإقرار النظام الأساسي.",
    news_2_title: "نزول ميداني لأسواق الجملة",
    news_2_desc: "قام فريق الرقابة بجولة تفقدية للتأكد من التزام التجار بقائمة الأسعار المعتمدة.",
    news_3_title: "ورشة عمل حول الغش التجاري",
    news_3_desc: "تنظيم ورشة توعوية للمواطنين حول طرق اكتشاف السلع المقلدة والمنتهية.",
    read_more: "اقرأ المزيد ←",

    // Gallery & Pubs
    gallery_title: "مكتبة الصور",
    pubs_title: "الإصدارات واللوائح",
    pub_1_name: "النظام الأساسي للجمعية",
    pub_2_name: "قانون حماية المستهلك اليمني",
    pub_3_name: "قائمة الأسعار لشهر نوفمبر",
    download: "تحميل",

    // Footer
    footer_about: "عن الجمعية",
    footer_desc: "منظمة مدنية طوعية تهدف لحماية المستهلك ورعاية مصالحه في محافظة تعز.",
    footer_contact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة © 2024 CPA-Ye.",

    // Ticker
    tickerText: "+++ عاجل: حملة ميدانية لمراقبة أسعار المواد الغذائية في مديرية القاهرة +++ تأكد من تاريخ صلاحية المنتجات قبل الشراء +++ اتصل بنا على الرقم الموحد للإبلاغ عن المخالفات +++",
    
    // Report Form
    report_title: "نموذج الإبلاغ عن مخالفة",
    product_name: "اسم المنتج",
    shop_name: "اسم المحل",
    price: "السعر الرسمي",
    observed_price: "السعر الذي وجدته",
    price_diff: "فرق السعر",
    violation_alert: "تنبيه: هناك زيادة في السعر بمقدار",
    details: "تفاصيل المخالفة",
    location: "الموقع (تلقائي)",
    submit: "إرسال البلاغ",
    loc_fetching: "جاري تحديد الموقع...",
    loc_success: "تم تحديد الموقع",
    
    // Admin
    admin_dashboard: "لوحة التحكم",
    manage_news: "إدارة الأخبار",
    manage_prices: "تحديث الأسعار",
    logout: "تسجيل خروج",
    confirm_logout: "تأكيد الخروج",
    logout_desc: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    cancel: "إلغاء",

    // Transparency Dashboard
    transparency_title: "لوحة الشفافية العامة",
    stat_solved: "نسبة حل البلاغات",
    stat_reports: "إجمالي البلاغات",
    stat_shops: "محلات تم تفتيشها",
    top_violations: "المنتجات الأكثر مخالفة",

    // Rights Guide
    rights_title: "اعرف حقوقك",
    q_expiry: "وجدت منتجاً منتهي الصلاحية؟",
    a_expiry: "يحق لك استرجاع المبلغ كاملاً أو استبدال المنتج، ويجب عليك إبلاغ الجمعية فوراً لسحب المنتج من السوق.",
    q_price: "السعر أعلى من القائمة الرسمية؟",
    a_price: "التاجر ملزم بالبيع وفق القائمة الرسمية. احتفظ بالفاتورة وقم بتصوير المنتج والسعر للإبلاغ.",
    q_invoice: "رفض التاجر إعطائي فاتورة؟",
    a_invoice: "القانون يلزم التاجر بإصدار فاتورة لأي سلعة. رفضه يعد مخالفة تستوجب المساءلة.",
    q_return: "هل يحق لي إرجاع السلعة؟",
    a_return: "نعم، يحق للمستهلك إرجاع أو استبدال السلعة المعيبة خلال فترة الضمان أو عند اكتشاف عيب مصنعي.",
  },
  en: {
    brandName: "CPA - Taiz",
    home: "Home",
    news: "News",
    library: "Gallery",
    prices: "Prices",
    report: "Report Violation",
    admin: "Admin Panel",

    // Hero Slider
    heroTitle1: "Together for a Safe Market",
    heroSub1: "The first association in Taiz defending your rights.",
    heroTitle2: "Continuous Field Monitoring",
    heroSub2: "Our teams ensure quality and price stability.",
    heroTitle3: "Know Your Legal Rights",
    heroSub3: "Yemeni law guarantees your right to safety and choice.",
    cta_report: "Report Now",
    cta_prices: "Price List",

    // Services
    services_title: "Our Services",
    srv_1_title: "Monitoring",
    srv_1_desc: "We monitor markets and track violations.",
    srv_2_title: "Legal Protection",
    srv_2_desc: "We represent you before the judiciary.",
    srv_3_title: "Awareness",
    srv_3_desc: "Know your rights and stay protected.",

    // News
    news_title: "News & Activities",
    news_1_title: "Founding Conference Held",
    news_1_desc: "Electing the administrative board and approving bylaws.",
    news_2_title: "Field Visit to Wholesale Markets",
    news_2_desc: "Inspection tour to ensure price compliance.",
    news_3_title: "Workshop on Fraud",
    news_3_desc: "Educating citizens on counterfeit goods.",
    read_more: "Read More →",

    // Gallery & Pubs
    gallery_title: "Photo Gallery",
    pubs_title: "Publications & Regulations",
    pub_1_name: "Association Bylaws",
    pub_2_name: "Consumer Protection Law",
    pub_3_name: "Price List",
    download: "Download",

    // Footer
    footer_about: "About CPA",
    footer_desc: "Voluntary civil organization in Taiz aiming to protect consumer rights.",
    footer_contact: "Contact Us",
    rights: "© 2024 CPA-Ye. All Rights Reserved.",

    // Ticker
    tickerText: "+++ Urgent: Field campaign to monitor food prices in Al-Qahirah district +++ Check expiry dates before purchasing +++ Call us to report violations +++",
    
    // Report Form
    report_title: "Report a Violation",
    product_name: "Product Name",
    shop_name: "Shop Name",
    price: "Official Price",
    observed_price: "Observed Price",
    price_diff: "Price Difference",
    violation_alert: "Alert: Price increase of",
    details: "Violation Details",
    location: "Location (Auto)",
    submit: "Submit Report",
    loc_fetching: "Fetching location...",
    loc_success: "Location acquired",
    
    // Admin
    admin_dashboard: "Dashboard",
    manage_news: "Manage News",
    manage_prices: "Update Prices",
    logout: "Logout",
    confirm_logout: "Confirm Logout",
    logout_desc: "Are you sure you want to log out?",
    cancel: "Cancel",

    // Transparency Dashboard
    transparency_title: "Transparency Dashboard",
    stat_solved: "Reports Solved",
    stat_reports: "Total Reports",
    stat_shops: "Shops Inspected",
    top_violations: "Top Violations",

    // Rights Guide
    rights_title: "Know Your Rights",
    q_expiry: "Found an expired product?",
    a_expiry: "You have the right to a full refund or replacement. You must report it immediately to remove it from the market.",
    q_price: "Price higher than official list?",
    a_price: "Merchants are bound by the official list. Keep the receipt and take a photo of the product/price to report.",
    q_invoice: "Merchant refused to give a receipt?",
    a_invoice: "The law requires merchants to issue a receipt for any item. Refusal is a punishable violation.",
    q_return: "Can I return the item?",
    a_return: "Yes, consumers have the right to return or exchange defective items within the warranty period.",
  }
};

export const NEWS_DATA: NewsItem[] = [
  { id: 1, date: "20 Oct 2023", titleKey: "news_1_title", descKey: "news_1_desc", image: "https://picsum.photos/seed/news1/400/300" },
  { id: 2, date: "25 Oct 2023", titleKey: "news_2_title", descKey: "news_2_desc", image: "https://picsum.photos/seed/news2/400/300" },
  { id: 3, date: "01 Nov 2023", titleKey: "news_3_title", descKey: "news_3_desc", image: "https://picsum.photos/seed/news3/400/300" },
];

export const SERVICES_DATA: ServiceItem[] = [
  { icon: 'search', titleKey: 'srv_1_title', descKey: 'srv_1_desc' },
  { icon: 'balance', titleKey: 'srv_2_title', descKey: 'srv_2_desc' },
  { icon: 'bullhorn', titleKey: 'srv_3_title', descKey: 'srv_3_desc' },
];

export const PUBLICATIONS_DATA: Publication[] = [
  { id: 1, type: 'pdf', titleKey: 'pub_1_name', size: '2.5 MB' },
  { id: 2, type: 'pdf', titleKey: 'pub_2_name', size: '5.1 MB' },
  { id: 3, type: 'excel', titleKey: 'pub_3_name', size: '1.0 MB' },
];

export const MOCK_PRICES: PriceItem[] = [
  { id: 1, code: "1001", nameAr: "دقيق أبيض (50 كجم)", nameEn: "White Flour (50kg)", price: 18000, lastUpdated: "2023-11-01" },
  { id: 2, code: "1002", nameAr: "سكر أبيض (50 كجم)", nameEn: "White Sugar (50kg)", price: 21500, lastUpdated: "2023-11-01" },
  { id: 3, code: "1003", nameAr: "زيت طبخ (20 لتر)", nameEn: "Cooking Oil (20L)", price: 14000, lastUpdated: "2023-11-02" },
  { id: 4, code: "1004", nameAr: "أرز بسمتي (10 كجم)", nameEn: "Basmati Rice (10kg)", price: 12500, lastUpdated: "2023-11-01" },
];

export const RIGHTS_DATA: RightGuideItem[] = [
  { id: '1', questionKey: 'q_expiry', answerKey: 'a_expiry', icon: 'time' },
  { id: '2', questionKey: 'q_price', answerKey: 'a_price', icon: 'tag' },
  { id: '3', questionKey: 'q_invoice', answerKey: 'a_invoice', icon: 'invoice' },
  { id: '4', questionKey: 'q_return', answerKey: 'a_return', icon: 'alert' },
];

export const DASHBOARD_STATS: DashboardStat[] = [
  { labelKey: 'stat_solved', value: '87%', trend: 'up', color: 'bg-green-500' },
  { labelKey: 'stat_reports', value: 1204, trend: 'neutral', color: 'bg-blue-500' },
  { labelKey: 'stat_shops', value: 450, trend: 'up', color: 'bg-accent' },
];
