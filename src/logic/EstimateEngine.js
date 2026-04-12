import { fenceTypes, pricingConfig } from '../data/pricing';

/**
 * Pure calculation engine for ODHIITS Studio
 * @param {Object} config - The project configuration
 */
export const calculateEstimate = (config) => {
  const {
    selectedType,
    areaValue,
    isCustom,
    customLength,
    gateCount,
    qualityLevel = 'standard'
  } = config;

  // 1. Determine Total Length
  let totalLength = 0;
  if (isCustom) {
    totalLength = parseFloat(customLength) || 0;
  } else {
    // Area (ha) to perimeter mapping (rough square estimate)
    const areaInSqm = parseFloat(areaValue) * 10000;
    totalLength = Math.sqrt(areaInSqm) * 4;
  }

  // 2. Base Price from Type
  const fenceType = fenceTypes.find(t => t.id === selectedType) || fenceTypes[0];
  let basePricePerMeter = fenceType.pricePerMeter;

  // Quality multipliers
  const qualityMultipliers = {
    standard: 1.0,
    premium: 1.25,
    industrial: 1.5
  };
  basePricePerMeter *= qualityMultipliers[qualityLevel] || 1.0;

  // 3. Components
  const fenceCost = totalLength * basePricePerMeter;
  const postsCount = Math.ceil(totalLength / 2.5); // posts every 2.5m
  const cornerPostsCost = 4 * pricingConfig.cornerPostExtra;
  
  const gateCost = gateCount * pricingConfig.gateBasePrice;

  // 4. Labor & Total
  const subtotal = fenceCost + cornerPostsCost + gateCost;
  const laborCost = subtotal * pricingConfig.laborPercent;
  const totalPrice = subtotal + laborCost;

  return {
    totalLength: Math.round(totalLength),
    totalArea: isCustom ? 'N/A' : areaValue + ' га',
    basePrice: Math.round(fenceCost),
    gatePrice: Math.round(gateCost),
    laborPrice: Math.round(laborCost),
    totalPrice: Math.round(totalPrice),
    unitPrice: Math.round(totalPrice / (totalLength || 1)),
    postsCount
  };
};

export const scenarios = [
  {
    id: 'homestead',
    name: '0.5 га Гэр хашаа',
    description: 'Амины сууцанд тохиромжтой стандарт багц',
    config: {
      selectedType: 'standard',
      areaValue: '0.5',
      isCustom: false,
      gateCount: 1,
      qualityLevel: 'standard'
    }
  },
  {
    id: 'urban',
    name: '0.7 га Хот суурин',
    description: 'Орчин үеийн загварлаг, бат бөх шийдэл',
    config: {
      selectedType: 'premium',
      areaValue: '0.7',
      isCustom: false,
      gateCount: 1,
      qualityLevel: 'premium'
    }
  },
  {
    id: 'industrial',
    name: 'Үйлдвэрийн талбай',
    description: 'Маш өндөр аюулгүй байдал, металл хийц',
    config: {
      selectedType: 'industrial',
      areaValue: '1.0',
      isCustom: false,
      gateCount: 2,
      qualityLevel: 'industrial'
    }
  }
];
