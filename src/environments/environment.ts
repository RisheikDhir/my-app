export const environment = {
  production: false,
  appName: 'DocForge',
  appTagline: 'Create Professional Documents Instantly',
  appUrl: 'http://localhost:4200',
  deployUrl: 'http://localhost:4200',

  razorpay: {
    keyId: 'rzp_test_T3Zt65kohJdv7E',
    currency: 'INR',
    themeColor: '#6366F1',
    companyName: 'DocForge',
    companyLogo: '/assets/images/logo.png',
    // 'frontend-demo' = no backend; 'backend-ready' = calls API for order creation
    paymentMode: 'frontend-demo' as const,
  },

  features: {
    enableSubscriptions: true,
    enableCredits: false,          // future: credit wallet
    enableOneTimePurchase: true,
    enableGuestMode: true,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableAdminPanel: false,
    enableAnalytics: false,        // Phase 8
    enablePremiumTemplates: true,
    enableWatermark: true,         // shown on free PDF exports
    enablePrintFlow: true,
    enableShareLink: true,
  },

  storage: {
    prefix: 'docforge_',
    documentsKey: 'documents',
    profileKey: 'profile',
    sessionKey: 'session',
    paymentsKey: 'payments',
    downloadsKey: 'downloads',
    settingsKey: 'settings',
    grantedAccessKey: 'access_grants',
    encryptLocalData: false,
    useIndexedDb: false,           // Phase 6 — IndexedDB adapter
  },

  seo: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'hi'],
    defaultOgImage: '/assets/images/og-default.png',
    twitterHandle: '@docforge',
    googleSiteVerification: '',
    structuredDataOrg: {
      name: 'DocForge',
      url: 'http://localhost:4200',
      logo: '/assets/images/logo.png',
    },
  },

  pricing: {
    currency: 'INR',
    currencySymbol: '₹',
    perDownloadPrice: 1000,        // in paise (₹10)
    premiumTemplatePrice: 4900,    // in paise (₹49)
    proMonthlyPrice: 19900,        // in paise (₹199)
    proYearlyPrice: 149900,        // in paise (₹1499)
    creditPackSmall: 4900,         // 5 credits
    creditPackLarge: 14900,        // 20 credits
    freeDownloadsPerMonth: 0,
    freeTemplatesCount: 5,
  },
} as const;

export type AppEnvironment = typeof environment;
