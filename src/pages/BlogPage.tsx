interface BlogPageProps {
  onNavigate: (page: string) => void;
}

const categories = ['All', 'PDF Tips', 'Productivity', 'Tutorials', 'File Conversion', 'Document Management'];

const posts = [
  {
    id: 1,
    category: 'PDF Tips',
    title: 'How to Reduce PDF File Size Without Losing Quality',
    desc: 'Learn the best compression techniques to shrink your PDF files while keeping images and text crisp.',
    date: 'Sep 28, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop&auto=format',
    featured: true,
  },
  {
    id: 2,
    category: 'Productivity',
    title: '10 PDF Workflows That Save You Hours Every Week',
    desc: 'From batch compression to automated conversion, discover the PDF habits of highly efficient professionals.',
    date: 'Sep 24, 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    id: 3,
    category: 'Tutorials',
    title: 'The Complete Guide to Merging PDFs Online',
    desc: 'Step-by-step instructions for combining multiple PDF files into a single, well-organized document.',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    id: 4,
    category: 'File Conversion',
    title: 'PDF to Word: When to Convert and When Not To',
    desc: 'Understanding the trade-offs of converting PDFs to editable Word documents — and when it makes sense.',
    date: 'Sep 16, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    id: 5,
    category: 'Document Management',
    title: 'Protecting Sensitive PDFs: A Practical Guide',
    desc: 'How to password-protect, restrict permissions, and securely share confidential PDF documents.',
    date: 'Sep 12, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    id: 6,
    category: 'Tutorials',
    title: 'How to Split a PDF Into Multiple Files',
    desc: 'Extract specific pages or divide large PDFs into smaller files — all without downloading any software.',
    date: 'Sep 8, 2026',
    readTime: '3 min read',
    img: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
];

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            PDF Tips & Resources
          </h1>
          <p className="text-slate-500 text-lg">
            Guides, tutorials, and productivity tips for anyone who works with PDFs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
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

        {/* Featured post */}
        {featured && (
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm mb-8 lg:grid lg:grid-cols-2">
            <div className="h-64 lg:h-auto bg-slate-100 overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
                  {featured.category}
                </span>
                <span className="text-xs text-slate-400">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {featured.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">{featured.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{featured.date}</span>
                <button className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm tool-card">
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2 leading-snug text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Read Article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
