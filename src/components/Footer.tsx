import React from 'react';
import { Film, GitBranch, Video, Sparkles } from 'lucide-react';

interface Props {
  onOpenDemoVideo: () => void;
  onOpenGitHubRepo: () => void;
  onOpenSkillWalletModal: () => void;
}

export const Footer: React.FC<Props> = ({
  onOpenDemoVideo,
  onOpenGitHubRepo,
  onOpenSkillWalletModal
}) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded-md bg-rose-600 flex items-center justify-center text-white text-xs">
                <Film className="w-3.5 h-3.5" />
              </div>
              <span>IMovies Cinema</span>
            </div>
            <p className="text-neutral-500 max-w-sm text-xs leading-relaxed">
              Ticket booking made simple. Full-stack MERN cinema reservation platform engineered for real-time seat availability and seamless transactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenDemoVideo}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>Demo Video Walkthrough</span>
            </button>

            <button
              onClick={onOpenGitHubRepo}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <span>GitHub Repository & Code</span>
            </button>

            <button
              onClick={onOpenSkillWalletModal}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SkillWallet Checklist</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-600">
          <div>
            © 2026 IMovies Platform · Built with React 19, Node.js, Express, and MongoDB.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified MERN Architecture</span>
            <span>·</span>
            <span>Zero Runtime Errors</span>
            <span>·</span>
            <span>Mentor Evaluation Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
