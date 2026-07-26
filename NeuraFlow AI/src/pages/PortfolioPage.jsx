import React, { useState } from 'react';
import { 
  Building2, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  X, 
  TrendingUp, 
  ShieldAlert, 
  Sprout, 
  UserCheck, 
  Stethoscope, 
  ShoppingCart 
} from 'lucide-react';

export default function PortfolioPage({ setActivePage }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'Healthcare', 'FinTech', 'Retail', 'AgriTech', 'Enterprise'];

  const projects = [
    {
      id: 'healthcare',
      category: 'Healthcare',
      title: 'Healthcare AI Diagnostic Assistant',
      client: 'OmniHealth Network',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      icon: Stethoscope,
      challenge: 'OmniHealth radiology teams faced a 3-week backlog analyzing over 45,000 annual MRI and CT scans, delaying patient triage.',
      solution: 'Deployed a HIPAA-compliant 3D CNN computer vision pipeline that automatically highlights acute anomalies and prioritizes emergency cases in real time.',
      tech: ['PyTorch', 'DICOM', 'CUDA', 'AWS HealthImaging', 'FastAPI'],
      impact: [
        '99.4% diagnostic accuracy rate verified by clinical trials',
        '88% reduction in radiologist scan review latency (3 weeks -> 2 hours)',
        'Zero false negatives on emergency critical trauma cases'
      ]
    },
    {
      id: 'retail',
      category: 'Retail',
      title: 'Retail Predictive Analytics & Demand Engine',
      client: 'NextGen Retail Outlets',
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=80',
      icon: ShoppingCart,
      challenge: 'Overstocking and stockout inefficiencies across 1,200 retail stores caused $34M in annual lost margin and perishable waste.',
      solution: 'Built an integrated time-series demand forecasting model ingesting local weather, foot-traffic telemetry, and macroeconomic trends.',
      tech: ['Prophet', 'DeepAR', 'Apache Spark', 'Snowflake', 'Tableau'],
      impact: [
        '$22M in annual inventory carrying cost savings',
        '94.2% demand prediction accuracy across 50,000 SKUs',
        '42% reduction in perishable food waste'
      ]
    },
    {
      id: 'agritech',
      category: 'AgriTech',
      title: 'Autonomous Smart Agriculture Platform',
      client: 'AgriTech One Global',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
      icon: Sprout,
      challenge: 'Large-scale commercial farms struggled to detect early crop pest infestations and optimize variable water irrigation.',
      solution: 'Constructed an edge-computing multispectral satellite and drone vision model running real-time crop stress algorithms.',
      tech: ['YOLOv9', 'NVIDIA Jetson', 'OpenCV', 'TensorRT', 'GIS'],
      impact: [
        '31% reduction in agricultural water consumption',
        '18% overall crop yield increase across 250,000 acres',
        'Early pest warning notification 14 days before visible damage'
      ]
    },
    {
      id: 'talent',
      category: 'Enterprise',
      title: 'Resume Screening AI & Talent Matcher',
      client: 'Global Talent Corp',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      icon: UserCheck,
      challenge: 'HR recruiting managers spent over 40 hours per role manually sifting through 10,000+ unstructured resumes.',
      solution: 'Developed an unbiased NLP semantic matching engine that analyzes candidate skill topologies against job requirements.',
      tech: ['BERT', 'Pinecone Vector DB', 'spaCy', 'LangChain', 'React'],
      impact: [
        '4.2x faster time-to-hire ratio',
        '92% hiring manager satisfaction with shortlist candidates',
        'Eliminated unconscious demographic bias in initial screening'
      ]
    },
    {
      id: 'fraud',
      category: 'FinTech',
      title: 'Finance Fraud & Anomaly Detection System',
      client: 'Horizon Financial',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      icon: ShieldAlert,
      challenge: 'Sophisticated multi-vector credit card transaction fraud was evading traditional static rule-based security systems.',
      solution: 'Engineered a graph neural network (GNN) streaming pipeline evaluating microsecond transaction topologies.',
      tech: ['PyTorch Geometric', 'Kafka', 'Redis', 'Docker', 'Kubernetes'],
      impact: [
        '$48M in prevented fraudulent credit transactions',
        'Sub-8ms latency response on 15,000 TPS',
        '75% decrease in false-positive legitimate card blocks'
      ]
    },
    {
      id: 'inventory',
      category: 'Enterprise',
      title: 'Supply Chain & Inventory Forecasting',
      client: 'LogiGlobal Logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      icon: TrendingUp,
      challenge: 'Global port congestion and shipping route disruptions led to unmanaged warehouse bottlenecks.',
      solution: 'Created an autonomous agent network that calculates optimal shipping rerouting vectors dynamically based on AIS ship tracking.',
      tech: ['XGBoost', 'Ray Serve', 'PostGIS', 'FastAPI', 'Python'],
      impact: [
        '28% improvement in on-time container delivery SLA',
        '$14M reduction in demurrage and port delay fines',
        'Automated 90% of routine dispatcher load assignments'
      ]
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
          Proven Commercial Results
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Portfolio & Case Studies
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Explore how NeuraFlow AI delivers quantifiable enterprise ROI across Healthcare, FinTech, Retail, AgriTech, and Global Logistics.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-glow-primary'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-cyan-300 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{project.client}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {project.solution}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-slate-900 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-widest mb-3">
              {selectedProject.category} • {selectedProject.client}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-4">
              {selectedProject.title}
            </h3>

            <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6 mb-8 text-xs sm:text-sm">
              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
                <h4 className="font-bold text-red-400 font-heading mb-1 text-sm">The Challenge</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.challenge}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
                <h4 className="font-bold text-cyan-400 font-heading mb-1 text-sm">NeuraFlow AI Solution</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.solution}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
                <h4 className="font-bold text-emerald-400 font-heading mb-2 text-sm">Verified Business Impact</h4>
                <div className="space-y-2">
                  {selectedProject.impact.map((imp, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Close Case Study
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-glow-primary hover:scale-[1.02] transition-all"
              >
                Build Similar Solution for Your Enterprise
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
