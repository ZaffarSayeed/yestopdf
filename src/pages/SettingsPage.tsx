import { useState } from 'react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [section, setSection] = useState('profile');
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoDelete, setAutoDelete] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'storage', label: 'Storage', icon: '💾' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account preferences and security options.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <nav className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`sidebar-link w-full mb-1 ${section === s.id ? 'active' : ''}`}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="md:col-span-3 animate-fadein">
            {section === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-bold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Profile Settings</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                    AJ
                  </div>
                  <div>
                    <button className="text-sm font-semibold text-indigo-600 hover:underline" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Change photo
                    </button>
                    <p className="text-xs text-slate-400 mt-0.5">JPG or PNG, max 2 MB</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Full name', value: 'Alex Johnson', type: 'text' },
                    { label: 'Email address', value: 'alex@example.com', type: 'email' },
                    { label: 'Organization (optional)', value: 'Freelance', type: 'text' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        defaultValue={f.value}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  ))}
                  <div className="pt-2">
                    <button className="btn-primary text-sm py-2.5 px-5">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {section === 'security' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Change Password</h2>
                  <div className="space-y-4">
                    {['Current password', 'New password', 'Confirm new password'].map(l => (
                      <div key={l}>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{l}</label>
                        <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                      </div>
                    ))}
                    <button className="btn-primary text-sm py-2.5 px-5">Update Password</button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                    </div>
                    <button
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${twoFactor ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${twoFactor ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {twoFactor && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-3 text-sm text-indigo-700">
                      2FA is enabled. Your account is protected.
                    </div>
                  )}
                </div>
              </div>
            )}

            {section === 'notifications' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-bold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Notification Preferences</h2>
                <div className="space-y-5">
                  {[
                    { label: 'File processing completed', desc: 'Get notified when your file is ready to download.', state: emailNotif, set: setEmailNotif },
                    { label: 'Product updates & tips', desc: 'Receive helpful PDF tips and new feature announcements.', state: marketingNotif, set: setMarketingNotif },
                  ].map(n => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="font-semibold text-sm text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>{n.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => n.set(!n.state)}
                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${n.state ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.state ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'storage' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-bold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Storage</h2>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700" style={{ fontFamily: 'Manrope, sans-serif' }}>Storage used</span>
                    <span className="text-sm text-slate-500">128 MB / 500 MB</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2.5">
                    <div className="h-full rounded-full bg-indigo-600" style={{ width: '26%' }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">372 MB remaining on free plan</p>
                </div>
                <button onClick={() => onNavigate('pricing')} className="btn-primary text-sm py-2.5 px-5">
                  Upgrade for More Storage
                </button>
              </div>
            )}

            {section === 'privacy' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-bold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Privacy Settings</h2>
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <p className="font-semibold text-sm text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Auto-delete processed files</p>
                      <p className="text-xs text-slate-500 mt-0.5">Automatically delete uploaded files after 1 hour.</p>
                    </div>
                    <button
                      onClick={() => setAutoDelete(!autoDelete)}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${autoDelete ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${autoDelete ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> We never use your documents for training, advertising, or any purpose beyond processing your request.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button className="text-sm font-semibold text-red-500 hover:underline" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Delete Account
                    </button>
                    <p className="text-xs text-slate-400 mt-1">This will permanently delete your account and all associated data.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
