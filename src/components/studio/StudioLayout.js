import React from 'react';
import ControlPanel from './ControlPanel';
import EstimateCanvas from './EstimateCanvas';
import { useFenceConfig } from '../../hooks/useFenceConfig';

const StudioLayout = () => {
  const { config, setParam, loadScenario, estimate, scenarios } = useFenceConfig();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar Control Panel */}
      <ControlPanel 
        config={config} 
        setParam={setParam} 
      />

      {/* Main Canvas Area */}
      <div className="flex-grow flex flex-col h-full">
        {/* Status Bar Top (Optional) */}
        <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-10 justify-between">
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Studio Workspace</span>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Draft</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-medium text-slate-500">Auto-save: ON</span>
           </div>
        </div>

        <EstimateCanvas 
          config={config} 
          estimate={estimate} 
          loadScenario={loadScenario}
          scenarios={scenarios}
        />

        {/* Global Footer Labels (Small) */}
        <div className="h-14 bg-slate-950 border-t border-slate-900 flex items-center px-10 justify-between">
           <div className="flex gap-8">
              <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em]">© 2024 ODHIITS Industrial System</span>
              <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em]">v.1.0.4-Build</span>
           </div>
           <div className="flex gap-6">
              <a href="#about" className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] hover:text-slate-500 transition-colors">Terms</a>
              <a href="#about" className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] hover:text-slate-500 transition-colors">Safety</a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudioLayout;
