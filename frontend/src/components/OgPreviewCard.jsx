import React from 'react';
import { Share2, Image as ImageIcon, ExternalLink } from 'lucide-react';

export const OgPreviewCard = ({ openGraphTags, twitterCard, pageTitle, metaDescription, favicon, url }) => {
  const previewImage = openGraphTags?.image || twitterCard?.image || null;
  const previewTitle = openGraphTags?.title || twitterCard?.title || pageTitle || 'No Title Detected';
  const previewDescription =
    openGraphTags?.description || twitterCard?.description || metaDescription || 'No description meta tag provided.';

  let domain = 'example.com';
  try {
    domain = new URL(url).hostname;
  } catch {}

  return (
    <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-slate-200">
          <Share2 className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-base">Social Link Sharing Preview</h3>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              openGraphTags?.present
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            OG Tags: {openGraphTags?.present ? 'Present' : 'Missing'}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              twitterCard?.present
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            Twitter Card: {twitterCard?.present ? 'Present' : 'Missing'}
          </span>
        </div>
      </div>

      {/* Simulated Social Card */}
      <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl hover:border-slate-600 transition-colors">
        {/* Card Image */}
        {previewImage ? (
          <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
            <img
              src={previewImage}
              alt="Social Link Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="h-32 w-full bg-slate-950/80 flex flex-col items-center justify-center text-slate-500 border-b border-slate-800">
            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-xs">No OpenGraph / Twitter Image Detected</span>
          </div>
        )}

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono truncate">
            {favicon && (
              <img
                src={favicon}
                alt=""
                className="w-3.5 h-3.5 rounded-sm inline"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <span>{domain}</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </div>

          <h4 className="text-sm font-bold text-white line-clamp-1 hover:text-blue-400 cursor-pointer">
            {previewTitle}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {previewDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
