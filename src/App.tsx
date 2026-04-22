/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Activity, 
  Presentation, 
  FileText, 
  Layers, 
  CheckCircle, 
  Users,
  ChevronRight,
  ExternalLink,
  Info,
  User
} from 'lucide-react';
import { NumericalSimulation } from './components/NumericalSimulation';
import { VisualSimulation2D } from './components/VisualSimulation2D';

const SECTIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'simulation', label: 'Simulation', icon: Activity },
  { id: 'ppt', label: 'PPT', icon: Presentation },
  { id: 'papers', label: 'Research Papers', icon: FileText },
  { id: 'applications', label: 'Applications', icon: Layers },
  { id: 'conclusion', label: 'Conclusion', icon: CheckCircle },
  { id: 'about', label: 'About Us', icon: Users },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [area, setArea] = useState(50);
  const [angle, setAngle] = useState(30);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-xl tracking-tight text-brand-secondary">GeckoGrip</span>
          </div>
          <div className="hidden md:flex gap-6">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`nav-link text-sm ${activeSection === s.id ? 'text-brand-primary font-bold' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        
        {/* Home Section */}
        <section id="home" className="section-padding min-h-[90vh] flex flex-col justify-center bg-gradient-to-br from-brand-secondary to-brand-primary text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Bio-Inspired Engineering</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Nature's Ultimate <br />
                <span className="text-brand-accent">Adhesion System</span>
              </h1>
              <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                Geckos can walk on walls and ceilings with ease. Their secret lies not in glue or suction, 
                but in millions of microscopic hairs that exploit the fundamental forces of physics.
              </p>
              <div className="flex gap-4">
                <button onClick={() => scrollTo('simulation')} className="px-8 py-4 bg-white text-brand-secondary rounded-full font-bold hover:bg-brand-accent hover:text-white transition-all shadow-lg flex items-center gap-2">
                  Explore Simulation <ChevronRight size={20} />
                </button>
                <button onClick={() => scrollTo('theory')} className="px-8 py-4 bg-brand-secondary text-white rounded-full font-bold hover:bg-brand-secondary/80 transition-all border border-white/20">
                  Learn the Theory
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Theory Section */}
        <section id="theory" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Science of Stickiness</h2>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-12 items-center">
              <div className="space-y-8 max-w-3xl mx-auto">
                <div className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-bold">Microscopic Structure</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A gecko's foot is covered in millions of microscopic hairs called <strong>setae</strong>. 
                    Each seta branches out into hundreds of even smaller tips called <strong>spatulae</strong>. 
                    This hierarchy allows the gecko to maximize its contact area with any surface, no matter how rough.
                  </p>
                </div>

                <div className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                      <Activity size={24} />
                    </div>
                    <h3 className="text-xl font-bold">Van der Waals Forces</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    When spatulae come into extremely close contact with a surface, weak intermolecular forces 
                    called <strong>van der Waals forces</strong> come into play. While weak individually, 
                    the sheer number of spatulae (billions) creates a massive cumulative adhesive force.
                  </p>
                </div>
                
                <div className="bg-brand-secondary text-white p-6 rounded-2xl shadow-xl text-center">
                  <p className="text-lg italic">"The gecko's ability to stick is purely physical, not chemical. It leaves no residue and works in a vacuum."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulation Section */}
        <section id="simulation" className="section-padding bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Interactive Simulations</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Adjust the parameters to see how surface area and contact angle affect the adhesive force in real-time.</p>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="xl:col-span-4 space-y-8">
                <div className="card">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Layers size={18} className="text-brand-primary" />
                    Simulation Controls
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Surface Area (A)</label>
                        <span className="text-sm font-bold text-brand-primary">{area} µm²</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={area} 
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Contact Angle (θ)</label>
                        <span className="text-sm font-bold text-brand-primary">{angle}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="90" 
                        value={angle} 
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-3">
                      <Info size={16} className="text-brand-primary mt-0.5" />
                      <div className="text-xs text-slate-500 leading-relaxed">
                        <strong>Physics Note:</strong> The force is calculated as 
                        <code className="block mt-1 p-1 bg-white rounded border border-slate-200 font-mono text-brand-secondary">
                          F ∝ (A / d²) × cos(θ)
                        </code>
                        where A is area and θ is the angle from the surface.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-brand-secondary text-white border-none">
                  <h3 className="text-lg font-bold mb-4">Numerical Analysis</h3>
                  <NumericalSimulation area={area} angle={angle} />
                </div>
              </div>

              {/* Visualizations */}
              <div className="xl:col-span-8 space-y-8">
                <div className="card">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Activity size={18} className="text-brand-primary" />
                    2D Microscopic Animation
                  </h3>
                  <VisualSimulation2D angle={angle} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PPT Section */}
        <section id="ppt" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Presentation</h2>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>
            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <iframe 
                src="https://www.canva.com/design/DAHEZ_ZY6FY/5Wy5esMHf2SSccA1RtFNeA/view?embed" 
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 text-center">
              <a 
                href="https://www.canva.com/design/DAHEZ_ZY6FY/5Wy5esMHf2SSccA1RtFNeA/view?utm_content=DAHEZ_ZY6FY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4bf6a7932e"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline"
              >
                Open full presentation in Canva <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Research Papers Section */}
        <section id="papers" className="section-padding bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Research Papers</h2>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-secondary flex items-center gap-2 mb-6">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">🦎</div>
                  Gecko Adhesion
                </h3>
                {[
                  { title: "Gecko-Inspired Adhesive Mechanisms", url: "https://www.sciencedirect.com/science/article/pii/S2352573821000202" },
                  { title: "Adhesives for Robots - A Review", url: "https://www.researchgate.net/publication/366015411_Gecko-Inspired_Adhesive_Mechanisms_and_Adhesives_for_Robots-A_Review" },
                  { title: "Biomimetic Adhesives MDPI", url: "https://www.mdpi.com/2313-7673/9/3/149" },
                  { title: "Science.org Research", url: "https://spj.science.org/doi/10.34133/research.0630" },
                  { title: "PMC Biomimetics Article", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10968063/#sec4-biomimetics-09-00149" }
                ].map((paper, i) => (
                  <a key={i} href={paper.url} target="_blank" rel="noopener noreferrer" className="card p-4 flex items-center justify-between hover:border-brand-primary transition-all group">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-brand-primary">{paper.title}</span>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-primary" />
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-secondary flex items-center gap-2 mb-6">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">🐚</div>
                  Mussel Adhesion
                </h3>
                {[
                  { title: "Biomedical Applications of Mussels", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3207216/" },
                  { title: "MDPI Marine Drugs", url: "https://www.mdpi.com/1660-3397/13/11/6792" },
                  { title: "IOM3 Mucus-like Adhesive", url: "https://www.iom3.org/resource/mussels-inspire-mucus-like-biomedical-adhesive.html" },
                  { title: "ScienceDirect Abs", url: "https://www.sciencedirect.com/science/article/abs/pii/S2213343723023941" },
                  { title: "Google Shared Resource", url: "https://share.google/s76s8Lm7iYFgkXz6V" }
                ].map((paper, i) => (
                  <a key={i} href={paper.url} target="_blank" rel="noopener noreferrer" className="card p-4 flex items-center justify-between hover:border-brand-primary transition-all group">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-brand-primary">{paper.title}</span>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section id="applications" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real-World Applications</h2>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Climbing Robots</h3>
                <p className="text-slate-600 text-sm">
                  Robots equipped with gecko-inspired pads can climb glass walls and inspect high-rise buildings or spacecraft without leaving residue.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Reusable Adhesives</h3>
                <p className="text-slate-600 text-sm">
                  Unlike traditional tape, bio-inspired adhesives can be attached and detached thousands of times without losing their "stickiness."
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Medical Bandages</h3>
                <p className="text-slate-600 text-sm">
                  Gentle, non-toxic adhesives for sensitive skin or internal surgical use, inspired by the dry adhesion of geckos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section id="conclusion" className="section-padding bg-brand-secondary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Conclusion</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              The gecko's adhesive system is a masterpiece of evolutionary engineering. By simply changing the 
              <strong> angle of contact</strong>, the gecko can switch between a state of strong attachment and 
              effortless detachment. This directional sensitivity is the key to rapid movement on vertical surfaces.
            </p>
            <div className="p-8 bg-white/10 rounded-3xl border border-white/20">
              <p className="text-brand-accent font-bold text-lg mb-2">Key Takeaway</p>
              <p className="italic">"Adhesion is not just about contact area, but about the geometry and physics of how that contact is made and broken."</p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Us</h2>
              <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Anshita Dhingra", id: "J016", sapid: '70092500052', image: "https://drive.google.com/thumbnail?id=1kvD_2YKcth9ou-mRy2nmUPtWnxYWcLgM&sz=w1000" },
                { name: "Akriti Mehra", id: "J035", sapid: '70092500022', image: "https://drive.google.com/thumbnail?id=1aV5SjTeNaKwdKGsXVlbEsKALDoZsxH9d&sz=w1000" },
                { name: "Jiya Chheda", id: "J013", sapid: '70092500041', image: "https://drive.google.com/thumbnail?id=1SloBRsU5lRbdWYa2d71jzEL-58Np_aCQ&sz=w1000" },
                { name: "Anindita Bhaduri", id: "J008", sapid: '70092500014', image: "https://drive.google.com/thumbnail?id=1YDaEgekE5IT3s5zQrXVl2e_RNGbTuHNc&sz=w1000" }
              ].map((member, i) => (
                <div key={i} className="card text-center hover:bg-brand-primary/5 transition-colors overflow-hidden">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-brand-primary/20">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900">{member.name}</h4>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-brand-primary font-mono text-xs font-bold leading-none">{member.id}</p>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">{member.sapid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-xl tracking-tight">GeckoGrip</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Bio-Inspired Science Project. All rights reserved.</p>
          <div className="flex gap-6">
            {SECTIONS.slice(0, 4).map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="text-slate-400 hover:text-white text-sm transition-colors">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
