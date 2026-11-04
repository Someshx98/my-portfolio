import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

export const PythonRuntime: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Progressive reveal steps
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 250);
    const timer2 = setTimeout(() => setStep(2), 650);
    const timer3 = setTimeout(() => setStep(3), 1050);
    const timer4 = setTimeout(() => setStep(4), 1450);
    const timer5 = setTimeout(() => setStep(5), 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isInteracting]);

  const handleRestart = () => {
    setStep(0);
    setIsInteracting((prev) => !prev);
  };

  const fullCode = `from somesh import Developer

developer = Developer(
    name="Somesh Chandra Behera",
    role="AI/ML Engineer",
    education="B.Tech CSE @ VSSUT",
    cgpa=7.71
)

developer.focus = [
    "Machine Learning",
    "Data Science",
    "Deep Learning",
    "Algorithms"
]

developer.build()

>>> developer.status()
"Learning. Building. Improving."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-xl border border-[#1F2937] bg-[#0B0F14]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#080C10] px-4 py-2.5 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#EF4444]/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#EAB308]/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#22C55E]/80 inline-block" />
          <span className="ml-2 font-mono text-xs text-[#94A3B8] hidden sm:inline-block">
            bash ~ (venv: ml-env)
          </span>
        </div>

        {/* Center File Tag */}
        <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-[#E5E7EB]">
          <TerminalIcon className="w-3.5 h-3.5 text-[#3776AB]" />
          <span>python3</span>
          <span className="text-[#FFD43B]">somesh.py</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRestart}
            title="Restart Python runtime simulation"
            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-[#94A3B8] hover:bg-[#1F2937] hover:text-[#FFD43B] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Rerun</span>
          </button>
          <button
            onClick={handleCopy}
            title="Copy Python code"
            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-[#94A3B8] hover:bg-[#1F2937] hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#22C55E]" />
                <span className="text-[#22C55E] hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Editor Body */}
      <div className="p-4 sm:p-6 font-mono text-[13px] sm:text-[14px] leading-relaxed overflow-x-auto text-[#E5E7EB]">
        {/* Interactive line numbers & code */}
        <div className="grid grid-cols-[28px_1fr] gap-3">
          {/* Line 1: import */}
          <div className="text-right text-[#4B5563] select-none text-xs">1</div>
          <div>
            <span className="text-[#A78BFA] font-medium">from</span>{' '}
            <span className="text-[#E5E7EB]">somesh</span>{' '}
            <span className="text-[#A78BFA] font-medium">import</span>{' '}
            <span className="text-[#FFD43B] font-semibold">Developer</span>
          </div>

          {/* Line 2: blank */}
          <div className="text-right text-[#4B5563] select-none text-xs">2</div>
          <div>&nbsp;</div>

          {/* Line 3: instantiation */}
          <div className="text-right text-[#4B5563] select-none text-xs">3</div>
          <div>
            <span className="text-[#93C5FD]">developer</span> ={' '}
            <span className="text-[#FFD43B] font-semibold">Developer</span>(
          </div>

          {/* Line 4-7: Developer args (animated) */}
          <div className="text-right text-[#4B5563] select-none text-xs">4</div>
          <div className="pl-4">
            <span className="text-[#E5E7EB]">name</span>=
            <span className="text-[#34D399]">"Somesh Chandra Behera"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">5</div>
          <div className="pl-4">
            <span className="text-[#E5E7EB]">role</span>=
            <span className="text-[#34D399]">"AI/ML Engineer"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">6</div>
          <div className="pl-4">
            <span className="text-[#E5E7EB]">education</span>=
            <span className="text-[#34D399]">"B.Tech CSE @ VSSUT"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">7</div>
          <div className="pl-4">
            <span className="text-[#E5E7EB]">cgpa</span>=
            <span className="text-[#38BDF8] font-semibold">7.71</span>
          </div>

          {/* Line 8: close paren */}
          <div className="text-right text-[#4B5563] select-none text-xs">8</div>
          <div>)</div>

          {/* Line 9: blank */}
          <div className="text-right text-[#4B5563] select-none text-xs">9</div>
          <div>&nbsp;</div>

          {/* Line 10: focus assignment */}
          <div className="text-right text-[#4B5563] select-none text-xs">10</div>
          <div>
            <span className="text-[#93C5FD]">developer</span>.
            <span className="text-[#E5E7EB]">focus</span> = [
          </div>

          {/* Line 11-14: focus list */}
          <div className="text-right text-[#4B5563] select-none text-xs">11</div>
          <div className="pl-4">
            <span className="text-[#34D399]">"Machine Learning"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">12</div>
          <div className="pl-4">
            <span className="text-[#34D399]">"Data Science"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">13</div>
          <div className="pl-4">
            <span className="text-[#34D399]">"Deep Learning"</span>,
          </div>

          <div className="text-right text-[#4B5563] select-none text-xs">14</div>
          <div className="pl-4">
            <span className="text-[#34D399]">"Algorithms"</span>
          </div>

          {/* Line 15: close bracket */}
          <div className="text-right text-[#4B5563] select-none text-xs">15</div>
          <div>]</div>

          {/* Line 16: blank */}
          <div className="text-right text-[#4B5563] select-none text-xs">16</div>
          <div>&nbsp;</div>

          {/* Line 17: build execution */}
          <div className="text-right text-[#4B5563] select-none text-xs">17</div>
          <div>
            <span className="text-[#93C5FD]">developer</span>.
            <span className="text-[#FFD43B] font-semibold">build</span>()
          </div>
        </div>

        {/* Runtime Execution Divider & Output */}
        <div className="mt-5 pt-4 border-t border-[#1F2937]/80">
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-[#3776AB]"
              >
                <span className="font-bold text-[#FFD43B]">&gt;&gt;&gt;</span>
                <span className="text-[#E5E7EB]">developer.</span>
                <span className="text-[#FFD43B]">status</span>()
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-1 pl-6 text-[#22C55E] font-medium flex items-center gap-2"
              >
                <span>"Learning. Building. Improving."</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blinking prompt line */}
          <div className="mt-2 flex items-center gap-2 text-[#94A3B8]">
            <span className="font-bold text-[#3776AB]">&gt;&gt;&gt;</span>
            <span className="inline-block w-2.5 h-4.5 bg-[#FFD43B] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Terminal Footer Info Bar */}
      <div className="flex items-center justify-between border-t border-[#1F2937] bg-[#070A0E] px-4 py-1.5 text-[11px] font-mono text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#22C55E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span>Python 3.12.2</span>
          </span>
          <span className="text-[#4B5563]">|</span>
          <span className="text-[#94A3B8]">UTF-8</span>
          <span className="text-[#4B5563]">|</span>
          <span className="text-[#3776AB]">VSSUT Burla</span>
        </div>
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="text-[#FFD43B]">&bull;</span>
          <span>interactive session</span>
        </div>
      </div>
    </div>
  );
};
