import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Eye, 
  MessageSquareCode, 
  TrendingUp, 
  Workflow, 
  Compass, 
  Cloud, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Activity 
} from 'lucide-react';

export default function ServicesPage({ setActivePage }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'chatbots',
      icon: Bot,
      title: 'AI Chatbots & Autonomous Agents',
      description: 'Next-generation conversational agents powered by Retrieval-Augmented Generation (RAG) and fine-tuned LLMs.',
      benefits: [
        'Multi-turn contextual understanding',
        'Direct CRM & SQL database integrations',
        'Automated multi-agent ticket resolution',
        'Omnichannel deployment (Web, Mobile, Slack, WhatsApp)'
      ],
      specs: {
        latency: '< 40ms stream first token',
        accuracy: '99.4% intent precision',
        deployTime: '2 - 3 Weeks',
        tech: 'LangChain, LLaMA-3, GPT-4o, Pinecone, vLLM'
      },
      deepDive: 'Our autonomous agents don’t just answer FAQs—they execute complex transactional workflows such as booking appointments, querying backend ERPs, validating identity, and escalating high-priority cases with full audit trails.'
    },
    {
      id: 'ml',
      icon: Cpu,
      title: 'Machine Learning & Deep Learning',
      description: 'Custom neural networks tailored for tabular, sequential, and unstructured enterprise datasets.',
      benefits: [
        'Supervised, unsupervised, & RLHF models',
        'Custom hyperparameter tuning & optimization',
        'Model compression (Quantization & Pruning)',
        'Zero data leakage training pipelines'
      ],
      specs: {
        latency: 'Sub-15ms batch inference',
        accuracy: '99.8% ROC-AUC score',
        deployTime: '4 - 6 Weeks',
        tech: 'PyTorch, TensorFlow, XGBoost, ONNX Runtime, CUDA'
      },
      deepDive: 'We build proprietary deep learning models tailored specifically to your domain data, delivering superior precision over generic off-the-shelf APIs while maintaining full ownership of your model weights.'
    },
    {
      id: 'vision',
      icon: Eye,
      title: 'Computer Vision & Visual Analytics',
      description: 'Real-time video stream analysis, visual quality inspection, object detection, and spatial intelligence.',
      benefits: [
        'Sub-millisecond defect detection in manufacturing',
        'Automated thermal & RGB camera streaming analytics',
        'Medical imaging diagnostic assistance',
        'Edge AI deployment (NVIDIA Jetson, Coral TPU)'
      ],
      specs: {
        latency: '60 FPS real-time processing',
        accuracy: '99.9% visual precision',
        deployTime: '3 - 5 Weeks',
        tech: 'YOLOv9, OpenCV, TensorRT, TorchVision'
      },
      deepDive: 'Transform visual camera streams into actionable digital intelligence. Designed for manufacturing assembly lines, security perimeter scanning, medical diagnostics, and smart retail stores.'
    },
    {
      id: 'nlp',
      icon: MessageSquareCode,
      title: 'Natural Language Processing (NLP)',
      description: 'Enterprise text analytics, document parsing, sentiment extraction, and automatic translation.',
      benefits: [
        'High-speed PDF contract & invoice parsing',
        'Multi-lingual entity extraction (100+ languages)',
        'Automated legal compliance auditing',
        'Real-time customer feedback sentiment scoring'
      ],
      specs: {
        latency: '10,000 pages / minute',
        accuracy: '99.1% F1 Score',
        deployTime: '2 - 4 Weeks',
        tech: 'spaCy, HuggingFace, BERT, T5, LayoutLM'
      },
      deepDive: 'Convert unstructured PDFs, scanned documents, emails, and call transcripts into structured JSON database entries effortlessly using state-of-the-art vision-language models.'
    },
    {
      id: 'predictive',
      icon: TrendingUp,
      title: 'Predictive Analytics & Forecasting',
      description: 'Time-series forecasting, customer churn prevention, supply chain optimization, and financial risk models.',
      benefits: [
        'Dynamic inventory demand forecasting',
        'Real-time fraud & anomaly detection',
        'Predictive equipment maintenance alerting',
        'Customer lifetime value (LTV) modeling'
      ],
      specs: {
        latency: 'Real-time event streaming',
        accuracy: '98.7% forecast reliability',
        deployTime: '3 - 5 Weeks',
        tech: 'Prophet, DeepAR, CatBoost, Apache Spark'
      },
      deepDive: 'Anticipate market fluctuations before they occur. Our predictive analytics engines continuously ingest streaming IoT and financial data to signal anomalies and prevent costly downtime.'
    },
    {
      id: 'automation',
      icon: Workflow,
      title: 'Intelligent Business Automation',
      description: 'End-to-end cognitive robotic process automation replacing manual administrative overhead.',
      benefits: [
        '80%+ reduction in manual processing hours',
        'Seamless API bridge between legacy ERPs',
        'Automated human-in-the-loop exception handling',
        'Audit-ready execution logging'
      ],
      specs: {
        latency: 'Instant background execution',
        accuracy: '99.99% execution SLA',
        deployTime: '2 - 4 Weeks',
        tech: 'Temporal.io, Apache Airflow, Python, Celery'
      },
      deepDive: 'Connect disparate software systems into autonomous, self-healing execution workflows that process invoices, route tickets, and update accounting ledgers without manual intervention.'
    },
    {
      id: 'consulting',
      icon: Compass,
      title: 'Strategic AI Consulting & Advisory',
      description: 'Executive roadmap planning, vendor evaluation, compliance auditing, and custom AI architecture design.',
      benefits: [
        'Comprehensive 30-day AI opportunity audit',
        'Vendor-agnostic tech stack selection',
        'EU AI Act & FTC governance compliance roadmaps',
        'Executive & team AI capability workshops'
      ],
      specs: {
        latency: 'Dedicated Principal Architect',
        accuracy: 'Guaranteed ROI roadmap',
        deployTime: '1 - 2 Weeks Audit',
        tech: 'Enterprise Governance Frameworks'
      },
      deepDive: 'Avoid multi-million dollar implementation pitfalls. Our seasoned architects work directly with your C-suite to identify high-ROI AI use cases and establish strict data governance policies.'
    },
    {
      id: 'cloud',
      icon: Cloud,
      title: 'Cloud AI Infrastructure & MLOps',
      description: 'Scalable GPU cluster provisioning, automated model monitoring, CI/CD for AI, and cost optimization.',
      benefits: [
        'Automated GPU spot instance cost optimization (save up to 65%)',
        'Continuous model drift monitoring & auto-retraining',
        'Kubernetes-based model serving (KServe / Ray Serve)',
        'Multi-region failover & load balancing'
      ],
      specs: {
        latency: '99.99% Uptime SLA',
        accuracy: 'Sub-second auto-scaling',
        deployTime: '2 - 3 Weeks',
        tech: 'Kubernetes, Ray, Terraform, AWS SageMaker, GCP Vertex'
      },
      deepDive: 'Stop wasting budget on idle GPUs. We architect resilient MLOps pipelines that auto-scale dynamically from zero to thousands of concurrent inferences per second seamlessly.'
    }
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Page Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          Enterprise AI Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Services & AI Solutions
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          From custom deep learning models to autonomous multi-agent pipelines, explore our comprehensive suite of industrial AI solutions.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] mb-6 shadow-glow-primary group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 font-heading">{srv.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{srv.description}</p>

                  <div className="space-y-2 mb-8">
                    {srv.benefits.map((b, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(srv)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Learn Technical Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-slate-900 overflow-hidden">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <selectedService.icon className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Architectural Blueprint</span>
                <h3 className="text-2xl font-extrabold text-white font-heading">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.deepDive}
            </p>

            {/* Tech Specs Table */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-950 rounded-xl border border-white/10">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Latency SLA</span>
                <span className="text-xs font-bold text-cyan-300 font-heading">{selectedService.specs.latency}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-white/10">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Accuracy Benchmark</span>
                <span className="text-xs font-bold text-emerald-400 font-heading">{selectedService.specs.accuracy}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-white/10">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Deploy Timeframe</span>
                <span className="text-xs font-bold text-purple-300 font-heading">{selectedService.specs.deployTime}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-white/10">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Core Frameworks</span>
                <span className="text-xs font-bold text-slate-300 font-heading">{selectedService.specs.tech}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-glow-primary hover:scale-[1.02] transition-all"
              >
                Schedule Solution Architecture Call
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
