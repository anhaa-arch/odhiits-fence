export const fenceOptions = [
  {
    id: 'mataastai-40k',
    name: 'Матаастай хашаа (Premium)',
    imageIndex: 1,
    description: 'Матаастай бат бөх хашаа - Иж бүрдэл',
    bagtInfo: 'Савх 20x20 1mm, Дай 20x30 1.2, Шон 40x40',
    specs: ['savh 20x20', 'dai 20x30', 'shon 40x40'],
    pricePerM2: 40000,
    baseThickness: 1.0,
    hasMesh: true,
    recommended: true
  },
  {
    id: '3-dagtai-38k',
    name: '3 дагтай хашаа (Стандарт)',
    imageIndex: 2,
    description: 'Стандарт 3 дагтай хашаа - Иж бүрдэл',
    bagtInfo: 'Савх 20x20 1mm, Дай 20x30 1.2mm, Шон 1.5',
    specs: ['savh 20x20', 'dai 20x30', 'shon 1.5'],
    pricePerM2: 38000,
    baseThickness: 1.0,
    hasMesh: false,
    recommended: false
  },
  {
    id: 'mataastai-09mm',
    name: 'Матаастай хашаа (Эконом)',
    imageIndex: 3,
    description: 'Эдийн засгийн хэмнэлттэй матаастай хашаа - Иж бүрдэл',
    bagtInfo: 'Дай 20x30 0.9mm, Шон 40x40 1.2mm, Савх 20x20',
    specs: ['Dai 20x30', 'Shon 40x40', 'Sawh 20x20'],
    pricePerM2: 32000,
    baseThickness: 0.9,
    hasMesh: true,
    recommended: false
  },
  {
    id: 'mataastai-shon-50x50',
    name: 'Матаастай хашаа (Шон 50x50)',
    imageIndex: 4,
    description: 'Том шонтой матаастай хашаа - Иж бүрдэл',
    bagtInfo: 'Дай 20x30 0.9mm, Шон 50x50 1.2mm, Савх 20x20',
    specs: ['Dai 20x30', 'Shon 50x50', 'Sawh 20x20'],
    pricePerM2: 34000,
    baseThickness: 0.9,
    hasMesh: true,
    recommended: false
  },
  {
    id: 'shon-15mm-40x40',
    name: 'Shon 1.5mm 40x40',
    imageIndex: 5,
    description: 'Тусгай шонтой сонголт - Иж бүрдэл',
    bagtInfo: 'Хашаа 20x30 1.2mm, Савх 20x20 1.1mm, Шон 1.5mm 40x40',
    specs: ['Hashaa 20x30', 'Sawh 20x20', 'Shon 40x40'],
    pricePerM2: 36000,
    baseThickness: 1.5,
    hasMesh: false,
    recommended: false
  },
  {
    id: 'shon-15mm-50x50',
    name: 'Shon 1.5mm 50x50',
    imageIndex: 6,
    description: 'Тусгай шонтой сонголт - Иж бүрдэл',
    bagtInfo: 'Хашаа 20x30 1.2mm, Савх 20x20 1.1mm, Шон 1.5mm 50x50',
    specs: ['Hashaa 20x30', 'Sawh 20x20', 'Shon 50x50'],
    pricePerM2: 38000,
    baseThickness: 1.5,
    hasMesh: false,
    recommended: false
  }
];

export const calculatePrice = (basePrice, baseThickness, selectedThickness, area) => {
  const thicknessDiff = Math.round((selectedThickness - baseThickness) * 10);
  const extraPricePerM2 = thicknessDiff * 2000;
  return (basePrice + extraPricePerM2) * area;
};
