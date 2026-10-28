import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink, GitBranch, Video, CheckCircle2 } from 'lucide-react';

interface Props {
  demoUrl: string;
  githubUrl: string;
  onOpenSkillWalletModal: () => void;
  onOpenDemoVideo: () => void;
  onOpenGitHubRepo: () => void;
}

export const SkillWalletBanner: React.FC<Props> = ({
  demoUrl,
  githubUrl,
  onOpenSkillWalletModal,
  onOpenDemoVideo,
  onOpenGitHubRepo
}) => {
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(demoUrl);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2500);
  };

  const handleCopyGithub = () => {
    navigator.clipboard.writeText(githubUrl);
    setCopiedGithub(true);
    setTimeout(() => setCopiedGithub(false), 2500);
  };

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-4 py-2.5 shadow-md relative z-40 border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-2">
              <span>HotelPro - Complete Hotel Booking & Management Solution</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
                MERN Stack · 6 of 6 Epics Completed
              </span>
            </div>
            <p className="text-xs text-blue-100 hidden sm:block">
              Submit your verified Demo Link & GitHub Link to your mentor on SkillWallet without errors.
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 shrink-0">
          {/* Demo Link Copy */}
          <button
            onClick={handleCopyDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-xs font-medium text-white border border-white/20 shadow-sm"
            title="Copy Demo Link for SkillWallet"
          >
            {copiedDemo ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedDemo ? 'Demo Link Copied!' : 'Copy Demo Link'}</span>
          </button>

          {/* GitHub Link Copy */}
          <button
            onClick={handleCopyGithub}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-xs font-medium text-white border border-white/20 shadow-sm"
            title="Copy GitHub Link for SkillWallet"
          >
            {copiedGithub ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <GitBranch className="w-3.5 h-3.5" />}
            <span>{copiedGithub ? 'GitHub Copied!' : 'Copy GitHub Link'}</span>
          </button>

          {/* Watch Demo Video */}
          <button
            onClick={onOpenDemoVideo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-sm"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Watch Demo Video</span>
          </button>


          {/* Detailed SkillWallet Hub */}
          <button
            onClick={onOpenSkillWalletModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/40 hover:bg-neutral-900/60 text-xs font-medium transition-all border border-white/20"
          >
            <span>Submission Checklist</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-white/70 hover:text-white text-xs px-1.5 py-1 ml-1"
            title="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
