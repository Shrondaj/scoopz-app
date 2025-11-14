import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown, Coffee } from 'lucide-react';

const PricingPage = ({ onSubscribe, currentPlan = 'free' }) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      badge: null,
      icon: Sparkles,
      description: 'Perfect for trying out Scoopz',
      features: [
        '10 content generations per month',
        'All format recommendations',
        'Trending topics access',
        'Content calendar (7 days)',
        '"Created with Scoopz" watermark'
      ],
      cta: 'Current Plan',
      popular: false
    },
    {
      id: 'creator',
      name: 'Creator',
      price: 14,
      yearlyPrice: 140,
      badge: '🔥 Founding Member',
      icon: Zap,
      description: 'For serious content creators',
      features: [
        '✨ Unlimited content generations',
        'No watermarks',
        'Priority generation speed',
        'Content history saved',
        'All future features included',
        'Lock in $14 price forever'
      ],
      cta: 'Upgrade to Creator',
      popular: true,
      highlight: 'Limited Time: First 100 members only!'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      yearlyPrice: 490,
      badge: null,
      icon: Crown,
      description: 'For established creators & agencies',
      features: [
        'Everything in Creator, plus:',
        'Performance analytics',
        'Team collaboration (3 seats)',
        'API access',
        'Priority support',
        'Custom integrations'
      ],
      cta: 'Coming Soon',
      popular: false,
      disabled: true
    }
  ];

  const handleSelectPlan = (planId, price) => {
    if (planId === 'free' || planId === 'pro') return;
    onSubscribe(planId, billingPeriod === 'yearly' ? 'year' : 'month', price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get the likes. Get the following. Get monetized.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingPeriod === 'yearly' ? plan.yearlyPrice : plan.price;
            const isCurrentPlan = currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-xl ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                
                {/* Badge */}
                {plan.badge && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    {price > 0 && (
                      <span className="text-gray-600">
                        /{billingPeriod === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && price > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      ${(price / 12).toFixed(2)}/month when billed yearly
                    </p>
                  )}
                </div>

                {/* Highlight */}
                {plan.highlight && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-700 text-center">
                      {plan.highlight}
                    </p>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id, price)}
                  disabled={isCurrentPlan || plan.disabled}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : plan.disabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Ko-fi Support Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-8 h-8 text-pink-600" />
            <h2 className="text-2xl font-bold text-gray-900">Love Scoopz?</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Buy me a coffee and help keep Scoopz improving! Your support means the world. ☕
          </p>
          <a
            href="https://ko-fi.com/shrondaj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Coffee className="w-5 h-5" />
            Buy Me a Coffee on Ko-fi
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Support indie creators making tools for creators! 🚀
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Cancel anytime with one click. No questions asked. Founding members keep their locked-in price if they return.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">What's the Founding Member price?</h4>
              <p className="text-gray-600 text-sm">
                Lock in $14/month forever! First 100 members only. Price increases to $19/month after that.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">
                Absolutely. If you're not happy within 7 days, we'll refund you fully. No questions asked.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">
                All major credit cards, debit cards, and digital wallets through Stripe. Secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;