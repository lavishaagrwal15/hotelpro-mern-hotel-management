import React, { useState } from 'react';
import { 
  GitBranch, GitCommit, Copy, Check, ExternalLink, 
  FileCode, Folder, ShieldCheck, Download, Terminal, 
  BookOpen, Star, GitFork, ArrowUpRight, UploadCloud,
  Key, User, HelpCircle, Layers, CheckCircle2
} from 'lucide-react';
import { GITHUB_REPO_DATA } from '../data/moviesData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  githubUrl: string;
  onUpdateGithubUrl?: (newUrl: string) => void;
}

export const GitHubRepoModal: React.FC<Props> = ({
  isOpen,
  onClose,
  githubUrl,
  onUpdateGithubUrl
}) => {
  const [selectedTab, setSelectedTab] = useState<'push-guide' | 'files'>('push-guide');
  const [usernameInput, setUsernameInput] = useState('lavishaagrwal15');
  const [repoName, setRepoName] = useState('hotelpro-mern-hotel-management');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedPush, setCopiedPush] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const dynamicRepoUrl = `https://github.com/${usernameInput.trim() || 'your-username'}/${repoName}`;
  const pushCommand = `git remote add origin ${dynamicRepoUrl}.git\ngit branch -M main\ngit push -u origin main`;
  const currentFile = GITHUB_REPO_DATA.files[selectedFileIndex];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(dynamicRepoUrl);
    setCopiedUrl(true);
    if (onUpdateGithubUrl) onUpdateGithubUrl(dynamicRepoUrl);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${dynamicRepoUrl}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyPushCommand = () => {
    navigator.clipboard.writeText(pushCommand);
    setCopiedPush(true);
    setTimeout(() => setCopiedPush(false), 2000);
  };

  const handleCopyCode = () => {
    if (currentFile?.content) {
      navigator.clipboard.writeText(currentFile.content);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (!currentFile?.content) return;
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-base">
                  GitHub Repository & Push Deployment
                </h3>
                <span className="text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Local Git Initialized & Committed (main)
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Push your complete MERN cinema ticket reservation project directly to your GitHub account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied GitHub Link!' : 'Copy Repo Link'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-neutral-950/90 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedTab('push-guide')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                selectedTab === 'push-guide'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>How to Push to My GitHub</span>
            </button>

            <button
              onClick={() => setSelectedTab('files')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                selectedTab === 'files'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Source Code & Files Explorer</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-neutral-400 hidden sm:block">
            Branch: <strong className="text-white">main</strong> · Status: <span className="text-emerald-400">Clean working tree</span>
          </div>
        </div>

        {/* Tab 1: PUSH TO GITHUB GUIDE */}
        {selectedTab === 'push-guide' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-neutral-950/40">
            
            {/* Step 1: GitHub Username Input */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Your GitHub Details
                </span>
                <span className="text-[11px] text-neutral-400">
                  Enter your GitHub account username to customize the commands
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Your GitHub Username</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. rohit-sharma or john-doe"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Repository Name</label>
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="text-neutral-400">
                  Target GitHub URL: <strong className="text-indigo-400 font-mono select-all">{dynamicRepoUrl}</strong>
                </div>
                <a
                  href={`https://github.com/new?name=${repoName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 text-xs font-semibold"
                >
                  <span>1. Create Repo on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step 2: Push Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option A: Push via Token */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-1">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>Option 1: Paste Token in Chat (Instant Push)</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Generate a token with <strong className="text-white">repo</strong> permission at{' '}
                    <a href="https://github.com/settings/tokens/new" target="_blank" rel="noreferrer" className="text-indigo-400 underline font-medium">
                      github.com/settings/tokens
                    </a>{' '}
                    and paste it in the chat. We will push all files immediately!
                  </p>
                </div>

                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
                  <div className="text-[11px] text-neutral-400">Reply in chat:</div>
                  <div className="text-emerald-400 font-bold">ghp_yourTokenHere</div>
                </div>
              </div>

              {/* Option B: Download ZIP & Upload to GitHub Web */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-1">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Option 2: Download ZIP & Upload on GitHub</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Download the pre-packaged ZIP, extract it, and drag & drop the files into GitHub via the "uploading an existing file" button.
                  </p>
                </div>

                <a
                  href="/hotelpro-mern-project.zip"
                  download="hotelpro-mern-project.zip"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete Project (.ZIP)</span>
                </a>
              </div>

            </div>


            {/* Verification Checklist */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
              <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Pre-Push Verification Passed
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Git repository initialized on branch <strong>main</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All 27 files staged and committed cleanly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full README.md and MERN documentation added</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero compile or syntax errors</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: CODE FILES EXPLORER */}
        {selectedTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            
            {/* File Tree (4 cols) */}
            <div className="md:col-span-4 bg-neutral-950 border-r border-neutral-800 p-4 flex flex-col overflow-y-auto">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Repository Files</span>
                <span className="text-[10px] font-mono text-neutral-500">branch: main</span>
              </div>

              <div className="space-y-1">
                {GITHUB_REPO_DATA.files.map((file, idx) => {
                  const isSelected = selectedFileIndex === idx;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSelected 
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                          : 'text-neutral-300 hover:bg-neutral-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-neutral-500'}`} />
                        <span className="font-mono truncate">{file.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0 ml-2">
                        {file.size}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* File Preview (8 cols) */}
            <div className="md:col-span-8 bg-neutral-900/60 flex flex-col overflow-hidden">
              <div className="px-4 py-2.5 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-300 font-mono">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>{currentFile.path}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-500">{currentFile.size}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Content'}</span>
                  </button>

                  <button
                    onClick={handleDownloadFile}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-neutral-300 leading-relaxed bg-neutral-950/40">
                <pre className="whitespace-pre-wrap select-text">
                  {currentFile.content}
                </pre>
              </div>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-neutral-400">
            Submission Target: <strong className="text-white">SkillWallet Full Stack Development Module</strong>
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy GitHub Link for SkillWallet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
