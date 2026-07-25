import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Unlock,
  CheckCircle,
  Globe,
  Clock,
  FileText,
  FileCode,
  Image as ImageIcon,
  Link as LinkIcon,
  Smartphone,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

import { SeoScoreCircle } from './SeoScoreCircle';
import { Speedometer } from './Speedometer';
import { StatCard } from './StatCard';
import { HeadingHierarchy } from './HeadingHierarchy';
import { OgPreviewCard } from './OgPreviewCard';
import { ChecklistCard } from './ChecklistCard';

export const Dashboard = ({ data }) => {
  if (!data) return null;

  const {
    url,
    statusCode,
    statusText,
    responseTime,
    contentType,
    pageTitle,
    metaDescription,
    metaKeywords,
    canonicalURL,
    favicon,
    language,
    charset,
    httpsEnabled,
    h1Count,
    h2Count,
    h3Count,
    paragraphCount,
    wordCount,
    estimatedReadingTime,
    imageCount,
    imagesMissingAlt,
    internalLinks,
    externalLinks,
    viewportPresent,
    robotsMeta,
    robotsTxtExists,
    sitemapExists,
    openGraphTags,
    twitterCard,
    performanceRating,
    seoScore,
    warnings,
    recommendations,
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12"
    >
      {/* Target Site Header Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-inner">
            {favicon ? (
              <img
                src={favicon}
                alt=""
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <Globe className="w-6 h-6 text-blue-400" />
            )}
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate">{url}</h2>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Open site in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              Content-Type: <span className="font-mono text-slate-300">{contentType}</span>
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* HTTP Status */}
          <span
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border ${
              statusCode >= 200 && statusCode < 300
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>
              HTTP {statusCode} {statusText}
            </span>
          </span>

          {/* SSL Lock */}
          <span
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border ${
              httpsEnabled
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {httpsEnabled ? <Lock className="w-3.5 h-3.5 text-blue-400" /> : <Unlock className="w-3.5 h-3.5 text-rose-400" />}
            <span>{httpsEnabled ? 'HTTPS Secured' : 'HTTP Unencrypted'}</span>
          </span>
        </div>
      </div>

      {/* Top Gauges: SEO Score & Performance Speedometer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeoScoreCircle score={seoScore} />
        <Speedometer responseTime={responseTime} rating={performanceRating} />
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={FileText}
          title="Word Count"
          value={wordCount.toLocaleString()}
          subtitle={wordCount > 300 ? 'Substantive' : 'Thin Content'}
          status={wordCount > 300 ? 'success' : 'warning'}
        />

        <StatCard
          icon={Clock}
          title="Reading Time"
          value={estimatedReadingTime}
          subtitle={`${paragraphCount} paragraphs`}
          status="info"
        />

        <StatCard
          icon={Globe}
          title="Page Language"
          value={language}
          subtitle={`Charset: ${charset}`}
          status="info"
        />

        <StatCard
          icon={ImageIcon}
          title="Images & Alt"
          value={`${imageCount} images`}
          subtitle={`${imagesMissingAlt} missing alt`}
          status={imagesMissingAlt === 0 ? 'success' : 'warning'}
        />

        <StatCard
          icon={LinkIcon}
          title="Hyperlinks"
          value={`${internalLinks + externalLinks}`}
          subtitle={`${internalLinks} int / ${externalLinks} ext`}
          status="info"
        />

        <StatCard
          icon={Smartphone}
          title="Mobile Viewport"
          value={viewportPresent ? 'Configured' : 'Missing'}
          subtitle={viewportPresent ? 'Mobile Ready' : 'Not Responsive'}
          status={viewportPresent ? 'success' : 'danger'}
        />
      </div>

      {/* Detailed Meta Tags Summary Box */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-blue-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Metadata & Header Inspection</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Page Title */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Page Title</span>
            <p className="font-medium text-white break-words">{pageTitle || <span className="text-rose-400 font-normal">Missing &lt;title&gt; tag</span>}</p>
            {pageTitle && <span className="text-[11px] text-slate-500 font-mono">{pageTitle.length} characters</span>}
          </div>

          {/* Meta Description */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Meta Description</span>
            <p className="font-medium text-slate-200 leading-relaxed break-words">
              {metaDescription || <span className="text-rose-400 font-normal">Missing meta description tag</span>}
            </p>
            {metaDescription && <span className="text-[11px] text-slate-500 font-mono">{metaDescription.length} characters</span>}
          </div>

          {/* Canonical Tag */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Canonical Link</span>
            <p className="font-mono text-xs text-blue-400 truncate">
              {canonicalURL || <span className="text-amber-400 font-sans">No canonical URL specified</span>}
            </p>
          </div>

          {/* Indexing Files: Robots.txt & Sitemap.xml */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Indexing & Crawling Files</span>
            <div className="flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-1.5">
                {robotsTxtExists ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                <span className={robotsTxtExists ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>robots.txt</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {sitemapExists ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                <span className={sitemapExists ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>sitemap.xml</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Headings Hierarchy & Social Link Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeadingHierarchy h1Count={h1Count} h2Count={h2Count} h3Count={h3Count} />
        <OgPreviewCard
          openGraphTags={openGraphTags}
          twitterCard={twitterCard}
          pageTitle={pageTitle}
          metaDescription={metaDescription}
          favicon={favicon}
          url={url}
        />
      </div>

      {/* Warnings & Actionable Recommendations */}
      <ChecklistCard warnings={warnings} recommendations={recommendations} />
    </motion.div>
  );
};
