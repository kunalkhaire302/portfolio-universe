import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGlobeAmericas } from 'react-icons/fa';

const PlanetInfoPanel = ({ planet, onClose }) => {
  if (!planet) return null;

  const { name, type, facts } = planet;

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-72 md:w-80"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 15, 30, 0.8)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Header */}
            <div className="p-5 pb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
                  <FaGlobeAmericas className="text-neon-teal text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">{name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    {type}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close planet info"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Facts */}
            <div className="p-5 pt-4 space-y-3">
              {[
                { label: 'Distance from Sun', value: facts.distance },
                { label: 'Diameter', value: facts.diameter },
                { label: 'Orbital Period', value: facts.orbitalPeriod },
                { label: 'Temperature', value: facts.temperature },
                { label: 'Moons', value: facts.moons !== undefined ? facts.moons.toString() : '—' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-star-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Back button */}
            <div className="px-5 pb-5">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-neon-teal/10 border border-neon-teal/20 text-neon-teal text-xs font-bold uppercase tracking-widest hover:bg-neon-teal/20 hover:border-neon-teal/40 transition-all duration-300"
              >
                ← Back to Solar System
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlanetInfoPanel;
