import { fenceOptions } from './fenceOptions';

export const fences = fenceOptions.map(option => ({
  id: option.id,
  name: option.name,
  image: option.image || `/images/fences/fence-${option.imageIndex}.jpg`,
  description: option.description,
  bagtInfo: option.bagtInfo || (option.specs ? option.specs.join(', ') : ''),
  priceHint: `${(option.basePricePerM2 || 0).toLocaleString()}₮/м²-ээс`,
  tag: option.recommended ? "Санал болгож буй" : "Стандарт",
  specs: option.specs || [],
  basePrice: option.basePricePerM2 || 0,
  baseThickness: option.baseThickness || "1.0mm"
}));
