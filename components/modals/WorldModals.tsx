'use client';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showModal: boolean;
}

// About Modal (Space Base)
export function AboutModal({ isOpen, onClose, showModal }: ModalProps) {
  if (!isOpen || !showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: '#1B1919CC' }}
        onClick={onClose}
      />
      <div
        className="relative bg-white/2 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-md w-full transition-all duration-500 ease-out"
        style={{
          transform: showModal ? 'scale(1)' : 'scale(0.8)',
          opacity: showModal ? 1 : 0,
        }}
      >
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20">
              <img src="/images/avatar.jpeg" alt="Randy Ren" className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Randy Ren</h2>
            <p className="text-white/70"></p>
          </div>

          <div className="space-y-3">
            <a href="https://github.com/randyren278" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">GitHub</div>
                <div className="text-white/60 text-sm">@randyren278</div>
              </div>
            </a>

            <a href="mailto:me@randyren.org" className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-white/60 text-sm">me@randyren.org</div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/randyren278/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">LinkedIn</div>
                <div className="text-white/60 text-sm">@randyren278</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resume Modal (Pirate World)
export function ResumeModal({ isOpen, onClose, showModal }: ModalProps) {
  if (!isOpen || !showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: '#1B1919CC' }}
        onClick={onClose}
      />
      <div
        className="relative bg-white/2 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full transition-all duration-500 ease-out max-h-[80vh] overflow-auto"
        style={{
          transform: showModal ? 'scale(1)' : 'scale(0.8)',
          opacity: showModal ? 1 : 0,
        }}
      >
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20">
              <span className="text-2xl">🏴‍☠️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Randy's Resume</h2>
            <p className="text-white/70"></p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/2 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                🗺️ Experience
              </h3>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="font-medium text-white">Project Management</div>
                  <div className="text-white/60">Ledcor</div>
                  <div className="text-white/50 text-xs mt-1">Vancouver, British Columbia, Canada</div>
                  <div className="text-white/40 text-xs">• Quality Assurance Engineer</div>
                </div>
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="font-medium text-white">Software Team</div>
                  <div className="text-white/60">UBC Rover</div>
                  <div className="text-white/50 text-xs mt-1">Vancouver, British Columbia, Canada</div>
                  <div className="text-white/40 text-xs">• Computer Vision</div>
                </div>
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="font-medium text-white">Software Engineering Intern</div>
                  <div className="text-white/60">Visa</div>
                  <div className="text-white/50 text-xs mt-1">San Francisco Bay Area</div>
                  <div className="text-white/40 text-xs">• Financial API development</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/2 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                ⚔️ Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js', 'OpenCV', 'PyTorch', 'SQL', 'GitHub', 'Google Cloud Platform'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-white/80 text-xs border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white/2 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                🏆 Education
              </h3>
              <div className="text-white/70 text-sm space-y-2">
                <div>
                  <div className="font-medium text-white">Bachelor of Applied Science in Electrical Engineering</div>
                  <div className="text-white/60">University of British Columbia • Sep 2023 - Apr 2028</div>
                  <div className="text-white/50 text-xs">Co-op Program</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a
                href="/resume/resume.pdf"
                target="_blank"
                className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl p-3 text-center text-white font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
              >
                📜 Download Resume
              </a>
              <a
                href="https://linkedin.com/in/randyren278"
                target="_blank"
                className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl p-3 text-center text-white font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
              >
                🔗 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}