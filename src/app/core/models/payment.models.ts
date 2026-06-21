// ─── Payment / Pricing / Billing Domain Models ────────────────────────────────

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled' | 'refunded';

export type PaymentPurpose =
  | 'template-unlock'
  | 'pdf-download'
  | 'premium-plan'
  | 'credit-pack';

export interface PaymentRecord {
  id: string;
  razorpayPaymentId: string;
  // TODO: populate razorpayOrderId when backend order creation is available
  razorpayOrderId?: string;
  razorpaySignature?: string; // TODO: verify on backend; always null in frontend-demo mode
  profileId: string;
  amount: number;             // in paise
  currency: string;           // 'INR'
  status: PaymentStatus;
  purpose: PaymentPurpose;
  resourceId?: string;        // templateId or documentId being unlocked
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  // NOTE: isVerified is always false in frontend-demo mode.
  // TODO: Set to true only after server-side Razorpay signature verification.
  isVerified: boolean;
}

export interface PaymentIntent {
  amount: number;             // in paise
  currency: string;
  purpose: PaymentPurpose;
  resourceId?: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro-monthly' | 'pro-yearly';
  name: string;
  description: string;
  priceInPaise: number;
  currency: string;
  interval?: 'month' | 'year';
  features: string[];
  templateAccess: 'free-only' | 'all';
  downloadLimitPerMonth?: number; // undefined = unlimited
  watermark: boolean;
  supportLevel: 'community' | 'email' | 'priority';
  highlighted?: boolean;
  badge?: string;             // 'Most Popular', 'Best Value' etc.
}

export interface CreditWallet {
  profileId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: CreditTransaction[];
}

export interface CreditTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;             // number of credits
  description: string;
  createdAt: string;
  relatedPaymentId?: string;
  relatedDocumentId?: string;
}

export interface InvoiceRecord {
  id: string;
  paymentId: string;
  profileId: string;
  amount: number;             // in paise
  currency: string;
  lineItems: InvoiceLineItem[];
  issuedAt: string;
  // NOTE: In frontend-only mode this is a locally generated mock invoice.
  // TODO: Replace with backend-issued invoice / receipt PDF.
  isLocalMock: boolean;
}

export interface InvoiceLineItem {
  description: string;
  unitPrice: number;          // in paise
  quantity: number;
  total: number;              // in paise
}

export interface PricingRule {
  id: string;
  name: string;
  resourceType: 'template' | 'pdf-download' | 'plan' | 'credit-pack';
  resourceId?: string;        // specific template id, plan id etc.
  amountInPaise: number;
  currency: string;
  isActive: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out DocForge',
    priceInPaise: 0,
    currency: 'INR',
    features: [
      'Access to 5 free templates',
      'Unlimited draft saves',
      'Live preview',
      'Download with watermark (₹10 to remove)',
      'Print support',
    ],
    templateAccess: 'free-only',
    downloadLimitPerMonth: 0,
    watermark: true,
    supportLevel: 'community',
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    description: 'For active job seekers and professionals',
    priceInPaise: 19900,      // ₹199/month
    currency: 'INR',
    interval: 'month',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'All premium templates',
      'Unlimited PDF downloads',
      'No watermark',
      'Priority support',
      'Download history',
      'Multiple saved documents',
      'Early access to new templates',
    ],
    templateAccess: 'all',
    downloadLimitPerMonth: undefined,
    watermark: false,
    supportLevel: 'email',
  },
  {
    id: 'pro-yearly',
    name: 'Pro Yearly',
    description: 'Best value — save ₹990 vs monthly',
    priceInPaise: 149900,     // ₹1499/year
    currency: 'INR',
    interval: 'year',
    badge: 'Best Value',
    features: [
      'Everything in Pro Monthly',
      'Save 37% vs monthly',
      'Priority chat support',
      'Custom colour themes',
      'Bulk download',
      'Invoice / receipts',
    ],
    templateAccess: 'all',
    downloadLimitPerMonth: undefined,
    watermark: false,
    supportLevel: 'priority',
  },
];
