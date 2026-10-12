import { useState } from 'react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    desc: 'Perfect for occasional use.',
    color: '#64748B',
    highlight: false,
    features: [
      'Access to all core PDF tools',
      'Up to 3 files per day',
      'Maximum 25 MB per file',
      'Standard processing speed',
      'Files deleted after 1 hour',
    ],
    notIncluded: [
      'Batch processing',
      'Priority support',
      'No ads',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'secondary',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 399,
    yearly: 3499,
    desc: 'For professionals who work with PDFs daily.',
    color: '#4F46E5',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'All PDF tools, unlimited use',
      'Up to 200 MB per file',
      'Batch processing (up to 20 files)',
      'Priority processing speed',
      'No advertisements',
      'Files stored for 24 hours',
      'Email support',
    ],
    notIncluded: [
      'Team workspace',
      'Usage analytics',
    ],
    cta: 'Start Pro',
    ctaStyle: 'primary',
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 999,
    yearly: 8999,
    desc: 'For teams and organizations.',
    color: '#7C3AED',
    highlight: false,
    features: [
      'Everything in Pro',
      'Team workspace (up to 10 users)',
      'Up to 1 GB per file',
      'Unlimited batch processing',
      'Priority phone & email support',
      'Usage analytics dashboard',
      'API access',
      'Custom file retention policies',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    ctaStyle: 'secondary',
  },
];

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Simple Pricing for Everyone
          </h1>
          <p className="text-slate-500 text-lg mb-8">
            Start free, upgrade when you need more power.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 p-1 rounded-full">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${yearly ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">Save 27%</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 border-2 shadow-sm ${
                plan.highlight ? 'border-indigo-500 shadow-xl' : 'border-slate-100'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {plan.name}
                </h2>
                <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold" style={{ fontFamily: 'Manrope, sans-serif', color: plan.color }}>
                    ₹{yearly ? (plan.yearly / 12).toFixed(0) : plan.monthly}
                  </span>
                  <span className="text-slate-500 pb-1">/month</span>
                </div>
                {yearly && plan.yearly > 0 && (
                  <p className="text-xs text-slate-400 mt-1">₹{plan.yearly} billed yearly</p>
                )}
              </div>

              <button
                onClick={() => onNavigate(plan.id === 'free' ? 'signup' : plan.id === 'business' ? 'contact' : 'signup')}
                className={`w-full py-3.5 rounded-xl font-bold text-sm mb-6 ${
                  plan.highlight
                    ? 'text-white'
                    : plan.id === 'business'
                    ? 'text-purple-700 border-2 border-purple-200 hover:bg-purple-50'
                    : 'text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
                }`}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  ...(plan.highlight ? { background: 'linear-gradient(135deg, #4F46E5, #6366F1)' } : {}),
                }}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-sm text-slate-600">{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span className="text-sm text-slate-400">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
          <p className="text-slate-600 mb-4">
            All plans include SSL encryption, automatic file deletion, and no registration required for basic use.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {['SSL Encrypted', 'Auto File Deletion', 'No Credit Card for Free Plan', 'Cancel Anytime', 'GDPR Compliant'].map(b => (
              <div key={b} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
