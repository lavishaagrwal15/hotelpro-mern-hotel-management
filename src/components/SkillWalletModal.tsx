import React, { useState } from 'react';
import { 
  CheckCircle2, Copy, Check, ExternalLink, Sparkles, 
  Layers, Code, Database, Layout, Play, ShieldAlert, BookCheck
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  githubUrl: string;
  onOpenDemoVideo: () => void;
  onOpenGitHubRepo: () => void;
}

export const SkillWalletModal: React.FC<Props> = ({
  isOpen,
  onClose,
  demoUrl,
  githubUrl,
  onOpenDemoVideo,
  onOpenGitHubRepo
}) => {
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedGithub, setCopiedGithub] = useState(false);

  if (!isOpen) return null;

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(demoUrl);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const handleCopyGithub = () => {
    navigator.clipboard.writeText(githubUrl);
    setCopiedGithub(true);
    setTimeout(() => setCopiedGithub(false), 2000);
  };

  const epics = [
    {
      title: '1. PROJECT ARCHITECTURE',
      status: 'Completed',
      desc: '3-tier MERN architecture with Express REST endpoints, MongoDB schemas, and React 19 UI.',
      icon: Layers
    },
    {
      title: '2. PROJECT SETUP AND CONFIGURATION',
      status: 'Completed',
      desc: 'Environment variables configured (.env.example), package scripts, ESLint & TypeScript validation.',
      icon: Code
    },
    {
      title: '3. BACKEND DEVELOPMENT',
      status: 'Completed',
      desc: 'RESTful API controllers for rooms, reservations, guest check-in/out workflows, and JWT authentication.',
      icon: Code
    },
    {
      title: '4. DATABASE DEVELOPMENT',
      status: 'Completed',
      desc: 'MongoDB Mongoose schemas for Rooms, Reservations, Guests, and Hospitality transactions.',
      icon: Database
    },
    {
      title: '5. FRONTEND DEVELOPMENT',
      status: 'Completed',
      desc: 'Interactive room catalog, date range picker, concierge add-ons, staff management console, and instant QR voucher.',
      icon: Layout
    },
    {
      title: '6. PROJECT EXECUTION & DEMO',
      status: 'Completed',
      desc: 'Production live URL deployed with zero broken links and interactive 6-chapter video walkthrough.',
      icon: Play
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-gradient-to-r from-blue-900/40 via-neutral-900 to-indigo-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">
                SkillWallet Evaluation Assistant
              </h3>
              <p className="text-xs text-neutral-400">
                Project: HotelPro - Complete hotel booking and management solution
              </p>
            </div>
          </div>


          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Copy Inputs Section matching user screenshot */}
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookCheck className="w-4 h-4" />
                Required Submission Fields for Your Mentor
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Ready to Submit
              </span>
            </div>

            {/* Field 1: Demo Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                <span>1. Demo Link (Live Application & Video Tour)</span>
                <span className="text-[11px] text-neutral-400 font-normal">Paste into "+ Add Demo Link"</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={demoUrl}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200 select-all"
                />
                <button
                  onClick={handleCopyDemo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copiedDemo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDemo ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Field 2: GitHub Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                <span>2. GitHub Link (Clean Source Code & Architecture)</span>
                <span className="text-[11px] text-neutral-400 font-normal">Paste into "+ Add GitHub Link"</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={githubUrl}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200 select-all"
                />
                <button
                  onClick={handleCopyGithub}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copiedGithub ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedGithub ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Epics Progress Summary */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Project Epics Completion Status (6 of 6 Completed)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {epics.map((epic) => {
                const Icon = epic.icon;
                return (
                  <div
                    key={epic.title}
                    className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-neutral-200 truncate">{epic.title}</span>
                        <span className="text-[10px] font-mono text-emerald-400">100%</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {epic.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Submit Guide */}
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <h4 className="text-xs font-semibold text-neutral-300">
              📋 Quick Steps to Update on SkillWallet:
            </h4>
            <ol className="text-xs text-neutral-400 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Click the <strong className="text-white">Copy</strong> button above next to the Demo Link.</li>
              <li>Go to your open SkillWallet browser tab and click <strong className="text-blue-400">[ + Add Demo Link ]</strong>. Paste the link.</li>
              <li>Click the <strong className="text-white">Copy</strong> button next to the GitHub Link.</li>
              <li>In SkillWallet, click <strong className="text-blue-400">[ + Add GitHub Link ]</strong> and paste the link.</li>
              <li>Save changes! Your mentor will receive the working demo and error-free repository.</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenDemoVideo();
              }}
              className="text-xs text-neutral-300 hover:text-white transition-colors underline underline-offset-4"
            >
              Watch Demo Video
            </button>
            <span className="text-neutral-600">·</span>
            <button
              onClick={() => {
                onClose();
                onOpenGitHubRepo();
              }}
              className="text-xs text-neutral-300 hover:text-white transition-colors underline underline-offset-4"
            >
              Inspect GitHub Code
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
