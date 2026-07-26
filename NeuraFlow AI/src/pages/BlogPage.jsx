import React, { useState } from 'react';
import { Search, Clock, Calendar, User, ArrowRight, X, Sparkles, Share2, BookOpen } from 'lucide-react';

export default function BlogPage({ setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Generative AI', 'Healthcare', 'Machine Learning', 'Strategy', 'Computer Vision'];

  const articles = [
    {
      id: 1,
      title: 'Future of Artificial Intelligence: Agentic Workflows & Multi-Modal Models',
      category: 'Generative AI',
      readTime: '6 min read',
      date: 'July 22, 2026',
      author: 'Dr. Elena Rostova',
      authorRole: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Discover why single-turn chatbots are evolving into multi-agent collaborative networks capable of executing complex enterprise workflows autonomously.',
      content: `The paradigm of artificial intelligence has officially shifted from passive zero-shot question answering to active autonomous execution. Modern enterprise systems no longer rely on single monolithic language models to handle every task.

Instead, leading organizations are deploying specialized Multi-Agent Networks. In this architecture, a primary orchestrator model delegates micro-tasks to specialized sub-agents: an SQL generator agent queries backend databases, a visual document parser extracts tabular figures from PDFs, and a verification agent audits the final output for compliance.

At NeuraFlow AI, our benchmark tests show that multi-agent collaborative loops increase complex task completion rates from 68% to 99.4% while reducing hallucination rates to near zero.`
    },
    {
      id: 2,
      title: 'How AI is Transforming Healthcare: From 3D Scans to Drug Discovery',
      category: 'Healthcare',
      readTime: '8 min read',
      date: 'July 18, 2026',
      author: 'Dr. Aris Thorne',
      authorRole: 'VP AI Research',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Explore how 3D Convolutional Neural Networks and molecular transformer models are accelerating hospital triage and antibody synthesis.',
      content: `Medical diagnostics require uncompromising precision. Over the past 24 months, 3D computer vision architectures trained on anonymized DICOM datasets have revolutionized diagnostic radiology.

By processing thousands of 3D CT slices in sub-second timeframes, vision models alert emergency department physicians to acute intracranial hemorrhages and pulmonary embolisms before human visual triage can even occur.

Simultaneously, generative protein folding models have slashed early-stage drug candidate identification from 4 years down to 9 weeks, promising a new era of personalized medicine.`
    },
    {
      id: 3,
      title: 'Top Machine Learning Trends in 2026: Quantization & Edge AI',
      category: 'Machine Learning',
      readTime: '5 min read',
      date: 'July 14, 2026',
      author: 'Marcus Vance',
      authorRole: 'CTO',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Why 4-bit INT4 quantization and edge TPU chips are bringing billion-parameter models directly onto localized hardware without internet connectivity.',
      content: `The race for raw model parameter size has met its economic match: edge efficiency. Running multi-billion parameter models in cloud data centers incurs significant latency and compute overhead for real-time applications.

Enter 4-bit INT4 quantization and FlashAttention-3 optimizations. Today, 8-billion parameter language models can run locally on consumer-grade microchips at 45 tokens per second while consuming less than 6 watts of power.

This breakthrough allows defense, maritime logistics, and industrial manufacturing sites to run air-gapped AI capabilities without sending sensitive telemetry over public clouds.`
    },
    {
      id: 4,
      title: 'AI for Small Businesses & Scale-Ups: Automating Operations on a Budget',
      category: 'Strategy',
      readTime: '4 min read',
      date: 'July 10, 2026',
      author: 'Sophia Chen',
      authorRole: 'VP Product Growth',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Practical step-by-step strategies for high-growth startups to automate customer onboarding and invoice reconciliation without hiring large teams.',
      content: `You don't need a $50M engineering budget to leverage artificial intelligence effectively. For growing scale-ups, high-ROI AI implementation starts with identifying repetitive manual data entry bottlenecks.

By integrating lightweight RAG agents into your existing CRM, customer inquiries can be automatically categorized, drafted, and resolved. Scale-ups implementing targeted workflow automation capture 3.4x higher output per employee within 90 days.`
    },
    {
      id: 5,
      title: 'Chatbots Explained: Building RAG Pipelines for Zero Hallucinations',
      category: 'Generative AI',
      readTime: '7 min read',
      date: 'July 05, 2026',
      author: 'Marcus Vance',
      authorRole: 'CTO',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80',
      excerpt: 'A technical deep-dive into chunking strategies, hybrid BM25 + dense vector retrieval, and re-ranking for enterprise search.',
      content: `Standard pre-trained language models suffer from hallucinations because they lack real-time access to your enterprise's internal knowledge base. Retrieval-Augmented Generation (RAG) solves this by fetching exact documentation snippets before generating responses.

To achieve 99%+ accuracy, we utilize semantic chunking with overlapping windows, hybrid vector search combining BM25 keyword matching with dense cosine similarity, and cross-encoder re-ranking models.`
    },
    {
      id: 6,
      title: 'Computer Vision Applications in Manufacturing & Agriculture',
      category: 'Computer Vision',
      readTime: '6 min read',
      date: 'June 28, 2026',
      author: 'Dr. Elena Rostova',
      authorRole: 'CEO',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      excerpt: 'How real-time object detection models inspect 1,000 items per minute on conveyor belts to eliminate manufacturing defects.',
      content: `High-speed assembly lines move faster than the human eye can track. Traditional static optical sensors struggle with lighting changes and irregular object shapes.

Modern vision transformers trained on synthetic 3D CAD models detect microscopic cracks, soldering defects, and packaging misalignments at 60 frames per second, ensuring zero defective units reach customers.`
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          Thought Leadership & Research
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          NeuraFlow AI Blog
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Deep technical breakdowns, MLOps tutorials, and strategic guides written by our research scientists and principal engineers.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI articles, benchmarks, or guides..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-white/15 rounded-2xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-glow-primary'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-cyan-300 uppercase tracking-widest">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Full Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-white/20 shadow-2xl relative bg-slate-900 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-widest">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-400">• {selectedArticle.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading mb-4 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center space-x-3 pb-6 border-b border-white/10 mb-6 text-xs text-slate-300">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                {selectedArticle.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-white block">{selectedArticle.author}</span>
                <span className="text-slate-400 text-[11px]">{selectedArticle.authorRole} • Published {selectedArticle.date}</span>
              </div>
            </div>

            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 mb-8">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Close Article
              </button>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-glow-primary hover:scale-[1.02] transition-all"
              >
                Discuss This Technology for Your Company
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
