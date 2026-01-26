import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles } from 'lucide-react';

export const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  // Animated todo items for the floating effect
  const floatingTodos = [
    { text: "Review Q4 Report", done: true, delay: 0 },
    { text: "Team Sync at 2PM", done: false, delay: 0.2 },
    { text: "Design System Update", done: false, delay: 0.4 },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-sm text-white/80">{t('showcase.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              {t('showcase.title')}
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {t('showcase.description')}
            </p>

            {/* Animated Todo Preview */}
            <div className="space-y-3 pt-4">
              {floatingTodos.map((todo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + todo.delay }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    todo.done 
                      ? 'bg-white border-white' 
                      : 'border-white/30 group-hover:border-white/50'
                  }`}>
                    {todo.done && <Check size={12} className="text-violet-500" />}
                  </div>
                  <span className={`text-lg ${todo.done ? 'text-white/50 line-through' : 'text-white'}`}>
                    {todo.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Floating Widget Image */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white opacity-[0.08] blur-[80px] rounded-full" />
            
            {/* Main Image with float animation */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <img 
                src="/widget-showcase.png" 
                alt="SoftDo Widget" 
                className="w-full rounded-2xl shadow-2xl shadow-black/50"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-xl" />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
