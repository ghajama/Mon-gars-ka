// 🎨 MANGAKA AI - Stripe Configuration
export const STRIPE_CONFIG = {
  // API Keys
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,

  // Product & Pricing - PRODUCTION MODE
  product: {
    id: 'prod_SY1Ks2LInmwzOj',
    name: 'Mangaka Senior',
    description: 'Premium plan for serious manga creators - Unlimited generation, advanced tools, high-quality export'
  },

  prices: {
    monthly: {
      id: 'price_1Rdew8CAB3oSopcY1szsdUj5',
      amount: 2500, // 25€ in cents
      currency: 'eur',
      interval: 'month',
      type: 'recurring'
    },
    yearly: {
      id: 'price_1RdewLCAB3oSopcYc8MkOUR2',
      amount: 8000, // 80€ in cents (with -220€ promotion)
      currency: 'eur',
      interval: 'year',
      type: 'recurring'
    }
  },

  // Payment Links - PRODUCTION MODE (Recurring subscriptions)
  paymentLinks: {
    monthly: '/api/stripe/create-checkout-session?plan=monthly',
    yearly: '/api/stripe/create-checkout-session?plan=yearly'
  },

  // Pricing Plans for UI
  plans: [
    {
      id: 'junior',
      name: 'Mangaka Junior',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for discovering manga creation',
      features: [
        { name: 'Limited characters', included: true },
        { name: 'Limited backgrounds', included: true },
        { name: 'Limited scenes', included: true },
        { name: 'Limited pages', included: true },
        { name: 'Limited projects', included: true },
        { name: 'Limited export', included: true }
      ],
      highlight: false,
      paymentLinks: null
    },
    {
      id: 'senior',
      name: 'Mangaka Senior',
      price: { monthly: 25, yearly: 80 },
      description: 'For serious manga creators',
      features: [
        { name: 'Unlimited characters', included: true, highlight: 'unlimited' },
        { name: 'Unlimited backgrounds', included: true, highlight: 'unlimited' },
        { name: 'Unlimited scenes', included: true, highlight: 'unlimited' },
        { name: 'Unlimited pages', included: true, highlight: 'unlimited' },
        { name: 'Unlimited projects', included: true, highlight: 'unlimited' },
        { name: 'Unlimited export', included: true, highlight: 'unlimited' }
      ],
      highlight: true,
      paymentLinks: {
        monthly: '/api/stripe/create-checkout-session?plan=monthly',
        yearly: '/api/stripe/create-checkout-session?plan=yearly'
      }
    }
  ],

  // Feature Configuration by Plan
  features: {
    junior: [
      'basic_generation',
      'limited_export'
    ],
    senior: [
      'unlimited_generation',
      'unlimited_characters',
      'unlimited_backgrounds',
      'unlimited_scenes',
      'unlimited_pages',
      'unlimited_projects',
      'unlimited_export',
      'advanced_tools',
      'hd_export',
      'priority_support'
    ]
  },

  // Usage Limits by Plan
  limits: {
    junior: {
      generations_per_month: 10,
      projects: 3,
      export_quality: 'low'
    },
    senior: {
      generations_per_month: -1, // unlimited
      projects: -1, // unlimited
      export_quality: 'high'
    }
  }
}

// TypeScript Types
export interface StripePlan {
  id: string
  name: string
  price: { monthly: number; yearly: number }
  description: string
  features: Array<{
    name: string
    included: boolean
    highlight?: string
  }>
  highlight: boolean
  paymentLinks?: {
    monthly: string
    yearly: string
  } | null
}

// Utility Functions
export function getSeniorPlan(): StripePlan | undefined {
  return STRIPE_CONFIG.plans.find(plan => plan.id === 'senior')
}

export function getPaymentLink(interval: 'monthly' | 'yearly'): string | null {
  return STRIPE_CONFIG.paymentLinks[interval] || null
}

export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function hasFeature(planId: string, feature: string): boolean {
  const planFeatures = STRIPE_CONFIG.features[planId as keyof typeof STRIPE_CONFIG.features]
  return planFeatures?.includes(feature) || false
}

export function getPlanLimits(planId: string) {
  return STRIPE_CONFIG.limits[planId as keyof typeof STRIPE_CONFIG.limits] || STRIPE_CONFIG.limits.junior
}
