import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PROFILE } from '../data/profile';
import { MapPin, Mail, Award, Cpu, BookOpen, Terminal } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="python3 -c 'import about; about.inspect()'"
          title="about.py"
          subtitle="A blend of rigorous computer science foundations and an obsession with engineering production-ready machine learning architectures."
          tag="PROFILE CLASS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Python Class Code Box */}
          <div className="lg:col-span-6 rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-xl">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 py-2.5 text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/80" />
                <span className="ml-1 text-[#E5E7EB] font-medium">somesh/about.py</span>
              </div>
              <span className="text-[#3776AB]">class definition</span>
            </div>

            {/* Python code representation */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#E5E7EB] overflow-x-auto">
              <div className="text-[#6B7280] mb-2"># Candidate definition & academic parameters</div>
              <div>
                <span className="text-[#A78BFA] font-semibold">class</span>{' '}
                <span className="text-[#FFD43B] font-bold">SomeshChandraBehera</span>:
              </div>

              <div className="pl-6 space-y-1.5 mt-2">
                <div>
                  <span className="text-[#E5E7EB]">role</span> ={' '}
                  <span className="text-[#34D399]">"{PROFILE.role}"</span>
                </div>
                <div>
                  <span className="text-[#E5E7EB]">degree</span> ={' '}
                  <span className="text-[#34D399]">"B.Tech CSE"</span>
                </div>
                <div>
                  <span className="text-[#E5E7EB]">university</span> ={' '}
                  <span className="text-[#34D399]">"VSSUT, Burla"</span>
                </div>
                <div>
                  <span className="text-[#E5E7EB]">year</span> ={' '}
                  <span className="text-[#38BDF8] font-bold">3</span>
                </div>
                <div>
                  <span className="text-[#E5E7EB]">cgpa</span> ={' '}
                  <span className="text-[#38BDF8] font-bold">7.71</span>
                </div>
                <div className="pt-2">
                  <span className="text-[#E5E7EB]">interests</span> = [
                </div>
                <div className="pl-6 space-y-1">
                  {PROFILE.interests.map((interest, idx) => (
                    <div key={idx}>
                      <span className="text-[#34D399]">"{interest}"</span>
                      {idx < PROFILE.interests.length - 1 ? ',' : ''}
                    </div>
                  ))}
                </div>
                <div>]</div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F2937]/80 text-[#94A3B8] flex items-center justify-between text-xs">
                <span className="text-[#22C55E]">✓ Syntax Verified (PEP 8)</span>
                <span className="text-[#6B7280]">UTF-8 · LF</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Professional Human-Readable Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-[#D1D5DB] leading-relaxed font-sans">
              <p>
                I am a 3rd-year Computer Science & Engineering undergraduate at{' '}
                <strong className="text-white font-semibold">
                  Veer Surendra Sai University of Technology (VSSUT), Burla
                </strong>
                . My core engineering pursuit centers on designing, evaluating, and deploying applied
                machine learning and computer vision pipelines that bridge algorithmic research with
                practical system utility.
              </p>
              <p>
                Rather than treating AI as a black box, I prioritize mathematical fundamentals—vector
                spaces, probability, loss function optimization, and computational complexity. Whether
                building automated face embeddings for real-time attendance or analyzing emotional
                semantics for recommendations, I focus on clean Python architecture, low latency, and
                system observability.
              </p>
            </div>

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg border border-[#1F2937] bg-[#0B0F14]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#3776AB] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#FFD43B]" />
                  <span>NATIONAL RECOGNITION</span>
                </div>
                <div className="text-sm font-semibold text-white">Smart India Hackathon 2025</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">National Level Finalist</div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#1F2937] bg-[#0B0F14]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#3776AB] mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>ACADEMIC PERFORMANCE</span>
                </div>
                <div className="text-sm font-semibold text-white">CGPA: 7.71 / 10.00</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">VSSUT, Burla · CSE Dept.</div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#1F2937] bg-[#0B0F14]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#3776AB] mb-1">
                  <Cpu className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>ALGORITHMIC RIGOR</span>
                </div>
                <div className="text-sm font-semibold text-white">{PROFILE.metrics.leetcodeSolved} LeetCode Solved</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">{PROFILE.metrics.leetcodeAcceptance} Acceptance Rate</div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#1F2937] bg-[#0B0F14]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#3776AB] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#3776AB]" />
                  <span>LOCATION & CONTACT</span>
                </div>
                <div className="text-sm font-semibold text-white">Burla, Odisha, India</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Open for AI/ML Internships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
