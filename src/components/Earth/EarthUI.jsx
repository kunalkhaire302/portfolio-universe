import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCcw, FiInfo, FiX } from 'react-icons/fi';

const EarthUI = ({ 
  isPaused, 
  setIsPaused, 
  resetView, 
  infoPanelOpen, 
  setInfoPanelOpen 
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-6">
      
      {/* Top Right Controls */}
      <div className="flex justify-end gap-3 pointer-events-auto">
        <button 
          onClick={() => setInfoPanelOpen(!infoPanelOpen)}
          className="w-10 h-10 rounded-full bg-space-blue/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-teal/20 hover:text-neon-teal transition-all shadow-lg"
          title="Info"
        >
          <FiInfo size={18} />
        </button>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="w-10 h-10 rounded-full bg-space-blue/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-teal/20 hover:text-neon-teal transition-all shadow-lg"
          title={isPaused ? "Play Rotation" : "Pause Rotation"}
        >
          {isPaused ? <FiPlay size={18} /> : <FiPause size={18} />}
        </button>
        <button 
          onClick={resetView}
          className="w-10 h-10 rounded-full bg-space-blue/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-teal/20 hover:text-neon-teal transition-all shadow-lg"
          title="Reset View"
        >
          <FiRefreshCcw size={18} />
        </button>
      </div>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {infoPanelOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-space-blue/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 pointer-events-auto shadow-2xl"
          >
            <button 
              onClick={() => setInfoPanelOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-2xl font-black text-white tracking-tighter mb-1">EARTH</h3>
            <p className="text-neon-teal text-sm font-bold uppercase tracking-widest mb-6">The Blue Planet</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Distance from Sun</span>
                <span className="text-sm text-white font-semibold">149.6M km</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Diameter</span>
                <span className="text-sm text-white font-semibold">12,742 km</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Day Length</span>
                <span className="text-sm text-white font-semibold">23h 56m</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Year Length</span>
                <span className="text-sm text-white font-semibold">365.25 days</span>
              </div>
              <div className="flex justify-between items-end pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Moons</span>
                <span className="text-sm text-white font-semibold">1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EarthUI;
