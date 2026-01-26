import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Download, ArrowRight, Apple, Monitor, Terminal } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Platform = 'windows' | 'mac' | 'linux';

const VERSION = '1.5.1';
const GITHUB_REPO = 'xxomega2077xx/softdo';

// Typewriter component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 60); // 60ms per character
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const [platform, setPlatform] = useState<Platform>('windows');
  const { t, i18n } = useTranslation();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const getDownloadLink = () => {
    const baseUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}`;
    switch (platform) {
      case 'mac': return `${baseUrl}/SoftDo-${VERSION}-macOS.dmg`;
      case 'linux': return `${baseUrl}/SoftDo-${VERSION}-Linux.AppImage`;
      default: return `${baseUrl}/SoftDo-${VERSION}-Windows.exe`;
    }
  };



  return (
    <motion.section 
      ref={ref} 
      style={{ opacity, scale, y }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Premium Badge */}
        <div className="flex justify-center mb-10 animate-reveal-sm delay-100">
          <span className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">v{VERSION} Available</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />
            
            {/* Bottom Glow */}
            <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]" />
          </span>
        </div>

        {/* Typewriter Heading */}
        <h1 key={i18n.language} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 leading-[0.9] text-[var(--text-primary)]">
          <div>
            <TypewriterText text={t('hero.title1')} delay={300} />
          </div>
          <div className="text-[var(--text-secondary)]">
            <TypewriterText text={t('hero.title2')} delay={1200} />
          </div>
        </h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Platform Switcher & Download */}
        <div className="animate-reveal delay-700 flex flex-col items-center gap-8">
          
          {/* Switcher */}
          <div className="p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md flex items-center gap-1">
            <PlatformTab 
              isActive={platform === 'windows'} 
              onClick={() => setPlatform('windows')}
              icon={<Monitor size={16} />}
              label="Windows"
            />
             <PlatformTab 
              isActive={platform === 'mac'} 
              onClick={() => setPlatform('mac')}
              icon={<Apple size={16} />}
              label="macOS"
            />
             <PlatformTab 
              isActive={platform === 'linux'} 
              onClick={() => setPlatform('linux')}
              icon={<Terminal size={16} />}
              label="Linux"
            />
          </div>

          <BorderBeamButton href={getDownloadLink()}>
             <Download size={18} />
             <span>Download for {platform === 'mac' ? 'macOS' : yearCapitalize(platform)}</span>
          </BorderBeamButton>
        </div>

      </div>
    </motion.section>
  );
};

const PlatformTab = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
      ${isActive ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const yearCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const BorderBeamButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      className="group relative flex items-center gap-3 px-10 py-5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full overflow-hidden transition-all duration-300 active:scale-95 hover:shadow-[0_0_40px_rgba(124,92,255,0.1)]"
    >
      {/* Border Beam */}
      <div className="absolute inset-[0px] rounded-full pointer-events-none">
         <div className="absolute inset-0 rounded-full border border-[var(--border)]" />
         <div className="absolute inset-0 rounded-full animate-border-beam border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-full after:animate-border-beam after:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] after:content-[''] after:[offset-anchor:center_center] after:[offset-path:rect(0_auto_auto_0_round_calc(100cqh/2)_calc(100cqh/2))]" />
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(124, 92, 255, 0.15),
              transparent 80%
            )
          `
        }}
      />
      
      <span className="relative z-10 font-semibold text-lg tracking-wide flex items-center gap-2">
        {children}
      </span>
      <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};
