import { useState, useMemo } from 'react';
import { calculateEstimate, scenarios } from '../logic/EstimateEngine';
import { fenceTypes } from '../data/pricing';

export const useFenceConfig = () => {
  const [config, setConfig] = useState({
    selectedType: fenceTypes[0].id,
    areaValue: '0.5',
    isCustom: false,
    customLength: '',
    gateCount: 1,
    qualityLevel: 'standard'
  });

  const setParam = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const loadScenario = (scenarioId) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setConfig(scenario.config);
    }
  };

  const estimate = useMemo(() => {
    return calculateEstimate(config);
  }, [config]);

  return {
    config,
    setParam,
    loadScenario,
    estimate,
    scenarios
  };
};
