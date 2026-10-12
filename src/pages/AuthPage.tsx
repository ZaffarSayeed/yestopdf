import { useState } from 'react';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export default function AuthPage({ mode, onNavigate, onLogin }: AuthPageProps) {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); onNavigate('dashboard'); }, 1000);
  };

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 text-white"
        style={{ background: 'linear-gradient(160deg, #4F46E5 0%, #7C3AED 100%)' }}>
        <div>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-16">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="1" width="10" height="13" rx="1.5" fill="white" opacity="0.9"/>
                <rect x="6" y="4" width="4" height="1" rx="0.5" fill="#4F46E5"/>
                <rect x="6" y="6.5" width="4" height="1" rx="0.5" fill="#4F46E5"/>
                <rect x="6" y="9" width="2.5" height="1" rx="0.5" fill="#4F46E5"/>
              </svg>
            </div>
            <span className="font-extrabold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>YesToPDF</span>
          </button>

          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {isLogin ? 'Welcome back.' : 'Join 50,000+ users.'}
          </h2>
          <p className="text-indigo-200 text-lg leading-relaxed mb-12">
            {isLogin
              ? 'Sign in to access your files, usage history, and favorite tools.'
              : 'Start working with PDFs the smart way — free, fast, and secure.'}
          </p>

          <div className="space-y-5">
            {[
              { icon: '⚡', text: '14+ professional PDF tools' },
              { icon: '🔒', text: 'Bank-grade SSL encryption' },
              { icon: '🗑️', text: 'Automatic file deletion after 1 hour' },
              { icon: '📱', text: 'Works on any device, no install needed' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="text-xl">{f.icon}</span>
                <span className="text-indigo-100 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-indigo-300 text-sm">
          © {new Date().getFullYear()} YesToPDF. All rights reserved.
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {isLogin ? 'Sign in to YesToPDF' : 'Create your account'}
            </h1>
            <p className="text-slate-500 text-sm">
              {isLogin ? 'New here?' : 'Already have an account?'}{' '}
              <button
                onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Google SSO */}
          <button className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 px-3 text-xs text-slate-400">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Alex Johnson"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                />
              </div>
            )}

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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-xs text-indigo-600 hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Confirm password
                </label>
                <input
                  type="password"
                  required
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                />
              </div>
            )}

            {isLogin && (
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', fontFamily: 'Manrope, sans-serif' }}
            >
              {loading ? (
                <svg className="animate-spin-slow w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            {!isLogin && (
              <p className="text-xs text-slate-400 text-center">
                By creating an account you agree to our{' '}
                <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
