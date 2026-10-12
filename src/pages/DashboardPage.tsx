import { useState } from 'react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

type DashSection = 'dashboard' | 'files' | 'activity' | 'billing' | 'settings';

const recentFiles = [
  { name: 'Q3-Financial-Report.pdf', tool: 'Compress PDF', date: 'Today, 10:32 AM', size: '3.2 MB', status: 'done', orig: '12.4 MB' },
  { name: 'Contract-Template.pdf', tool: 'PDF to Word', date: 'Today, 9:14 AM', size: '1.8 MB', status: 'done', orig: '1.8 MB' },
  { name: 'Invoice-April-2026.pdf', tool: 'Protect PDF', date: 'Yesterday, 3:45 PM', size: '540 KB', status: 'done', orig: '540 KB' },
  { name: 'Project-Proposal.pdf', tool: 'Merge PDF', date: 'Yesterday, 11:00 AM', size: '5.6 MB', status: 'done', orig: '14.2 MB' },
  { name: 'Resume-Draft.docx', tool: 'Word to PDF', date: 'Sep 28, 4:12 PM', size: '244 KB', status: 'done', orig: '244 KB' },
];

const quickTools = [
  { id: 'compress', name: 'Compress PDF', emoji: '⚡', color: '#4F46E5', bg: '#EEF2FF' },
  { id: 'merge', name: 'Merge PDF', emoji: '🔗', color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'pdf-to-word', name: 'PDF to Word', emoji: '📝', color: '#2563EB', bg: '#EFF6FF' },
  { id: 'split', name: 'Split PDF', emoji: '✂️', color: '#EC4899', bg: '#FDF2F8' },
];

const stats = [
  { label: 'Files Processed', value: '47', icon: '📄', color: '#4F46E5', bg: '#EEF2FF' },
  { label: 'Storage Used', value: '128 MB', icon: '💾', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Daily Credits', value: '∞', icon: '⚡', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Saved Files', value: '12', icon: '⭐', color: '#059669', bg: '#ECFDF5' },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [section, setSection] = useState<DashSection>('dashboard');

  const sidebarLinks: { id: DashSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'files', label: 'My Files', icon: '📁' },
    { id: 'activity', label: 'Recent Activity', icon: '🕐' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-100 min-h-screen">
        <div className="p-4 border-b border-slate-100">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="1" width="10" height="13" rx="1.5" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span className="font-extrabold text-sm text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>YesToPDF</span>
          </button>
        </div>

        <nav className="p-3 flex-1">
          {sidebarLinks.map(link => (
            <button
              key={link.id}
              onClick={() => link.id === 'settings' ? onNavigate('settings') : setSection(link.id)}
              className={`sidebar-link w-full mb-1 ${section === link.id ? 'active' : ''}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}

          <div className="border-t border-slate-100 mt-4 pt-4">
            <button
              onClick={() => onNavigate('tools')}
              className="sidebar-link w-full"
            >
              <span>🛠️</span>
              All PDF Tools
            </button>
          </div>
        </nav>

        {/* Plan badge */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-50 rounded-xl p-3">
            <p className="text-xs font-bold text-indigo-800 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Free Plan</p>
            <div className="bg-indigo-200 rounded-full h-1.5 mb-2">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '30%' }} />
            </div>
            <p className="text-xs text-indigo-600">3 of 10 daily files used</p>
            <button
              onClick={() => onNavigate('pricing')}
              className="mt-2 w-full text-xs py-1.5 rounded-lg font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', fontFamily: 'Manrope, sans-serif' }}
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-16 z-40">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              placeholder="Search files..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div className="flex items-center gap-3 ml-4">
            <button className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {section === 'dashboard' && (
            <div className="animate-fadein">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Welcome back, Alex! 👋
              </h1>
              <p className="text-slate-500 text-sm mb-8">Here's what's happening with your files.</p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                      style={{ background: s.bg }}>
                      {s.icon}
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900 mb-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick tools */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-slate-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {quickTools.map(t => (
                    <button
                      key={t.id}
                      onClick={() => onNavigate(t.id)}
                      className="tool-card bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-2xl mb-2"
                        style={{ background: t.bg }}>
                        {t.emoji}
                      </div>
                      <p className="text-xs font-semibold text-slate-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {t.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent files */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Files</h2>
                  <button onClick={() => setSection('files')} className="text-xs text-indigo-600 font-semibold hover:underline">
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                        <th className="text-left px-6 py-3 font-semibold">Filename</th>
                        <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Tool</th>
                        <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Date</th>
                        <th className="text-left px-4 py-3 font-semibold">Size</th>
                        <th className="text-right px-6 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentFiles.map((f, i) => (
                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">📄</span>
                              <span className="font-medium text-slate-700 text-xs truncate max-w-[160px]">{f.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className="text-xs text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 font-medium">
                              {f.tool}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-500">{f.date}</td>
                          <td className="px-4 py-3 text-xs text-slate-500">{f.size}</td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="text-xs text-indigo-600 font-semibold hover:underline">Download</button>
                              <span className="text-slate-200">|</span>
                              <button className="text-xs text-slate-400 hover:text-red-500">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {section === 'files' && (
            <div className="animate-fadein">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>My Files</h1>
                <button className="btn-primary text-sm py-2 px-4">Upload New File</button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input placeholder="Search files..." className="w-full pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400" />
                  </div>
                  <select className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none text-slate-600">
                    <option>All tools</option>
                    <option>Compress PDF</option>
                    <option>Merge PDF</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {recentFiles.map((f, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-4 hover:border-indigo-200 hover:shadow-sm group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">📄</div>
                        <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                          </svg>
                        </button>
                      </div>
                      <p className="font-semibold text-sm text-slate-800 truncate mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{f.name}</p>
                      <p className="text-xs text-slate-500">{f.size} · {f.date}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 text-xs py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                          style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Download
                        </button>
                        <button className="text-xs py-1.5 px-3 rounded-lg font-semibold text-red-400 hover:bg-red-50"
                          style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'billing' && (
            <div className="animate-fadein max-w-2xl">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Billing</h1>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Current plan</p>
                    <p className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Free</p>
                  </div>
                  <button onClick={() => onNavigate('pricing')} className="btn-primary text-sm py-2 px-4">
                    Upgrade to Pro
                  </button>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                  You're using the free plan. Upgrade to Pro for unlimited tools, larger files, and faster processing.
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-bold text-slate-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Billing History</h2>
                <p className="text-sm text-slate-500">No invoices yet. Your billing history will appear here once you subscribe.</p>
              </div>
            </div>
          )}

          {section === 'activity' && (
            <div className="animate-fadein max-w-2xl">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Activity</h1>
              <div className="flex flex-col gap-3">
                {recentFiles.map((f, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>{f.name}</p>
                      <p className="text-xs text-slate-500">{f.tool} · {f.date}</p>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 rounded-full px-2.5 py-1">Done</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
