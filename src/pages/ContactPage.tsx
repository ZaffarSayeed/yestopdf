import { useState } from 'react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            How Can We Help?
          </h1>
          <p className="text-slate-500 text-lg">
            Our team is here to assist you. Send us a message and we'll get back to you within one business day.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm animate-fadein">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Message Sent!</h2>
                <p className="text-slate-500 mb-6">Thank you for reaching out. We'll respond within one business day.</p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Alex Johnson"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="alex@example.com"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 text-slate-700"
                    >
                      <option value="">Select a subject</option>
                      <option>Technical issue</option>
                      <option>Billing question</option>
                      <option>Feature request</option>
                      <option>Enterprise / Business inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Message
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your issue or question in detail..."
                      rows={5}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: '📧',
                title: 'Email Support',
                desc: 'For general questions and technical issues.',
                value: 'support@yestopdf.com',
                sub: 'Response within 24 hours',
                color: '#4F46E5',
                bg: '#EEF2FF',
              },
              {
                icon: '🏢',
                title: 'Business Support',
                desc: 'For Pro and Business plan customers.',
                value: 'business@yestopdf.com',
                sub: 'Priority response within 4 hours',
                color: '#7C3AED',
                bg: '#F5F3FF',
              },
              {
                icon: '📚',
                title: 'Help Center',
                desc: 'Browse our documentation and tutorials.',
                value: 'Visit Help Center →',
                sub: 'Available 24/7',
                color: '#059669',
                bg: '#ECFDF5',
              },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{c.desc}</p>
                  <p className="text-sm font-semibold" style={{ color: c.color }}>{c.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
