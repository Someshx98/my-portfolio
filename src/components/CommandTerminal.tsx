import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

interface CommandTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const CommandTerminal: React.FC<CommandTerminalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'system --status',
      output: (
        <div className="text-[#94A3B8]">
          <span className="text-[#22C55E]">Runtime:</span> Python 3.12 (ml-env) active. Type{' '}
          <span className="text-[#FFD43B] font-semibold">'help'</span> for available commands.
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, cmdText]);
    setHistoryPointer(-1);

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-[#FFD43B] font-semibold">Available commands:</div>
            <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 text-[#E5E7EB]">
              <span><span className="text-[#3776AB]">about</span> - View bio & profile</span>
              <span><span className="text-[#3776AB]">education</span> - Academic timeline</span>
              <span><span className="text-[#3776AB]">skills</span> - Python & AI packages</span>
              <span><span className="text-[#3776AB]">projects</span> - Explore repositories</span>
              <span><span className="text-[#3776AB]">achievements</span> - SIH 2025 & milestones</span>
              <span><span className="text-[#3776AB]">leetcode</span> - Problems & stats</span>
              <span><span className="text-[#3776AB]">github</span> - Live GitHub repo telemetry</span>
              <span><span className="text-[#3776AB]">contact</span> - Message form & email</span>
              <span><span className="text-[#3776AB]">whoami</span> - Identity info</span>
              <span><span className="text-[#3776AB]">clear</span> - Wipe terminal output</span>
              <span><span className="text-[#3776AB]">exit</span> - Close terminal overlay</span>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-[#E5E7EB] text-xs">
            <div><span className="text-[#94A3B8]">Name:</span> Somesh Chandra Behera</div>
            <div><span className="text-[#94A3B8]">Role:</span> AI/ML Engineer</div>
            <div><span className="text-[#94A3B8]">Institution:</span> VSSUT Burla (3rd Year B.Tech CSE)</div>
            <div><span className="text-[#94A3B8]">CGPA:</span> 7.71 / 10.00</div>
          </div>
        );
        break;

      case 'about':
        outputNode = <span className="text-[#22C55E]">Navigating to about.py ...</span>;
        onNavigate('about');
        break;

      case 'education':
        outputNode = <span className="text-[#22C55E]">Navigating to education.py ...</span>;
        onNavigate('education');
        break;

      case 'skills':
        outputNode = <span className="text-[#22C55E]">Navigating to skills.py (python_environment) ...</span>;
        onNavigate('skills');
        break;

      case 'projects':
        outputNode = <span className="text-[#22C55E]">Navigating to projects/ directory ...</span>;
        onNavigate('projects');
        break;

      case 'achievements':
        outputNode = <span className="text-[#22C55E]">Navigating to achievements.py ...</span>;
        onNavigate('achievements');
        break;

      case 'leetcode':
        outputNode = <span className="text-[#22C55E]">Navigating to leetcode.py ...</span>;
        onNavigate('leetcode');
        break;

      case 'github':
        outputNode = <span className="text-[#22C55E]">Navigating to github/ section ...</span>;
        onNavigate('github');
        break;

      case 'contact':
        outputNode = <span className="text-[#22C55E]">Navigating to contact.py ...</span>;
        onNavigate('contact');
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputNode = (
          <span className="text-[#EF4444]">
            command not found: {trimmed}. Type <span className="text-[#FFD43B]">'help'</span> for recognized commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdText,
        output: outputNode,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextPointer = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(cmdHistory[nextPointer] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer] || '');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`w-full ${
          isExpanded ? 'max-w-5xl h-[90vh]' : 'max-w-2xl h-[480px] max-h-[85vh]'
        } flex flex-col rounded-xl border border-[#1F2937] bg-[#0B0F14] shadow-2xl transition-all duration-200 overflow-hidden`}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 py-3 select-none">
          <div className="flex items-center gap-2 font-mono text-xs text-[#E5E7EB]">
            <TerminalIcon className="w-4 h-4 text-[#3776AB]" />
            <span className="font-semibold text-white">somesh@terminal</span>
            <span className="text-[#94A3B8]">~ (interactive cli)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-[#94A3B8] hover:text-white rounded hover:bg-[#1F2937] transition-colors"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#94A3B8] hover:text-[#EF4444] rounded hover:bg-[#1F2937] transition-colors"
              title="Close (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable history log */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 leading-relaxed">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#3776AB]">
                <span className="text-[#8B5CF6] font-semibold">&gt;</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4 text-[#CBD5E1]">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Interactive input row */}
        <div className="border-t border-[#1F2937] bg-[#080C10] px-4 py-2.5 flex items-center gap-2 font-mono text-xs">
          <span className="text-[#8B5CF6] font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'skills', 'about'..."
            className="flex-1 bg-transparent text-[#E5E7EB] placeholder-[#64748B] focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="text-[#94A3B8] hover:text-[#FFD43B] p-1 transition-colors"
            title="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
