import { fenceOptions } from './fenceOptions';

export const fences = fenceOptions.map(option => ({
  id: option.id,
  name: option.name,
  image: `/images/fences/fence-${option.imageIndex}.jpg`,
  description: option.description,
  bagtInfo: option.bagtInfo,
  priceHint: `${option.pricePerM2.toLocaleString()}₮/м²-ээс`,
  tag: option.recommended ? "Санал болгож буй" : "Стандарт",
  specs: option.specs,
  basePrice: option.pricePerM2,
  baseThickness: option.baseThickness
}));
