import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareCode, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Maximize2, 
  Minimize2, 
  RefreshCw,
  Zap,
  CheckCircle
} from 'lucide-react';

export default function ChatbotWidget({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm NeuraBot, your NeuraFlow AI assistant. How can I help transform your business today?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "What AI services do you offer?",
    "How long does custom ML development take?",
    "Can you estimate our ROI?",
    "Book an executive AI demo"
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent AI response
    setTimeout(() => {
      let botResponse = "That's a great question! NeuraFlow AI provides enterprise-grade LLM fine-tuning, computer vision systems, and automated agent workflows with guaranteed 99.9% uptime SLA.";
      const lower = text.toLowerCase();

      if (lower.includes('service') || lower.includes('offer')) {
        botResponse = "We offer 8 core AI solutions: AI Chatbots & Autonomous Agents, Custom Machine Learning Models, Computer Vision, Natural Language Processing, Predictive Analytics, Process Automation, AI Strategy Consulting, and Cloud AI Infrastructure.";
      } else if (lower.includes('time') || lower.includes('how long') || lower.includes('duration')) {
        botResponse = "Proof of Concept (PoC) deployment typically takes 2–3 weeks. Full enterprise production integration ranges from 4 to 8 weeks depending on model complexity and data pipeline architecture.";
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('roi')) {
        botResponse = "Our Starter plan begins at $2,999/mo, Professional at $7,499/mo, and Enterprise custom tiers. Our customers average a 340% ROI within the first 6 months through automated efficiency.";
      } else if (lower.includes('demo') || lower.includes('book') || lower.includes('contact')) {
        botResponse = "You can instantly book a free 30-minute strategic AI consultation with our Principal Architects using the 'Book Consultation' button on our Contact page!";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 px-4 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full shadow-glow-primary hover:shadow-glow-secondary hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full" />
          </div>
          <span className="text-sm font-semibold pr-1">Chat with NeuraBot</span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className={`glass-card rounded-3xl border border-white/15 shadow-2xl flex flex-col transition-all duration-300 overflow-hidden bg-slate-900/95 backdrop-blur-2xl ${
          isExpanded ? 'w-[90vw] md:w-[600px] h-[75vh]' : 'w-[92vw] sm:w-[380px] h-[520px]'
        }`}>
          
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5 font-heading">
                  <span>NeuraBot AI</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-[11px] text-slate-400">Online • Powered by NeuraFlow Engine</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 border border-white/10 text-cyan-400'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-glow-primary'
                    : 'bg-slate-800/90 text-slate-200 border border-white/10 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-1.5 opacity-60 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>NeuraBot is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Pills */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 overflow-x-auto flex space-x-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-blue-600/30 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 transition-all shrink-0 flex items-center space-x-1"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask NeuraBot anything..."
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-glow-primary"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
