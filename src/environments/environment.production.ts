export const environment = {
  production: true,
  appName: 'DocForge',
  appTagline: 'Create Professional Documents Instantly',
  appUrl: 'https://risheikdhir.github.io/my-app',
  deployUrl: 'https://risheikdhir.github.io/my-app',

  razorpay: {
    keyId: 'rzp_test_T3Zt65kohJdv7E', // TODO: Replace with live key before go-live
    currency: 'INR',
    themeColor: '#6366F1',
    companyName: 'DocForge',
    companyLogo: 'https://risheikdhir.github.io/my-app/assets/images/logo.png',
    paymentMode: 'frontend-demo' as const, // TODO: Switch to 'backend-ready' when API is deployed
  },

  features: {
    enableSubscriptions: true,
    enableCredits: false,
    enableOneTimePurchase: true,
    enableGuestMode: true,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableAdminPanel: false,
    enableAnalytics: false,
    enablePremiumTemplates: true,
    enableWatermark: true,
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
    useIndexedDb: false,
  },

  seo: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'hi'],
    defaultOgImage: 'https://risheikdhir.github.io/my-app/assets/images/og-default.png',
    twitterHandle: '@docforge',
    googleSiteVerification: '',
    structuredDataOrg: {
      name: 'DocForge',
      url: 'https://risheikdhir.github.io/my-app',
      logo: 'https://risheikdhir.github.io/my-app/assets/images/logo.png',
    },
  },

  pricing: {
    currency: 'INR',
    currencySymbol: '₹',
    perDownloadPrice: 1000,
    premiumTemplatePrice: 4900,
    proMonthlyPrice: 19900,
    proYearlyPrice: 149900,
    creditPackSmall: 4900,
    creditPackLarge: 14900,
    freeDownloadsPerMonth: 0,
    freeTemplatesCount: 5,
  },
} as const;

export type AppEnvironment = typeof environment;
