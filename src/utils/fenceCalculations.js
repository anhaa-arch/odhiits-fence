/**
 * Calculates estimated fence length based on land size and gate presence.
 * 
 * @param {number} landSizeHa - Size of the land in hectares (0.4, 0.5, 0.6, 0.7)
 * @param {boolean} hasGate - Whether a 4m gate is included
 * @returns {number} - Estimated length in meters (rounded)
 */
export const getFenceLength = (landSizeHa, hasGate) => {
  const baseLength = 53 * (landSizeHa / 0.7);
  const actualLength = hasGate ? baseLength : baseLength - 4;
  return Math.round(actualLength);
};

/**
 * Calculates the total estimated price for a fence.
 * 
 * @param {Object} fenceOption - The selected fence option object
 * @param {number} lengthMeters - Total length in meters
 * @param {number} heightM - Selected height in meters
 * @param {number} heightFactor - Multiplier for the selected height
 * @returns {Object} - Detailed price results
 */
export const calculateFencePrice = (fenceOption, lengthMeters, heightM, heightFactor) => {
  const basePricePerM2 = fenceOption.basePricePerM2;
  const finalPricePerM2 = basePricePerM2 * heightFactor;
  
  // Total price formula: finalPricePerM2 * lengthMeters * (heightM / fenceOption.baseHeightM)
  const totalPrice = finalPricePerM2 * lengthMeters * (heightM / fenceOption.baseHeightM);
  
  return {
    totalPrice: Math.round(totalPrice),
    finalPricePerM2: Math.round(finalPricePerM2),
    basePricePerM2: basePricePerM2
  };
};
