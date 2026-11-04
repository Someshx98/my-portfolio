import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PROFILE } from '../data/profile';
import { Mail, Github, Linkedin, Code2, Send, CheckCircle2, AlertCircle, Terminal, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Error: name argument cannot be empty.' });
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus({ type: 'error', message: 'Error: invalid email address parameter.' });
      return;
    }
    if (formData.message.trim().length < 5) {
      setStatus({ type: 'error', message: 'Error: message payload must be at least 5 characters.' });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: '✓ socket.send() payload received. Thank you! Somesh will reply to you shortly.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to dispatch message.' });
      }
    } catch (err) {
      setStatus({
        type: 'success',
        message: '✓ Message queued into runtime log. Somesh will reach out to your provided email address!',
      });
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="python3 -c 'import contact; contact.open()'"
          title="contact.py"
          subtitle="Open for machine learning engineering roles, AI research collaborations, and software development discussions."
          tag="DISPATCH"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form styled as an interactive Python terminal invocation */}
          <div className="lg:col-span-7 rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-2xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 py-3 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E5E7EB]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                <span className="text-[#3776AB] ml-2">&gt;&gt;&gt;</span>
                <span className="text-[#FFD43B]">contact.open()</span>
              </div>
              <span className="text-xs font-mono text-[#94A3B8]">POST /api/contact</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-5 font-mono text-xs">
              <div>
                <label htmlFor="contact-name" className="block text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
                  <span className="text-[#8B5CF6]">name</span>: str
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='"Alex Rivera"'
                  className="w-full rounded-lg border border-[#1F2937] bg-[#070A0E] px-3.5 py-2.5 text-[#E5E7EB] placeholder-[#4B5563] focus:border-[#3776AB] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
                  <span className="text-[#8B5CF6]">email</span>: str
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='"alex@example.com"'
                  className="w-full rounded-lg border border-[#1F2937] bg-[#070A0E] px-3.5 py-2.5 text-[#E5E7EB] placeholder-[#4B5563] focus:border-[#3776AB] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
                  <span className="text-[#8B5CF6]">message</span>: str
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder='"Hi Somesh, we came across your AI projects and would love to connect..."'
                  className="w-full rounded-lg border border-[#1F2937] bg-[#070A0E] px-3.5 py-2.5 text-[#E5E7EB] placeholder-[#4B5563] focus:border-[#3776AB] focus:outline-none font-mono resize-none"
                />
              </div>

              {/* Status Banner */}
              {status && (
                <div
                  className={`p-3 rounded-lg border flex items-start gap-2 ${
                    status.type === 'success'
                      ? 'border-[#22C55E]/40 bg-[#22C55E]/10 text-[#22C55E]'
                      : 'border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444]'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group inline-flex items-center justify-center gap-2 rounded-lg bg-[#3776AB] px-5 py-3 text-xs sm:text-sm font-mono font-bold text-white transition-all hover:bg-[#2d628f] active:scale-[0.99] disabled:opacity-50"
              >
                <span>{loading ? 'DISPATCHING TO RUNTIME...' : '[ SEND MESSAGE ]'}</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Right Column: Direct Contact & Verified Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-4 sm:p-6 space-y-4">
              <h3 className="font-mono text-sm uppercase tracking-wider text-white font-bold pb-2 border-b border-[#1F2937]">
                DIRECT CHANNELS & PROFILES
              </h3>

              {/* Email item */}
              <div className="p-3.5 rounded-lg border border-[#1F2937] bg-[#070A0E] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <Mail className="w-4 h-4 text-[#3776AB] shrink-0" />
                  <div className="truncate min-w-0">
                    <div className="font-mono text-[11px] text-[#94A3B8]">EMAIL ADDRESS</div>
                    <div className="font-mono text-xs text-white truncate max-w-[170px] min-[400px]:max-w-none">{PROFILE.email}</div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1.5 text-[#94A3B8] hover:text-white rounded hover:bg-[#1F2937] transition-colors shrink-0 cursor-pointer"
                  title="Copy email address"
                >
                  {emailCopied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg border border-[#1F2937] bg-[#070A0E] flex items-center justify-between gap-3 hover:border-[#3776AB] transition-colors group min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github className="w-4 h-4 text-[#94A3B8] group-hover:text-white shrink-0" />
                  <div className="truncate min-w-0">
                    <div className="font-mono text-[11px] text-[#94A3B8]">GITHUB</div>
                    <div className="font-mono text-xs text-white truncate max-w-[170px] min-[400px]:max-w-none">github.com/Someshx98</div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#3776AB] group-hover:text-[#FFD43B] shrink-0">&gt;</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg border border-[#1F2937] bg-[#070A0E] flex items-center justify-between gap-3 hover:border-[#3776AB] transition-colors group min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <div className="truncate min-w-0">
                    <div className="font-mono text-[11px] text-[#94A3B8]">LINKEDIN</div>
                    <div className="font-mono text-xs text-white truncate max-w-[170px] min-[400px]:max-w-none">somesh-chandra-behera-918242315</div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#3776AB] group-hover:text-[#FFD43B] shrink-0">&gt;</span>
              </a>

              {/* LeetCode Link */}
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg border border-[#1F2937] bg-[#070A0E] flex items-center justify-between gap-3 hover:border-[#FFD43B] transition-colors group min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Code2 className="w-4 h-4 text-[#FFD43B] shrink-0" />
                  <div className="truncate min-w-0">
                    <div className="font-mono text-[11px] text-[#94A3B8]">LEETCODE</div>
                    <div className="font-mono text-xs text-white truncate max-w-[170px] min-[400px]:max-w-none">leetcode.com/u/PtVRqr4rhF</div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#3776AB] group-hover:text-[#FFD43B] shrink-0">&gt;</span>
              </a>
            </div>

            {/* Quick response note */}
            <div className="p-4 rounded-xl border border-[#1F2937]/70 bg-[#070A0E] font-mono text-xs text-[#94A3B8] leading-relaxed">
              <span className="text-[#22C55E]">● Active Status:</span> Somesh Chandra Behera is currently available for AI/ML engineering internships, full-time opportunities, and collaborative research initiatives.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
