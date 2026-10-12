interface ToolsPageProps {
  onNavigate: (page: string) => void;
}

const allTools = [
  { id: 'compress', name: 'Compress PDF', desc: 'Reduce PDF file size while maintaining quality.', color: '#4F46E5', bg: '#EEF2FF', emoji: '⚡', category: 'Optimize' },
  { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple PDF files into one document.', color: '#7C3AED', bg: '#F5F3FF', emoji: '🔗', category: 'Organize' },
  { id: 'split', name: 'Split PDF', desc: 'Extract pages or split a PDF into multiple files.', color: '#EC4899', bg: '#FDF2F8', emoji: '✂️', category: 'Organize' },
  { id: 'pdf-to-word', name: 'PDF to Word', desc: 'Convert PDF files into editable Word documents.', color: '#2563EB', bg: '#EFF6FF', emoji: '📝', category: 'Convert' },
  { id: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert Word documents into professional PDFs.', color: '#0891B2', bg: '#ECFEFF', emoji: '📄', category: 'Convert' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', desc: 'Convert PDF pages into high-quality JPG images.', color: '#D97706', bg: '#FFFBEB', emoji: '🖼️', category: 'Convert' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Create PDF files from your JPG images.', color: '#16A34A', bg: '#F0FDF4', emoji: '📎', category: 'Convert' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', desc: 'Convert PDF tables into editable Excel spreadsheets.', color: '#059669', bg: '#ECFDF5', emoji: '📊', category: 'Convert' },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', desc: 'Convert PDF files into PowerPoint presentations.', color: '#DC2626', bg: '#FEF2F2', emoji: '📋', category: 'Convert' },
  { id: 'pdf-to-png', name: 'PDF to PNG', desc: 'Export PDF pages as transparent PNG images.', color: '#9333EA', bg: '#FAF5FF', emoji: '🌄', category: 'Convert' },
  { id: 'rotate', name: 'Rotate PDF', desc: 'Rotate individual pages or the entire PDF document.', color: '#7C3AED', bg: '#F5F3FF', emoji: '🔄', category: 'Organize' },
  { id: 'protect', name: 'Protect PDF', desc: 'Password protect your sensitive PDF files.', color: '#1D4ED8', bg: '#EFF6FF', emoji: '🔒', category: 'Security' },
  { id: 'unlock', name: 'Unlock PDF', desc: 'Remove password protection from supported PDFs.', color: '#F59E0B', bg: '#FFFBEB', emoji: '🔓', category: 'Security' },
  { id: 'sign', name: 'Sign PDF', desc: 'Add your electronic signature to PDF documents.', color: '#4F46E5', bg: '#EEF2FF', emoji: '✍️', category: 'Edit' },
];

const categories = ['All', 'Convert', 'Organize', 'Optimize', 'Security', 'Edit'];

export default function ToolsPage({ onNavigate }: ToolsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            All PDF Tools
          </h1>
          <p className="text-slate-500 text-lg">
            14+ powerful tools to handle every PDF task — all in your browser, all for free.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                cat === 'All'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allTools.map(tool => (
            <button
              key={tool.id + tool.name}
              onClick={() => onNavigate(tool.id)}
              className="tool-card bg-white rounded-2xl p-6 text-left border border-slate-100 shadow-sm group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: tool.bg }}>
                  {tool.emoji}
                </div>
                <span className="text-xs font-semibold rounded-full px-2.5 py-1"
                  style={{ background: tool.bg, color: tool.color }}>
                  {tool.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold group-hover:translate-x-1 transition-transform"
                style={{ color: tool.color }}>
                Use Tool
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
